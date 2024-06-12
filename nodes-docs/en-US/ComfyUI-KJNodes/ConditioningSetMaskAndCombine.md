---
tags:
- Conditioning
---

# ConditioningSetMaskAndCombine
## Documentation
- Class name: `ConditioningSetMaskAndCombine`
- Category: `KJNodes/masking/conditioning`
- Output node: `False`

This node is designed to apply masks to conditioning data, adjusting the conditioning based on specified masks and their strengths. It combines the functionality of setting masks and combining conditioned data, allowing for the dynamic alteration of conditioning areas within a given dataset.
## Input types
### Required
- **`positive_i`**
    - Specifies a set of conditioning data to be positively influenced by the corresponding mask, playing a crucial role in tailoring the conditioning to specific areas or aspects of the data.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_i`**
    - Specifies a set of conditioning data to be negatively influenced by the corresponding mask, essential for excluding or diminishing certain areas or aspects from the conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`mask_i`**
    - A mask to be applied to the corresponding conditioning data, determining the areas of influence for positive or negative conditioning adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_i_strength`**
    - Defines the strength of the mask's influence on the conditioning, allowing for fine-tuned control over how prominently the mask affects the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Determines whether to set the conditioning area to the bounds of the mask or use the default setting, impacting the scope and precision of conditioning adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`combined_positive`**
    - Comfy dtype: `CONDITIONING`
    - The combined result of all positive conditioning data after mask application, reflecting the cumulative effect of positive adjustments.
    - Python dtype: `torch.Tensor`
- **`combined_negative`**
    - Comfy dtype: `CONDITIONING`
    - The combined result of all negative conditioning data after mask application, reflecting the cumulative effect of negative adjustments.
    - Python dtype: `torch.Tensor`
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
