# Documentation
- Class name: color_drop
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点类通过应用颜色丢弃效果来处理图像数据，通过压平颜色光谱来增强输入图像的视觉特征。

# Input types
## Required
- images
    - 输入图像对于节点的操作至关重要，它们作为颜色丢弃过程的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- number_of_colors
    - 该参数影响颜色压平效果的粒度，较高的数值会导致输出中颜色带更加明显。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- Image
    - 输出是应用了颜色丢弃效果的图像，展示了预期的视觉增强效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class color_drop:
    """
    This node provides a simple interface to apply PixelSort blur to the output image.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        """
        Input Types
        """
        return {'required': {'images': ('IMAGE',)}, 'optional': {'number_of_colors': ('INT', {'default': 2, 'min': 1, 'max': 4000, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('Image',)
    FUNCTION = 'flatten'
```