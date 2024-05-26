# Documentation
- Class name: Solarize
- Category: postprocessing/Color Adjustments
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点旨在通过反转高于特定阈值的颜色来调整图像的颜色，提供一种太阳化效果，增强可见性和对比度。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是太阳化过程的主要输入。它决定了将要进行颜色调整的源材料。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- threshold
    - 阈值参数作为太阳化过程的决策边界，决定了哪些颜色色调被反转以增强图像的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- solarized_image
    - 输出是经过太阳化处理的图像，它经历了颜色反转过程以提高其视觉吸引力和清晰度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Solarize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'solarize_image'
    CATEGORY = 'postprocessing/Color Adjustments'

    def solarize_image(self, image: torch.Tensor, threshold: float):
        solarized_image = torch.where(image > threshold, 1 - image, image)
        solarized_image = torch.clamp(solarized_image, 0, 1)
        return (solarized_image,)
```