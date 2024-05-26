# Documentation
- Class name: WAS_Mask_Combine
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Combine 节点旨在将多个遮罩图像合并为一个单一的、连贯的遮罩。它有效地合并输入的遮罩，可以用于各种应用，如图像处理、图形设计和视觉效果。该节点确保合并后的遮罩保留了各个单独遮罩的基本特征，使其成为增强视觉内容的多功能工具。

# Input types
## Required
- mask_a
    - 要与其他遮罩结合的第一个遮罩。它在确定合并遮罩的初始属性方面起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray
- mask_b
    - 要与第一个遮罩合并的第二个遮罩。它有助于最终遮罩的整体构成。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray
## Optional
- mask_c
    - 可选的额外遮罩，可以包含在组合过程中，以进一步完善最终遮罩。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray
- mask_d
    - 另一个可选的遮罩，可以提供给组合遮罩以增加其复杂性和细节。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray
- mask_e
    - 一个额外的可选遮罩，可以用来给组合遮罩添加更多层，增强其视觉元素。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray
- mask_f
    - 最后一个可选遮罩，可以集成到创建一个详细和复杂的组合遮罩中。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image or numpy.ndarray

# Output types
- combined_mask
    - 所有输入遮罩组合后得到的最终遮罩。它是单一的遮罩，包含了输入遮罩的视觉数据。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Combine:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask_a': ('MASK',), 'mask_b': ('MASK',)}, 'optional': {'mask_c': ('MASK',), 'mask_d': ('MASK',), 'mask_e': ('MASK',), 'mask_f': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'combine_masks'

    def combine_masks(self, mask_a, mask_b, mask_c=None, mask_d=None, mask_e=None, mask_f=None):
        masks = [mask_a, mask_b]
        if mask_c:
            masks.append(mask_c)
        if mask_d:
            masks.append(mask_d)
        if mask_e:
            masks.append(mask_e)
        if mask_f:
            masks.append(mask_f)
        combined_mask = torch.sum(torch.stack(masks, dim=0), dim=0)
        combined_mask = torch.clamp(combined_mask, 0, 1)
        return (combined_mask,)
```