# Documentation
- Class name: LatentUpscale
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentUpscale节点旨在通过不同的放大方法提高输入潜在样本的分辨率，从而改善生成图像的质量和细节。它在图像生成流程中扮演关键角色，通过提供高分辨率输出，这些输出可以进一步处理或用于下游任务。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它提供了节点将要放大的潜在表示。它直接影响最终输出的质量和分辨率，决定了放大过程的起点。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- upscale_method
    - “upscale_method”参数决定了用于放大潜在样本的算法。它显著影响放大过程的效率和视觉效果，为生成的图像提供不同程度的细节和平滑度。
    - Comfy dtype: COMBO
    - Python dtype: str
- width
    - “width”参数指定了放大输出的期望宽度。它在确定最终图像的长宽比和尺寸方面起着关键作用，从而影响整体的审美和构图。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - “height”参数设置了放大图像的目标高度。它与“width”参数共同作用，确立图像的尺寸，这对于实现期望的视觉规模和比例至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- crop
    - “crop”参数决定节点如何处理放大图像的居中。它影响输出的定位和构图，确保生成的图像正确对齐和聚焦。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- samples
    - “samples”输出包含放大后的潜在表示，现在具有更高的分辨率和细节。这个输出非常重要，因为它作为后续图像处理或分析步骤的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class LatentUpscale:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp']
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'upscale_method': (s.upscale_methods,), 'width': ('INT', {'default': 512, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'upscale'
    CATEGORY = 'latent'

    def upscale(self, samples, upscale_method, width, height, crop):
        if width == 0 and height == 0:
            s = samples
        else:
            s = samples.copy()
            if width == 0:
                height = max(64, height)
                width = max(64, round(samples['samples'].shape[3] * height / samples['samples'].shape[2]))
            elif height == 0:
                width = max(64, width)
                height = max(64, round(samples['samples'].shape[2] * width / samples['samples'].shape[3]))
            else:
                width = max(64, width)
                height = max(64, height)
            s['samples'] = comfy.utils.common_upscale(samples['samples'], width // 8, height // 8, upscale_method, crop)
        return (s,)
```