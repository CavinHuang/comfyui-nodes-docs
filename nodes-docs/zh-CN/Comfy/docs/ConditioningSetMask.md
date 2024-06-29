# Documentation
- Class name: ConditioningSetMask
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetMask节点旨在通过应用掩码和调整其强度来修改给定的条件集。它允许定制条件区域，增强模型对不同输入响应的灵活性。

# Input types
## Required
- conditioning
    - 条件参数是必要的，因为它定义了节点将操作的基础条件集。它直接影响掩码和强度参数的施加方式，影响最终结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- mask
    - 掩码参数对于确定条件集中将被修改的元素至关重要。它与强度参数协同工作，以控制修改的范围。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- strength
    - 强度参数决定了掩码对条件集的影响强度。它特别重要，因为它调整了掩码的影响范围，允许对节点输出进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - set_cond_area参数指定是使用默认的条件区域还是应用掩码边界。这个选择可以显著改变节点的行为和结果条件集。
    - Comfy dtype: COMBO['default', 'mask bounds']
    - Python dtype: str

# Output types
- conditioning
    - 输出的条件集是将输入掩码和强度应用于原始条件集的结果。它代表了节点对模型处理流程的最终贡献。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningSetMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'mask': ('MASK',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'set_cond_area': (['default', 'mask bounds'],)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'append'
    CATEGORY = 'conditioning'

    def append(self, conditioning, mask, set_cond_area, strength):
        set_area_to_bounds = False
        if set_cond_area != 'default':
            set_area_to_bounds = True
        if len(mask.shape) < 3:
            mask = mask.unsqueeze(0)
        c = node_helpers.conditioning_set_values(conditioning, {'mask': mask, 'set_area_to_bounds': set_area_to_bounds, 'mask_strength': strength})
        return (c,)
```