# Documentation
- Class name: PPFNImageAsLatent
- Category: latent/util
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点有助于将图像数据转换为潜在表示，这对于各种图像处理任务非常有用。它强调将视觉信息转换为后续模型或算法可以利用的格式，重点关注转换过程的适应性和效率。

# Input types
## Required
- images
    - 图像参数至关重要，因为它提供了生成潜在表示所需的原始视觉数据。它影响潜在表示的质量和准确性，决定了节点在后续处理中的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- resampling
    - 重采样参数决定了在转换过程中用于调整图像大小的方法。它显著影响生成的潜在表示的细节和清晰度，从而影响节点的整体性能。
    - Comfy dtype: COMBO[nearest-exact, bilinear, area, bicubic, bislerp]
    - Python dtype: str

# Output types
- latents
    - 潜在输出代表了转换后的图像数据在潜在空间中的形态，这对于进一步的处理或分析至关重要。它以压缩的形式封装了核心视觉信息，准备供下游模型或算法使用。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- images
    - 图像输出保留了原始视觉数据，现在增加了一个额外的通道以确保兼容性。它作为潜在表示的参考，并可用于比较或进一步的视觉分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNImageAsLatent:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'resampling': (['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp'],)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'images')
    FUNCTION = 'image_latent'
    CATEGORY = 'latent/util'

    def image_latent(self, images, resampling):
        if images.shape[-1] != 4:
            ones_channel = torch.ones(images.shape[:-1] + (1,), dtype=images.dtype, device=images.device)
            images = torch.cat((images, ones_channel), dim=-1)
        latents = images.permute(0, 3, 1, 2)
        latents = F.interpolate(latents, size=(images.shape[1] // 8, images.shape[2] // 8), mode=resampling)
        return ({'samples': latents}, images)
```