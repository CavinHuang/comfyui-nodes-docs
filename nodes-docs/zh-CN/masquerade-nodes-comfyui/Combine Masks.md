# Documentation
- Class name: MaskCombineOp
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

MaskCombineOp节点旨在对两个输入图像执行各种操作，如并集、交集和乘法，以将它们组合成单个图像。它能够处理不同类型的操作以实现所需的视觉效果，这在图像处理和计算机视觉任务中非常有用。

# Input types
## Required
- image1
    - 要与另一张图像组合的第一张图像。它在确定节点操作的最终输出中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 将与第一张图像组合的第二张图像。对于实现所需的组合效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- op
    - 要在两张图像上执行的操作。它定义了图像如何组合，是节点功能的关键参数。
    - Comfy dtype: COMBO['union (max)', 'intersection (min)', 'difference', 'multiply', 'multiply_alpha', 'add', 'greater_or_equal', 'greater']
    - Python dtype: str
- clamp_result
    - 确定操作后是否应将结果限制在一定范围内。限制可以防止某些操作可能产生的极端值。
    - Comfy dtype: COMBO['yes', 'no']
    - Python dtype: str
- round_result
    - 指定操作后是否应将结果四舍五入到最近的整数。四舍五入对于某些类型的图像处理很有用。
    - Comfy dtype: COMBO['no', 'yes']
    - Python dtype: str

# Output types
- result
    - 由节点执行的操作产生的组合图像。它代表了组合过程的视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskCombineOp:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'op': (['union (max)', 'intersection (min)', 'difference', 'multiply', 'multiply_alpha', 'add', 'greater_or_equal', 'greater'],), 'clamp_result': (['yes', 'no'],), 'round_result': (['no', 'yes'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'combine'
    CATEGORY = 'Masquerade Nodes'

    def combine(self, image1, image2, op, clamp_result, round_result):
        (image1, image2) = tensors2common(image1, image2)
        if op == 'union (max)':
            result = torch.max(image1, image2)
        elif op == 'intersection (min)':
            result = torch.min(image1, image2)
        elif op == 'difference':
            result = image1 - image2
        elif op == 'multiply':
            result = image1 * image2
        elif op == 'multiply_alpha':
            image1 = tensor2rgba(image1)
            image2 = tensor2mask(image2)
            result = torch.cat((image1[:, :, :, :3], (image1[:, :, :, 3] * image2).unsqueeze(3)), dim=3)
        elif op == 'add':
            result = image1 + image2
        elif op == 'greater_or_equal':
            result = torch.where(image1 >= image2, 1.0, 0.0)
        elif op == 'greater':
            result = torch.where(image1 > image2, 1.0, 0.0)
        if clamp_result == 'yes':
            result = torch.min(torch.max(result, torch.tensor(0.0)), torch.tensor(1.0))
        if round_result == 'yes':
            result = torch.round(result)
        return (result,)
```