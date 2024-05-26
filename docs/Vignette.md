# Documentation
- Class name: Vignette
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点向图像应用晕影效果，通过逐渐淡化边缘来增强对中心的视觉聚焦。它根据用户定义的参数调整晕影的强度，从而允许对美学影响进行细微控制。

# Input types
## Required
- image
    - 图像参数是必要的，因为它是节点操作的主要输入。它决定了将要应用晕影效果的对象，从而直接影响输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- a
    - 参数'a'控制晕影效果的强度。它对于根据用户的偏好定制美学结果至关重要，允许从微妙到戏剧性的不同视觉风格。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像是应用晕影效果的结果。它反映了带有应用美学调整的输入图像，代表了节点的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Vignette:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'a': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 1.0})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_vignette'
    CATEGORY = 'postprocessing/Effects'

    def apply_vignette(self, image: torch.Tensor, vignette: float):
        if vignette == 0:
            return (image,)
        (height, width, _) = image.shape[-3:]
        x = torch.linspace(-1, 1, width, device=image.device)
        y = torch.linspace(-1, 1, height, device=image.device)
        (X, Y) = torch.meshgrid(x, y, indexing='ij')
        radius = torch.sqrt(X ** 2 + Y ** 2)
        mapped_vignette_strength = 1.8 - (vignette - 1) * 0.1
        vignette = 1 - torch.clamp(radius / mapped_vignette_strength, 0, 1)
        vignette = vignette[..., None]
        vignette_image = torch.clamp(image * vignette, 0, 1)
        return (vignette_image,)
```