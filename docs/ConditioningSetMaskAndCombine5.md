
# Documentation
- Class name: ConditioningSetMaskAndCombine5
- Category: KJNodes/masking/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetMaskAndCombine5节点用于应用蒙版到条件数据，并以不同强度组合多组条件和蒙版。它允许根据应用的蒙版有选择地增强或抑制条件数据中的特征，从而实现生成模型的复杂条件设置场景。此节点通过对多组输入进行蒙版和组合，为生成过程提供了精细的控制。

# Input types
## Required
- positive_i
    - 指定一组要应用蒙版并组合的正面条件数据。应用蒙版的强度会影响这些特征在最终结果中的表现程度。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- negative_i
    - 指定一组要应用蒙版并组合的负面条件数据。应用蒙版的强度会影响这些特征在最终结果中被抑制的程度。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- mask_i
    - 要应用于条件数据集的蒙版，决定影响的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_i_strength
    - 定义应用于条件数据集的蒙版强度，影响特征增强或抑制的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 决定是否将条件区域设置为蒙版定义的边界，允许对条件效果进行更精确的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- combined_positive
    - 蒙版应用后的组合正面条件数据集，可用于进一步的生成过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- combined_negative
    - 蒙版应用后的组合负面条件数据集，指示生成模型中被抑制的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskAndCombine5:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "positive_1": ("CONDITIONING", ),
                "negative_1": ("CONDITIONING", ),
                "positive_2": ("CONDITIONING", ),
                "negative_2": ("CONDITIONING", ),
                "positive_3": ("CONDITIONING", ),
                "negative_3": ("CONDITIONING", ),
                "positive_4": ("CONDITIONING", ),
                "negative_4": ("CONDITIONING", ),
                "positive_5": ("CONDITIONING", ),
                "negative_5": ("CONDITIONING", ),
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
                "mask_3": ("MASK", ),
                "mask_4": ("MASK", ),
                "mask_5": ("MASK", ),
                "mask_1_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_2_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_3_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_4_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_5_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
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

    def append(self, positive_1, negative_1, positive_2, positive_3, positive_4, positive_5, negative_2, negative_3, negative_4, negative_5, mask_1, mask_2, mask_3, mask_4, mask_5, set_cond_area, mask_1_strength, mask_2_strength, mask_3_strength, mask_4_strength, mask_5_strength):
        c = []
        c2 = []
        set_area_to_bounds = False
        if set_cond_area != "default":
            set_area_to_bounds = True
        if len(mask_1.shape) < 3:
            mask_1 = mask_1.unsqueeze(0)
        if len(mask_2.shape) < 3:
            mask_2 = mask_2.unsqueeze(0)
        if len(mask_3.shape) < 3:
            mask_3 = mask_3.unsqueeze(0)
        if len(mask_4.shape) < 3:
            mask_4 = mask_4.unsqueeze(0)
        if len(mask_5.shape) < 3:
            mask_5 = mask_5.unsqueeze(0)
        for t in positive_1:
            append_helper(t, mask_1, c, set_area_to_bounds, mask_1_strength)
        for t in positive_2:
            append_helper(t, mask_2, c, set_area_to_bounds, mask_2_strength)
        for t in positive_3:
            append_helper(t, mask_3, c, set_area_to_bounds, mask_3_strength)
        for t in positive_4:
            append_helper(t, mask_4, c, set_area_to_bounds, mask_4_strength)
        for t in positive_5:
            append_helper(t, mask_5, c, set_area_to_bounds, mask_5_strength)
        for t in negative_1:
            append_helper(t, mask_1, c2, set_area_to_bounds, mask_1_strength)
        for t in negative_2:
            append_helper(t, mask_2, c2, set_area_to_bounds, mask_2_strength)
        for t in negative_3:
            append_helper(t, mask_3, c2, set_area_to_bounds, mask_3_strength)
        for t in negative_4:
            append_helper(t, mask_4, c2, set_area_to_bounds, mask_4_strength)
        for t in negative_5:
            append_helper(t, mask_5, c2, set_area_to_bounds, mask_5_strength)
        return (c, c2)

```
