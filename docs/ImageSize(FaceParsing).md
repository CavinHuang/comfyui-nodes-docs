# Documentation
- Class name: ImageSize
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

ImageSize节点旨在提取并提供输入图像的尺寸，特别是其宽度和高度。它在图像处理工作流中作为一个基本组件，确保理解图像的空间属性，并可以在后续操作中使用。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是将要确定尺寸的输入图像。它显著影响节点的输出，决定了将计算并返回的宽度和高度的值。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 宽度输出代表输入图像沿其水平轴的空间范围。这是进一步图像分析和操作的基本信息。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出对应输入图像沿其垂直轴的空间范围。这个测量对于理解图像的布局和后续的图像处理任务至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImageSize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE', {})}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, image: Tensor):
        w = image.shape[2]
        h = image.shape[1]
        return (w, h)
```