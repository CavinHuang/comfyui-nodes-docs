# Documentation
- Class name: SEGSUpscalerPipe
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSUpscalerPipe 是一个用于提高图像分辨率的节点，它采用先进的上采样技术。它利用深度学习模型的能力来放大图像，同时保持语义分割（SEGS）的完整性。这个节点特别适用于需要高质量图像上采样的应用，如图形设计、摄影和视频处理。

# Input types
## Required
- image
    - 要上采样的输入图像。它是上采样过程的主要数据源，对于实现所需的输出分辨率和质量至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 提供像素级理解图像内容的语义分割图。这些用于指导上采样过程，以保持原始图像的语义完整性。
    - Comfy dtype: SEGS
    - Python dtype: torch.Tensor
- basic_pipe
    - 构成上采样过程基础的模型和配置集合。它包括模型、clip、vae等基本组件以及影响上采样结果的额外设置。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, Any, Any]
- rescale_factor
    - 输入图像将被放大的倍数。它直接影响输出图像的最终分辨率，更高的倍数会导致更大的图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resampling_method
    - 重采样方法决定了用于上采样图像的算法。不同的方法可能导致不同程度的细节和图像质量。
    - Comfy dtype: COMBO[lanczos, nearest, bilinear, bicubic]
    - Python dtype: str
- supersample
    - 一个标志，指示是否使用超采样技术进行上采样。超采样可以提高放大图像的锐度和清晰度。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- rounding_modulus
    - 用于放大图像尺寸的取模数。它确保输出图像尺寸一致且适合进一步处理。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 用于确保上采样过程可重复的随机种子。在多次运行节点时获得一致结果非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 运行上采样算法的步数。更多的步数可以带来更好的结果，但可能会增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 一个配置参数，用于调整上采样过程中细节保留和噪声减少之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 用于上采样过程的采样器名称。不同的采样器可以影响样本的分布和最终图像质量。
    - Comfy dtype: KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - 用于控制上采样过程中学习率的调度器。它可以影响上采样算法的收敛和稳定性。
    - Comfy dtype: KSampler.SCHEDULERS
    - Python dtype: str
- denoise
    - 上采样过程中要应用的去噪程度。较高的值可以减少图像中的噪声，但也可能去除一些细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- feather
    - 用于软化放大图像边缘的羽化值。它可以在图像的不同区域之间创建更平滑的过渡。
    - Comfy dtype: INT
    - Python dtype: int
- inpaint_model
    - 一个布尔标志，指示在上采样期间是否使用修复模型来填充图像中缺失或损坏的区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_mask_feather
    - 应用于噪声掩模的羽化值，以软化其边缘。这有助于为放大的图像创造更自然的外观。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaled_image
    - SEGSUpscalerPipe 节点的输出是经过处理以实现更高分辨率的放大图像，同时保持语义分割的细节。它是上采样过程的最终成果，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SEGSUpscalerPipe:

    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ['lanczos', 'nearest', 'bilinear', 'bicubic']
        return {'required': {'image': ('IMAGE',), 'segs': ('SEGS',), 'basic_pipe': ('BASIC_PIPE',), 'rescale_factor': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 100.0, 'step': 0.01}), 'resampling_method': (resampling_methods,), 'supersample': (['true', 'false'],), 'rounding_modulus': ('INT', {'default': 8, 'min': 8, 'max': 1024, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'upscaler_hook_opt': ('UPSCALER_HOOK',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    @staticmethod
    def doit(image, segs, basic_pipe, rescale_factor, resampling_method, supersample, rounding_modulus, seed, steps, cfg, sampler_name, scheduler, denoise, feather, inpaint_model, noise_mask_feather, upscale_model_opt=None, upscaler_hook_opt=None):
        (model, clip, vae, positive, negative) = basic_pipe
        return SEGSUpscaler.doit(image, segs, model, clip, vae, rescale_factor, resampling_method, supersample, rounding_modulus, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, inpaint_model, noise_mask_feather, upscale_model_opt=upscale_model_opt, upscaler_hook_opt=upscaler_hook_opt)
```