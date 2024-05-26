# Documentation
- Class name: MaskListComposite
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

MaskListComposite节点旨在对一系列二进制掩码执行指定的逻辑或算术操作。它顺序处理输入掩码，应用所选操作将它们组合成单个结果掩码。此节点在需要操作和组合二进制面部特征掩码的任务中起着关键作用，例如在面部分割或面部解析领域中的特征提取。

# Input types
## Required
- mask
    - ‘mask’参数是要通过‘operation’参数指定的操作进行组合的二进制掩码集合。它对节点的功能至关重要，因为它决定了将经历逻辑或算术操作的输入。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- operation
    - ‘operation’参数指示在输入掩码上执行的操作类型。它可以是‘multiply’、‘add’、‘and’、‘or’或‘xor’中的一个，它显著影响掩码组合过程的最终结果。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- result
    - ‘result’参数是节点的输出，代表在输入掩码上应用指定操作后组合的掩码。它封装了节点处理的结果，对于依赖于合成掩码的后续任务至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskListComposite:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK', {}), 'operation': (['multiply', 'add', 'and', 'or', 'xor'],)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, mask: Tensor, operation: str):
        mask_result = mask[0]
        for item in mask[1:]:
            if operation == 'multiply':
                mask_result = mask_result * item
            if operation == 'add':
                mask_result = mask_result + item
            if operation == 'and':
                mask_result = mask_result & item
            if operation == 'or':
                mask_result = mask_result | item
            if operation == 'xor':
                mask_result = mask_result ^ item
        return (mask_result.unsqueeze(0),)
```