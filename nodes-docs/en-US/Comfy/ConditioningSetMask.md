---
tags:
- Conditioning
---

# Conditioning (Set Mask)
## Documentation
- Class name: `ConditioningSetMask`
- Category: `conditioning`
- Output node: `False`

This node is designed to modify the conditioning of a generative model by applying a mask and optionally setting the conditioning area to the bounds of the mask. It allows for the dynamic adjustment of the conditioning's influence through a strength parameter, enabling fine-tuned control over the generative process.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to be modified, serving as the context for the generative model's output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - A mask tensor used to specify the area of the conditioning to be modified.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - A scalar value that determines the intensity of the mask's effect on the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - A flag to determine whether the conditioning area should be set to the mask bounds or not.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data, with the mask applied and potentially adjusted according to the specified area and strength.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Attention couple
    - [ConditioningCombine](../../Comfy/Nodes/ConditioningCombine.md)



## Source code
```python
class ConditioningSetMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                              "mask": ("MASK", ),
                              "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                              "set_cond_area": (["default", "mask bounds"],),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "append"

    CATEGORY = "conditioning"

    def append(self, conditioning, mask, set_cond_area, strength):
        set_area_to_bounds = False
        if set_cond_area != "default":
            set_area_to_bounds = True
        if len(mask.shape) < 3:
            mask = mask.unsqueeze(0)

        c = node_helpers.conditioning_set_values(conditioning, {"mask": mask,
                                                                "set_area_to_bounds": set_area_to_bounds,
                                                                "mask_strength": strength})
        return (c, )

```
