# Documentation
- Class name: MagicAnimate
- Category: ComfyUI Magic Animate
- Output node: False
- Repo Ref: https://github.com/thecooltechguy/ComfyUI-MagicAnimate

该节点使用生成模型根据输入的图像和姿势视频创建动画内容。它旨在通过将输入图像的外观与姿势视频中捕获的动作融合，合成新的帧，从而产生反映所需动作和风格的无缝动画。

# Input types
## Required
- magic_animate_model
    - 模型参数至关重要，因为它定义了用于动画的生成架构。它封装了生成过程所需的管道、配置和各种组件，确保节点能够产生所需的动画输出。
    - Comfy dtype: MAGIC_ANIMATE_MODEL
    - Python dtype: Dict[str, Any]
- image
    - 图像参数作为动画的视觉基础。它提供了将根据姿势视频进行动画处理的外观。图像的质量和分辨率对最终动画的视觉保真度有重大影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- pose_video
    - 姿势视频参数决定了动画的动作和顺序。它对于传达所需动作和确保动画的流畅性至关重要。视频的帧率和质量直接影响动画的平滑度和真实感。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- seed
    - 种子参数对于确保生成动画的可重复性和一致性至关重要。通过设置特定的种子，节点可以在相同条件下生成相同的动画结果，这对于迭代改进和调试至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- inference_steps
    - 推理步骤参数影响生成过程的深度。更多的步骤允许更详细和细致的动画，但可能会增加计算成本。这个参数对于平衡质量和性能至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 该节点的输出是生成的动画，这是一系列将输入图像的外观与姿势视频的动作结合起来的帧。这个输出是生成过程的结晶，代表了节点的主要功能和目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MagicAnimate:

    def __init__(self):
        self.generator = torch.Generator(device=torch.device('cuda:0'))

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'magic_animate_model': ('MAGIC_ANIMATE_MODEL',), 'image': ('IMAGE',), 'pose_video': ('IMAGE',), 'seed': ('INT', {'display': 'number'}), 'inference_steps': ('INT', {'default': 25, 'display': 'number'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'generate'
    CATEGORY = 'ComfyUI Magic Animate'

    def resize_image_frame(self, image_tensor, size):
        if isinstance(image_tensor, np.ndarray):
            image_tensor = torch.from_numpy(image_tensor)
        image_tensor = rearrange(image_tensor, 'h w c -> c h w')
        image_tensor = ToPILImage()(image_tensor)
        image_tensor = image_tensor.resize((size, size))
        image_tensor = ToTensor()(image_tensor)
        image_tensor = rearrange(image_tensor, 'c h w -> h w c')
        return image_tensor

    def generate(self, magic_animate_model, image, pose_video, seed, inference_steps):
        num_actual_inference_steps = inference_steps
        pipeline = magic_animate_model['pipeline']
        config = magic_animate_model['config']
        size = config.size
        appearance_encoder = magic_animate_model['appearance_encoder']
        reference_control_writer = magic_animate_model['reference_control_writer']
        reference_control_reader = magic_animate_model['reference_control_reader']
        assert image.shape[0] == 1, 'Only one image input is supported'
        image = image[0]
        (H, W, C) = image.shape
        if H != size or W != size:
            image = self.resize_image_frame(image, size)
            (H, W, C) = image.shape
        image = image * 255
        prompt = ''
        n_prompt = ''
        control = pose_video.detach().cpu().numpy()
        print('control shape:', control.shape)
        if control.shape[1] != size or control.shape[2] != size:
            control = torch.stack([self.resize_image_frame(frame, size) for frame in control], dim=0)
        init_latents = None
        original_length = control.shape[0]
        if control.shape[0] % config.L > 0:
            control = np.pad(control, ((0, config.L - control.shape[0] % config.L), (0, 0), (0, 0), (0, 0)), mode='edge')
        control = control * 255
        self.generator.manual_seed(seed)
        dist_kwargs = {'rank': 0, 'world_size': 1, 'dist': False}
        sample = pipeline(prompt, negative_prompt=n_prompt, num_inference_steps=config.steps, guidance_scale=config.guidance_scale, width=W, height=H, video_length=len(control), controlnet_condition=control, init_latents=init_latents, generator=self.generator, num_actual_inference_steps=num_actual_inference_steps, appearance_encoder=appearance_encoder, reference_control_writer=reference_control_writer, reference_control_reader=reference_control_reader, source_image=image.detach().cpu().numpy(), **dist_kwargs).videos
        sample = sample[0, :, :original_length]
        sample = rearrange(sample, 'c f h w -> f h w c').detach().cpu()
        return (sample,)
```