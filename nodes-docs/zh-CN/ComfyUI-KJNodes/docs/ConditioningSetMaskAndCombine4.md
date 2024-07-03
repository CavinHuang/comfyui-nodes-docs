
# Documentation
- Class name: ConditioningSetMaskAndCombine4
- Category: KJNodes/masking/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点用于将一系列掩码应用于条件数据，并根据指定的强度和区域进行组合。它允许通过掩码动态调整条件区域，从而在多步骤或复杂的条件场景中实现对条件过程的精确控制。

# Input types
## Required
- positive_i
    - 指定要与相应掩码结合的正向条件数据。可以调整强度和应用区域，从而实现细致入微的条件效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- negative_i
    - 指定要与相应掩码结合的负向条件数据，允许基于掩码的应用来减弱或抵消条件效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- mask_i
    - 应用于条件数据的掩码，定义了条件效果的区域和强度。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_i_strength
    - 定义相应掩码的条件效果强度，影响所应用条件的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 决定条件区域是设置为掩码定义的边界还是使用默认设置，影响条件的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- combined_positive
    - 在应用掩码并根据指定参数进行组合后得到的正向条件数据结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- combined_negative
    - 反映了掩码对原始条件的减弱或抵消效果后的负向条件数据结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskAndCombine4:
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
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
                "mask_3": ("MASK", ),
                "mask_4": ("MASK", ),
                "mask_1_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_2_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_3_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_4_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
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

    def append(self, positive_1, negative_1, positive_2, positive_3, positive_4, negative_2, negative_3, negative_4, mask_1, mask_2, mask_3, mask_4, set_cond_area, mask_1_strength, mask_2_strength, mask_3_strength, mask_4_strength):
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
        for t in positive_1:
            append_helper(t, mask_1, c, set_area_to_bounds, mask_1_strength)
        for t in positive_2:
            append_helper(t, mask_2, c, set_area_to_bounds, mask_2_strength)
        for t in positive_3:
            append_helper(t, mask_3, c, set_area_to_bounds, mask_3_strength)
        for t in positive_4:
            append_helper(t, mask_4, c, set_area_to_bounds, mask_4_strength)
        for t in negative_1:
            append_helper(t, mask_1, c2, set_area_to_bounds, mask_1_strength)
        for t in negative_2:
            append_helper(t, mask_2, c2, set_area_to_bounds, mask_2_strength)
        for t in negative_3:
            append_helper(t, mask_3, c2, set_area_to_bounds, mask_3_strength)
        for t in negative_4:
            append_helper(t, mask_4, c2, set_area_to_bounds, mask_4_strength)
        return (c, c2)

```
