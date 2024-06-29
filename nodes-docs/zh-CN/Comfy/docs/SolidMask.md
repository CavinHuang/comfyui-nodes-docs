# Documentation
- Class name: SolidMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SolidMask 节点旨在生成一个在其所有维度上具有统一值的实心遮罩。它特别适用于创建用于进一步处理或作为更复杂遮罩操作的起点的基础遮罩。

# Input types
## Required
- value
    - ‘value’ 参数定义了将用于填充整个遮罩的统一值。它至关重要，因为它决定了遮罩的基本颜色或强度，这可能显著影响后续的操作或分析。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - ‘width’ 参数指定了遮罩的宽度，以像素为单位。它是一个重要的参数，因为它决定了遮罩的水平分辨率，这可能影响遮罩的处理或显示方式。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’ 参数设置了遮罩的垂直高度，以像素为单位。它在建立遮罩的垂直分辨率方面起着关键作用，这对于遮罩在不同应用场景中的使用至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出的 'mask' 是一个张量，代表由节点生成的实心遮罩。它在其所有维度上都包含了由 'value' 参数指定的统一值，作为进一步图像处理任务的基本组成部分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class SolidMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'width': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'solid'

    def solid(self, value, width, height):
        out = torch.full((1, height, width), value, dtype=torch.float32, device='cpu')
        return (out,)
```