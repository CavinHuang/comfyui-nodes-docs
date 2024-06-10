# Documentation
- Class name: EmptyImage
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

EmptyImage节点旨在生成具有指定尺寸和颜色的空白图像。它作为图像处理工作流程的基础组件，为后续操作提供空白画布。此节点在需要起始图像的场景中至关重要，例如在创建占位符或初始化图像数据结构时。

# Input types
## Required
- width
    - ‘width’参数决定了生成图像的宽度，以像素为单位。它是定义图像空间维度的关键因素，直接影响图像的整体结构以及在下游任务中可能的应用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数指定图像在像素中的垂直延伸。它与宽度一起确定了图像的分辨率，这对于确保与各种显示设备和处理需求的兼容性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- batch_size
    - ‘batch_size’参数指示在单个操作中生成的图像数量。它特别适用于同时处理多个图像，可以在批量处理场景中提高效率。
    - Comfy dtype: INT
    - Python dtype: int
- color
    - ‘color’参数允许指定图像的颜色。它接受一个表示RGB格式中颜色的整数，从而能够创建具有所需统一背景颜色的图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - ‘image’输出是EmptyImage节点的主要结果。它代表了具有定义尺寸和颜色的生成空白图像。这个输出非常重要，因为它为进一步的图像操作和分析奠定了基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class EmptyImage:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096}), 'color': ('INT', {'default': 0, 'min': 0, 'max': 16777215, 'step': 1, 'display': 'color'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'generate'
    CATEGORY = 'image'

    def generate(self, width, height, batch_size=1, color=0):
        r = torch.full([batch_size, height, width, 1], (color >> 16 & 255) / 255)
        g = torch.full([batch_size, height, width, 1], (color >> 8 & 255) / 255)
        b = torch.full([batch_size, height, width, 1], (color & 255) / 255)
        return (torch.cat((r, g, b), dim=-1),)
```