# Documentation
- Class name: MaskComposite
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

MaskComposite节点旨在对两个掩码张量执行各种逻辑和算术运算。它在图像处理任务中发挥关键作用，特别是在面部解析领域，它可以组合掩码以细化面部特征的分割。该节点基于逐元素操作的原理运行，确保输出掩码是应用于输入掩码中每对相应元素的指定操作的结果。

# Input types
## Required
- destination
    - destination参数是一个表示初始掩码的张量，操作将应用于此掩码。它对节点的执行至关重要，因为它决定了将根据指定的操作进行修改的基础掩码。
    - Comfy dtype: "MASK"
    - Python dtype: torch.Tensor
- source
    - source参数是另一个张量，将与目标张量结合使用以执行指定操作。它至关重要，因为它提供了将与目标掩码交互以产生最终掩码结果的次要输入。
    - Comfy dtype: "MASK"
    - Python dtype: torch.Tensor
- operation
    - operation参数指示将在目标和源张量之间执行的逐元素操作的类型。它是如何计算最终掩码的关键决定因素，允许进行各种形式的掩码操作。
    - Comfy dtype: COMBO["multiply", "add", "subtract", "and", "or", "xor"]
    - Python dtype: str

# Output types
- mask_result
    - mask_result输出参数是将指定操作应用于输入目标和源张量后得到的张量。它代表了操作执行后最终组合的掩码。
    - Comfy dtype: "MASK"
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskComposite:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'destination': ('MASK', {}), 'source': ('MASK', {}), 'operation': (['multiply', 'add', 'subtract', 'and', 'or', 'xor'],)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, destination: Tensor, source: Tensor, operation: str):
        mask_result = destination
        if operation == 'multiply':
            mask_result = mask_result * source
        if operation == 'add':
            mask_result = mask_result + source
        if operation == 'subtract':
            mask_result = mask_result - source
        if operation == 'and':
            mask_result = mask_result & source
        if operation == 'or':
            mask_result = mask_result | source
        if operation == 'xor':
            mask_result = mask_result ^ source
        return (mask_result,)
```