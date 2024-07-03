
# Documentation
- Class name: ConditioningSetMaskAndCombine
- Category: KJNodes/masking/conditioning
- Output node: False

该节点旨在对条件数据应用蒙版，根据指定的蒙版及其强度调整条件。它结合了设置蒙版和合并条件数据的功能，允许动态改变给定数据集中的条件区域。

# Input types
## Required
- positive_i
    - 指定一组受相应蒙版正面影响的条件数据，在将条件定制到数据的特定区域或方面中起关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_i
    - 指定一组受相应蒙版负面影响的条件数据，对于从条件中排除或减弱某些区域或方面至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- mask_i
    - 应用于相应条件数据的蒙版，决定正面或负面条件调整的影响区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_i_strength
    - 定义蒙版对条件的影响强度，允许对蒙版如何显著影响条件进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 决定是将条件区域设置为蒙版的边界还是使用默认设置，影响条件调整的范围和精度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

# Output types
- combined_positive
    - 蒙版应用后所有正面条件数据的组合结果，反映了正面调整的累积效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- combined_negative
    - 蒙版应用后所有负面条件数据的组合结果，反映了负面调整的累积效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskAndCombine:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "positive_1": ("CONDITIONING", ),
                "negative_1": ("CONDITIONING", ),
                "positive_2": ("CONDITIONING", ),
                "negative_2": ("CONDITIONING", ),
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
                "mask_1_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_2_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (["default", "mask bounds"],),
            }
        }

    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("combined_positive", "combined_negative",)
    FUNCTION = "append"
    CATEGORY = "KJNodes/masking/conditioning"
    DESCRIPTION = """
Bundles multiple conditioning mask and combine nodes into one,functionality is identical to ComfyUI native nodes
"""

    def append(self, positive_1, negative_1, positive_2, negative_2, mask_1, mask_2, set_cond_area, mask_1_strength, mask_2_strength):
        c = []
        c2 = []
        set_area_to_bounds = False
        if set_cond_area != "default":
            set_area_to_bounds = True
        if len(mask_1.shape) < 3:
            mask_1 = mask_1.unsqueeze(0)
        if len(mask_2.shape) < 3:
            mask_2 = mask_2.unsqueeze(0)
        for t in positive_1:
            append_helper(t, mask_1, c, set_area_to_bounds, mask_1_strength)
        for t in positive_2:
            append_helper(t, mask_2, c, set_area_to_bounds, mask_2_strength)
        for t in negative_1:
            append_helper(t, mask_1, c2, set_area_to_bounds, mask_1_strength)
        for t in negative_2:
            append_helper(t, mask_2, c2, set_area_to_bounds, mask_2_strength)
        return (c, c2)

```
