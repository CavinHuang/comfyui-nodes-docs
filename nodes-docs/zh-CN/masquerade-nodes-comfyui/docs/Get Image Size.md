# Documentation
- Class name: GetImageSize
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

GetImageSize节点旨在提取图像的尺寸，提供宽度和高度作为输出。它在图像处理任务中扮演着关键角色，其中图像的空间尺寸对于进一步操作（如调整大小、裁剪或数据分析）至关重要。

# Input types
## Required
- image
    - 图像参数对节点至关重要，因为它是待确定尺寸的来源。节点依赖此输入来计算并返回图像的宽度和高度，这可以显著影响后续的图像操作和分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 宽度输出提供了处理后图像的水平尺寸。这是一个关键的信息，可用于多种目的，如确定纵横比或与其他图像处理系统的兼容性检查。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出代表了图像的垂直尺寸。这是一个基本参数，用于需要了解图像空间结构的任务，如调整大小以适应特定框架或显示目的。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GetImageSize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'get_size'
    CATEGORY = 'Masquerade Nodes'

    def get_size(self, image):
        image_size = image.size()
        image_width = int(image_size[2])
        image_height = int(image_size[1])
        return (image_width, image_height)
```