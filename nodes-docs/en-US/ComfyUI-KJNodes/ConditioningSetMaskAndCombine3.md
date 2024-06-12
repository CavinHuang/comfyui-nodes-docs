---
tags:
- Conditioning
---

# ConditioningSetMaskAndCombine3
## Documentation
- Class name: `ConditioningSetMaskAndCombine3`
- Category: `KJNodes/masking/conditioning`
- Output node: `False`

This node is designed to apply a set of masks to conditioning data, potentially modifying the conditioning area based on specified parameters, and then combine these conditioned elements into a single output. It focuses on enhancing or altering the conditioning process by applying multiple masks with varying strengths and areas, facilitating complex conditioning scenarios.
## Input types
### Required
- **`positive_i`**
    - Specifies a set of positive conditioning elements to be masked and combined. The strength and area of the mask applied to these elements can be adjusted, affecting the final conditioning output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`negative_i`**
    - Specifies a set of negative conditioning elements to be masked and combined. Similar to positive inputs, the mask's strength and area settings influence the conditioning outcome.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[torch.Tensor]`
- **`mask_i`**
    - The mask applied to the conditioning elements. It defines the area and intensity of the conditioning effect.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_i_strength`**
    - Defines the strength of the mask applied to the conditioning elements, affecting the intensity of the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Determines whether to set the conditioning area to the bounds of the mask or use a default setting, influencing how the mask is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`combined_positive`**
    - Comfy dtype: `CONDITIONING`
    - The combined result of positive conditioning elements after mask application and processing.
    - Python dtype: `List[torch.Tensor]`
- **`combined_negative`**
    - Comfy dtype: `CONDITIONING`
    - The combined result of negative conditioning elements after mask application and processing.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetMaskAndCombine3:
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
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
                "mask_3": ("MASK", ),
                "mask_1_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_2_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "mask_3_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
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

    def append(self, positive_1, negative_1, positive_2, positive_3, negative_2, negative_3, mask_1, mask_2, mask_3, set_cond_area, mask_1_strength, mask_2_strength, mask_3_strength):
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
        for t in positive_1:
            append_helper(t, mask_1, c, set_area_to_bounds, mask_1_strength)
        for t in positive_2:
            append_helper(t, mask_2, c, set_area_to_bounds, mask_2_strength)
        for t in positive_3:
            append_helper(t, mask_3, c, set_area_to_bounds, mask_3_strength)
        for t in negative_1:
            append_helper(t, mask_1, c2, set_area_to_bounds, mask_1_strength)
        for t in negative_2:
            append_helper(t, mask_2, c2, set_area_to_bounds, mask_2_strength)
        for t in negative_3:
            append_helper(t, mask_3, c2, set_area_to_bounds, mask_3_strength)
        return (c, c2)

```
