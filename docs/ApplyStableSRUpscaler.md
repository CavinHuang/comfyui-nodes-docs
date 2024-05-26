# Documentation
- Class name: ApplyStableSRUpscaler
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/Arthurzhangsheng/Comfyui-StableSR.git

该节点利用StableSR模型的能力，提高输入图像的分辨率，同时保持其视觉完整性。它专注于应用先进的上采样技术，以产生高质量、详细的图像，而不损害原始内容。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点将操作的基础结构和功能。对于上采样过程来说，拥有一个有效的模型是确保正确应用StableSR技术的关键。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- stablesr_model
    - stablesr_model参数至关重要，因为它指定了StableSR模型检查点的路径，其中包含上采样过程所需的预训练权重。没有一个正确且可访问的模型路径，节点无法执行其预期功能。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('stablesr')]
    - Python dtype: str
## Optional
- latent_image
    - 当提供latent_image参数时，允许节点将额外信息纳入上采样过程。这可以通过考虑输入的潜在特征来完善输出，有可能带来更好的视觉结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Output types
- model_sr
    - 输出模型model_sr是将StableSR上采样技术应用于输入模型的结果。它代表了原始模型的增强版本，具有更高的分辨率和细节，准备用于进一步的使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ApplyStableSRUpscaler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'stablesr_model': (folder_paths.get_filename_list('stablesr'),)}, 'optional': {'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_stable_sr_upscaler'
    CATEGORY = 'image/upscaling'

    def apply_stable_sr_upscaler(self, model, stablesr_model, latent_image=None):
        stablesr_model_path = folder_paths.get_full_path('stablesr', stablesr_model)
        if not os.path.isfile(stablesr_model_path):
            raise Exception(f'[StableSR] Invalid StableSR model reference')
        upscaler = StableSR(stablesr_model_path, dtype=comfy.model_management.unet_dtype(), device='cpu')
        if latent_image != None:
            latent_image = model.model.process_latent_in(latent_image['samples'])
            upscaler.set_latent_image(latent_image)
        else:
            upscaler.set_auto_set_latent(True)
        model_sr = model.clone()
        model_sr.set_model_unet_function_wrapper(upscaler)
        return (model_sr,)
```