# Documentation
- Class name: MixByMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

MixByMask节点旨在根据提供的掩码混合两张图像。它通过根据掩码的值调整每张图像的贡献来操作，允许在单个合成图像中无缝集成不同的视觉元素。

# Input types
## Required
- image1
    - 要混合的第一张图像。这是一个基本输入，决定了最终输出的基本视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 要混合的第二张图像。它提供了将根据掩码与第一张图像合并的额外视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 确定两张图像如何混合的掩码。它是一个关键组件，控制着混合过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- mixed_image
    - 输出是应用掩码到输入图像后得到的混合图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MixByMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'mask': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'mix'
    CATEGORY = 'Masquerade Nodes'

    def mix(self, image1, image2, mask):
        (image1, image2) = tensors2common(image1, image2)
        mask = tensor2batch(mask, image1.size())
        return (image1 * (1.0 - mask) + image2 * mask,)
```