# Documentation
- Class name: MaskComposite
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MaskComposite节点旨在对掩码图像执行各种操作，允许根据指定的操作组合源掩码和目标掩码。它在需要掩码操作的图像处理工作流程中扮演着关键角色，例如在计算机视觉或图形设计应用中。

# Input types
## Required
- destination
    - 目标参数是将通过操作修改的基础掩码。它至关重要，因为它决定了在应用任何修改之前掩码的初始状态。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- source
    - 源参数表示要与目标掩码组合的掩码。它的作用至关重要，因为它对掩码操作的最终结果有贡献。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- x
    - x参数指定了源掩码相对于目标掩码的水平位置。它很重要，因为它决定了源在目标掩码中的位置。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y参数定义了源掩码相对于目标掩码的垂直位置。它的重要性在于确定源在目标掩码中的垂直位置。
    - Comfy dtype: INT
    - Python dtype: int
- operation
    - 操作参数指示源掩码和目标掩码之间要执行的组合类型。它至关重要，因为它定义了掩码合并的逻辑。
    - Comfy dtype: COMBO['multiply', 'add', 'subtract', 'and', 'or', 'xor']
    - Python dtype: str

# Output types
- output
    - 输出参数是掩码组合操作的结果。它包含了应用所有转换后掩码的最终状态。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MaskComposite:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'destination': ('MASK',), 'source': ('MASK',), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'operation': (['multiply', 'add', 'subtract', 'and', 'or', 'xor'],)}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'combine'

    def combine(self, destination, source, x, y, operation):
        output = destination.reshape((-1, destination.shape[-2], destination.shape[-1])).clone()
        source = source.reshape((-1, source.shape[-2], source.shape[-1]))
        (left, top) = (x, y)
        (right, bottom) = (min(left + source.shape[-1], destination.shape[-1]), min(top + source.shape[-2], destination.shape[-2]))
        (visible_width, visible_height) = (right - left, bottom - top)
        source_portion = source[:, :visible_height, :visible_width]
        destination_portion = destination[:, top:bottom, left:right]
        if operation == 'multiply':
            output[:, top:bottom, left:right] = destination_portion * source_portion
        elif operation == 'add':
            output[:, top:bottom, left:right] = destination_portion + source_portion
        elif operation == 'subtract':
            output[:, top:bottom, left:right] = destination_portion - source_portion
        elif operation == 'and':
            output[:, top:bottom, left:right] = torch.bitwise_and(destination_portion.round().bool(), source_portion.round().bool()).float()
        elif operation == 'or':
            output[:, top:bottom, left:right] = torch.bitwise_or(destination_portion.round().bool(), source_portion.round().bool()).float()
        elif operation == 'xor':
            output[:, top:bottom, left:right] = torch.bitwise_xor(destination_portion.round().bool(), source_portion.round().bool()).float()
        output = torch.clamp(output, 0.0, 1.0)
        return (output,)
```