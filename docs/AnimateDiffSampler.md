# Documentation
- Class name: AnimateDiffSampler
- Category: Animate Diff
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

AnimateDiffSampler是一个旨在通过引入运动模块来增强生成模型采样过程的节点，这些运动模块将动态元素引入到生成内容中。该节点旨在通过改善输出中动画的流畅性和连贯性，提供更加栩栩如生的体验。它通过将运动数据注入模型的扩散过程并相应地调整采样设置来实现这一点，而不会深入到底层方法或参数的具体细节。

# Input types
## Required
- motion_module
    - 运动模块参数对于AnimateDiffSampler至关重要，因为它提供了使生成动画内容成为可能的动态数据。它是节点功能的核心，影响模型如何感知和生成输出中的运动。
    - Comfy dtype: MOTION_MODULE
    - Python dtype: MotionWrapper
- inject_method
    - 注入方法参数决定了AnimateDiffSampler如何将运动模块集成到模型的扩散过程中。这对于确定运动集成的有效性以及动画结果的质量至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- frame_number
    - 帧数参数是AnimateDiffSampler中的一个关键因素，因为它定义了要生成的动画的长度。它通过确定将生成的帧数来直接影响节点的输出，从而影响动画的总体持续时间和范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - AnimateDiffSampler的输出样本代表生成的动画帧。它是节点处理的最终成果，包含了为了创建动画内容而应用的运动和扩散过程。
    - Comfy dtype: TORCH_TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class AnimateDiffSampler(KSampler):

    @classmethod
    def INPUT_TYPES(s):
        inputs = {'required': {'motion_module': ('MOTION_MODULE',), 'inject_method': (['default', 'legacy'],), 'frame_number': ('INT', {'default': 16, 'min': 2, 'max': 10000, 'step': 1})}}
        inputs['required'].update(KSampler.INPUT_TYPES()['required'])
        inputs['optional'] = {'sliding_window_opts': ('SLIDING_WINDOW_OPTS',)}
        return inputs
    FUNCTION = 'animatediff_sample'
    CATEGORY = 'Animate Diff'

    def __init__(self) -> None:
        super().__init__()
        self.model_sampling = None

    def override_beta_schedule(self, model: BaseModel):
        self.model_sampling = model.model_sampling
        model.model_sampling = model_sampling(ModelSamplingConfig(beta_schedule='sqrt_linear'), model_type=model.model_type)

    def restore_beta_schedule(self, model: BaseModel):
        model.model_sampling = self.model_sampling
        self.model_sampling = None

    def inject_motion_module(self, model, motion_module: MotionWrapper, inject_method: str, frame_number: int):
        model = model.clone()
        unet = model.model.diffusion_model
        logger.info(f'Injecting motion module with method {inject_method}.')
        motion_module.set_video_length(frame_number)
        injectors[inject_method](unet, motion_module)
        self.override_beta_schedule(model.model)
        openaimodel.forward_timestep_embed = forward_timestep_embed
        if not motion_module.is_v2:
            logger.info(f'Hacking GroupNorm.forward function.')
            torch.nn.GroupNorm.forward = groupnorm_mm_factory(frame_number)
        return model

    def inject_sliding_sampler(self, video_length, sliding_window_opts: SlidingContext=None):
        ctx = sliding_window_opts.copy() if sliding_window_opts else SlidingContext()
        ctx.video_length = video_length
        inject_sampling_function(ctx)

    def eject_motion_module(self, model, inject_method):
        unet = model.model.diffusion_model
        self.restore_beta_schedule(model.model)
        openaimodel.forward_timestep_embed = orig_forward_timestep_embed
        if not unet.motion_module.is_v2:
            logger.info(f'Restore GroupNorm.forward function.')
            torch.nn.GroupNorm.forward = orig_groupnorm_forward
        logger.info(f'Ejecting motion module with method {inject_method}.')
        ejectors[inject_method](unet)

    def eject_sliding_sampler(self):
        eject_sampling_function()

    def animatediff_sample(self, motion_module, inject_method, frame_number, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0, sliding_window_opts: SlidingContext=None, **kwargs):
        samples = latent_image['samples']
        init_frames = len(samples)
        if init_frames < frame_number:
            last_frame = samples[-1].clone().cpu().unsqueeze(0)
            repeated_last_frames = last_frame.repeat(frame_number - init_frames, 1, 1, 1)
            samples = torch.cat((samples, repeated_last_frames), dim=0)
        latent_image = {'samples': samples}
        context_length = sliding_window_opts.context_length if sliding_window_opts else SLIDING_CONTEXT_LENGTH
        is_sliding = frame_number > context_length
        video_length = context_length if is_sliding else frame_number
        if video_length > motion_module.encoding_max_len:
            error = f"{('context_length' if is_sliding else 'frame_number')} = {video_length}"
            raise ValueError(f'AnimateDiff model {motion_module.mm_type} has upper limit of {motion_module.encoding_max_len} frames, but received {error}.')
        model = self.inject_motion_module(model, motion_module, inject_method, video_length)
        if is_sliding:
            self.inject_sliding_sampler(frame_number, sliding_window_opts=sliding_window_opts)
        try:
            return super().sample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, **kwargs)
        except:
            raise
        finally:
            self.eject_motion_module(model, inject_method)
            if is_sliding:
                self.eject_sliding_sampler()
```