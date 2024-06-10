# Documentation
- Class name: WAS_Mask_Add
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Add节点旨在执行将两个掩码图像相加的操作。它擅长合并掩码数据以创建复合掩码，这在需要层叠掩码的图像处理工作流程中至关重要。该节点确保结果掩码值在有效范围内，有助于掩码层的无缝集成。

# Input types
## Required
- masks_a
    - 参数'masks_a'代表要添加的第一组掩码图像。它在确定复合掩码的初始状态中起着关键作用，影响掩码处理过程的最终结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- masks_b
    - 参数'masks_b'是与'masks_a'集成的第二组掩码图像。它对于创建一个全面掩码至关重要，该掩码包含了来自两组掩码的所需特征。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 输出'MASKS'是节点执行的加法操作的结果。它是一个复合掩码，包含了输入掩码的组合特征，准备用于下游图像处理任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Add:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks_a': ('MASK',), 'masks_b': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'add_masks'

    def add_masks(self, masks_a, masks_b):
        if masks_a.ndim > 2 and masks_b.ndim > 2:
            added_masks = masks_a + masks_b
        else:
            added_masks = torch.clamp(masks_a.unsqueeze(1) + masks_b.unsqueeze(1), 0, 255)
            added_masks = added_masks.squeeze(1)
        return (added_masks,)
```