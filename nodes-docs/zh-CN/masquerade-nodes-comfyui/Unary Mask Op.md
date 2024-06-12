# Documentation
- Class name: UnaryMaskOp
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

UnaryMaskOp节点旨在对给定的掩码图像执行多种一元操作。它提供了一套方法来操作掩码，例如反转掩码、平均像素值、四舍五入、夹紧值到一定范围以及取绝对值。这些操作对于图像处理任务中的预处理步骤至关重要，其中可能需要掩码的不同表示形式。

# Input types
## Required
- image
    - 图像参数对于UnaryMaskOp节点至关重要，因为它代表了将要进行一元操作的输入掩码图像。节点的功能直接与此输入的质量和格式相关，这影响了操作的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- op
    - 操作参数决定了将应用于输入掩码的特定一元操作。它是一个关键组件，因为它决定了将发生的变换类型，影响节点执行的最终结果。
    - Comfy dtype: COMBO['invert', 'average', 'round', 'clamp', 'abs']
    - Python dtype: str

# Output types
- result
    - 结果参数封装了应用于输入掩码的一元操作的结果。它是一个重要的输出，因为它反映了变换后的掩码，可以用于进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class UnaryMaskOp:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'op': (['invert', 'average', 'round', 'clamp', 'abs'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'op_mask'
    CATEGORY = 'Masquerade Nodes'

    def op_mask(self, image, op):
        image = tensor2mask(image)
        if op == 'invert':
            return (1.0 - image,)
        elif op == 'average':
            mean = torch.mean(torch.mean(image, dim=2), dim=1)
            return (mean.unsqueeze(1).unsqueeze(2).repeat(1, image.shape[1], image.shape[2]),)
        elif op == 'round':
            return (torch.round(image),)
        elif op == 'clamp':
            return (torch.min(torch.max(image, torch.tensor(0.0)), torch.tensor(1.0)),)
        elif op == 'abs':
            return (torch.abs(image),)
```