---
tags:
- Conditioning
---

# ConditioningSetMaskAndCombine4
## Documentation
- Class name: `ConditioningSetMaskAndCombine4`
- Category: `KJNodes/masking/conditioning`
- Output node: `False`

This node is designed to apply a series of masks to conditioning data, combining them based on specified strengths and areas. It allows for the dynamic adjustment of conditioning areas through masks, enabling precise control over the conditioning process in a multi-step or complex conditioning scenario.
## Input types
### Required
- **`positive_i`**
    - Specifies the positive conditioning data to be combined with the corresponding mask. The strength and area of application are adjustable, allowing for nuanced conditioning effects.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`negative_i`**
    - Specifies the negative conditioning data to be combined with the corresponding mask, allowing for the subtraction or negation of conditioning effects based on the mask's application.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`mask_i`**
    - The mask to be applied to the conditioning data, defining the area and intensity of the conditioning effect.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_i_strength`**
    - Defines the strength of the conditioning effect for the corresponding mask, influencing the intensity of the applied conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Determines whether the conditioning area is set to the bounds defined by the masks or uses a default setting, affecting how conditioning is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`combined_positive`**
    - Comfy dtype: `CONDITIONING`
    - The resulting positive conditioning data after applying the masks and combining them based on the specified parameters.
    - Python dtype: `List[torch.Tensor]`
- **`combined_negative`**
    - Comfy dtype: `CONDITIONING`
    - The resulting negative conditioning data, reflecting the subtractive or negating effects of the masks on the original conditioning.
    - Python dtype: `List[torch.Tensor]`
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
