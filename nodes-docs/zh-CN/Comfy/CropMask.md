# Documentation
- Class name: CropMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CropMask节点旨在从较大的掩码图像中提取指定的兴趣区域。它通过使用提供的坐标和尺寸定义一个矩形区域来操作，允许精确裁剪所需的部分。此节点对于将分析重点放在图像中的特定区域，提高后续处理步骤的效率和相关性至关重要。

# Input types
## Required
- mask
    - ‘mask’参数是将要从中裁剪区域的输入掩码图像。它是节点操作的基础数据，节点的输出直接依赖于此输入的内容和结构。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- x
    - ‘x’参数指定裁剪操作的水平起始点。它对于确定裁剪将开始的掩码内的确切位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - ‘y’参数定义裁剪操作的垂直起始点。它与‘x’参数一起工作，以精确指定裁剪矩形的左上角。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - ‘width’参数设置裁剪矩形的宽度。它决定了将从掩码图像中提取的区域的水平范围。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数建立裁剪矩形的垂直尺寸。它对于定义将从掩码中裁剪的区域的垂直范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_mask
    - ‘cropped_mask’输出是裁剪操作的结果，展示了原始掩码的一个较小部分，该部分由输入参数指定。这个输出对于需要对掩码内的特定区域进行聚焦查看的进一步处理或分析非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CropMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'width': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'crop'

    def crop(self, mask, x, y, width, height):
        mask = mask.reshape((-1, mask.shape[-2], mask.shape[-1]))
        out = mask[:, y:y + height, x:x + width]
        return (out,)
```