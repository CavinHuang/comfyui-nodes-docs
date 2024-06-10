# Documentation
- Class name: UnaryImageOp
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

UnaryImageOp节点旨在执行多种单输入图像操作。它提供了一系列一元操作，如图像反转、平均、四舍五入、夹紧和绝对值计算。这些操作对于图像预处理和特征提取至关重要，允许操作图像数据以满足特定的分析或可视化需求。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是UnaryImageOp节点的主要输入。它代表将经历指定一元操作的图像数据。图像的特性直接影响节点的输出，使其成为节点执行中的基本组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- op
    - op参数指定要应用于图像的一元操作。它是节点功能的关键决定因素，因为它决定了将执行的转换类型。操作的选择可以显著改变结果图像的特性，影响下游处理。
    - Comfy dtype: COMBO['invert', 'average', 'round', 'clamp', 'abs']
    - Python dtype: str

# Output types
- result
    - 结果参数代表应用于输入图像的一元操作的输出。它包含了在执行指定操作后转换的图像数据。这个输出是重要的，因为它为任何后续的图像分析或处理步骤奠定了基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class UnaryImageOp:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'op': (['invert', 'average', 'round', 'clamp', 'abs'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'op_image'
    CATEGORY = 'Masquerade Nodes'

    def op_image(self, image, op):
        image = tensor2rgb(image)
        if op == 'invert':
            return (1.0 - image,)
        elif op == 'average':
            mean = torch.mean(torch.mean(image, dim=2), dim=1)
            return (mean.unsqueeze(1).unsqueeze(2).repeat(1, image.shape[1], image.shape[2], 1),)
        elif op == 'round':
            return (torch.round(image),)
        elif op == 'clamp':
            return (torch.min(torch.max(image, torch.tensor(0.0)), torch.tensor(1.0)),)
        elif op == 'abs':
            return (torch.abs(image),)
```