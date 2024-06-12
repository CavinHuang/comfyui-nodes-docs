---
tags:
- Conditioning
---

# ConditioningSetMaskAndCombine5
## Documentation
- Class name: `ConditioningSetMaskAndCombine5`
- Category: `KJNodes/masking/conditioning`
- Output node: `False`

This node is designed to apply masks to conditioning data, combining multiple sets of conditioning and masks with varying strengths. It allows for the selective enhancement or suppression of features within the conditioning data based on the masks applied, facilitating complex conditioning scenarios for generative models.
## Input types
### Required
- **`positive_i`**
    - Specifies a set of positive conditioning data to be masked and combined. The strength of the mask applied affects how prominently these features will be represented.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`negative_i`**
    - Specifies a set of negative conditioning data to be masked and combined. The strength of the mask applied affects how these features will be suppressed.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`mask_i`**
    - The mask to be applied to the set of conditioning data, determining the areas of influence.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_i_strength`**
    - Defines the strength of the mask applied to the set of conditioning data, influencing the degree of feature enhancement or suppression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Determines whether to set the conditioning area to the bounds defined by the mask, allowing for more precise control over the conditioning effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`combined_positive`**
    - Comfy dtype: `CONDITIONING`
    - The combined set of positive conditioning data after mask application, ready for use in further generative processes.
    - Python dtype: `List[torch.Tensor]`
- **`combined_negative`**
    - Comfy dtype: `CONDITIONING`
    - The combined set of negative conditioning data after mask application, indicating suppressed features for generative models.
    - Python dtype: `List[torch.Tensor]`
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
