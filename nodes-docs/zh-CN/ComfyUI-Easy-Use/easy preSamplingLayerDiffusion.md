# Documentation
- Class name: layerDiffusionSettings
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点用于在神经网络流水线中自定义层扩散设置，使用户能够定义层间交互的方法以及影响生成过程的各种参数。

# Input types
## Required
- pipe
    - ‘pipe’参数作为主要输入，将必要的数据和设置通过节点传递。它对节点的正确运行至关重要，确保后续操作在正确的上下文中执行。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- method
    - ‘method’参数决定了层扩散的方法，这是节点操作的核心。它决定了模型的不同层如何相互作用并为最终输出做出贡献。
    - Comfy dtype: COMBO[LayerMethod]
    - Python dtype: Enum[LayerMethod]
- weight
    - ‘weight’参数调整层扩散过程的影响力。它在微调不同层对生成的贡献平衡方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - ‘steps’参数定义了层扩散过程将经历的迭代次数。它在控制层间交互的深度和粒度方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数设置了层扩散过程的配置值，这对于调整模型的行为和实现期望的结果至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数指定了在层扩散过程中使用的采样方法，这对于生成结果的多样性和质量至关重要。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: Enum[comfy.samplers.KSampler.SAMPLERS]
- scheduler
    - ‘scheduler’参数确定了层扩散过程的调度策略，这对于管理计算资源和实现高效执行至关重要。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: Enum[comfy.samplers.KSampler.SCHEDULERS]
- denoise
    - ‘denoise’参数控制层扩散过程中应用的降噪水平。它通过影响生成内容的清晰度和细节，对最终输出的质量起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - ‘seed’参数在层扩散过程中引入随机性。它对于确保结果不重复并提供多种可能的结果很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image
    - ‘image’参数提供了层扩散过程的视觉输入。它在确定生成输出的内容和上下文方面很重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or np.ndarray
- blended_image
    - ‘blended_image’参数用于将不同的层或元素混合到最终输出中。它有助于生成视觉的复杂性和丰富性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or np.ndarray
- mask
    - ‘mask’参数用于定义在层扩散过程中应保留或操作的图像区域。它对于修复和选择性编辑任务至关重要。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image or np.ndarray
- prompt
    - ‘prompt’参数为层扩散过程提供文本指导，影响生成内容的主题方向和风格。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含与图像相关的额外信息，可用于完善层扩散过程并实现更精确的结果。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - ‘my_unique_id’参数用于跟踪和管理层扩散过程的唯一身份，确保结果的可追溯性和个性化。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出是输入的更新版本，包含层扩散过程的结果和进一步流水线操作调整后的设置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class layerDiffusionSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'method': ([LayerMethod.FG_ONLY_ATTN.value, LayerMethod.FG_ONLY_CONV.value, LayerMethod.EVERYTHING.value, LayerMethod.FG_TO_BLEND.value, LayerMethod.BG_TO_BLEND.value],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'euler'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'normal'}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'image': ('IMAGE',), 'blended_image': ('IMAGE',), 'mask': ('MASK',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def get_layer_diffusion_method(self, method, has_blend_latent):
        method = LayerMethod(method)
        if has_blend_latent:
            if method == LayerMethod.BG_TO_BLEND:
                method = LayerMethod.BG_BLEND_TO_FG
            elif method == LayerMethod.FG_TO_BLEND:
                method = LayerMethod.FG_BLEND_TO_BG
        return method

    def settings(self, pipe, method, weight, steps, cfg, sampler_name, scheduler, denoise, seed, image=None, blended_image=None, mask=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        blend_samples = pipe['blend_samples'] if 'blend_samples' in pipe else None
        vae = pipe['vae']
        batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
        method = self.get_layer_diffusion_method(method, blend_samples is not None or blended_image is not None)
        if image is not None or 'image' in pipe:
            image = image if image is not None else pipe['image']
            if mask is not None:
                print('inpaint')
                (samples,) = VAEEncodeForInpaint().encode(vae, image, mask)
            else:
                samples = {'samples': vae.encode(image[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image
        elif 'samp_images' in pipe:
            samples = {'samples': vae.encode(pipe['samp_images'][:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = pipe['samp_images']
        else:
            if method not in [LayerMethod.FG_ONLY_ATTN, LayerMethod.FG_ONLY_CONV, LayerMethod.EVERYTHING]:
                raise Exception('image is missing')
            samples = pipe['samples']
            images = pipe['images']
        if method in [LayerMethod.BG_BLEND_TO_FG, LayerMethod.FG_BLEND_TO_BG]:
            if blended_image is None and blend_samples is None:
                raise Exception('blended_image is missing')
            elif blended_image is not None:
                blend_samples = {'samples': vae.encode(blended_image[:, :, :, :3])}
                blend_samples = RepeatLatentBatch().repeat(blend_samples, batch_size)[0]
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': samples, 'blend_samples': blend_samples, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'add_noise': 'enabled', 'layer_diffusion_method': method, 'layer_diffusion_weight': weight}}
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```