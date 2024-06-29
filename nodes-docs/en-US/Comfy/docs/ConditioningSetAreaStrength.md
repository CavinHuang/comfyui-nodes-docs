---
tags:
- Conditioning
---

# ConditioningSetAreaStrength
## Documentation
- Class name: `ConditioningSetAreaStrength`
- Category: `conditioning`
- Output node: `False`

This node specializes in adjusting the strength of conditioning applied to a specific area, allowing for fine-tuned control over the intensity of effects or modifications within that area.
## Input types
### Required
- **`conditioning`**
    - The conditioning context to which the strength adjustment will be applied, serving as the foundation for the modification.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`strength`**
    - Specifies the intensity of the conditioning effect, enabling precise control over how strongly the area is influenced.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Returns the modified conditioning context with the updated strength value applied.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningSetAreaStrength:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                              "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "append"

    CATEGORY = "conditioning"

    def append(self, conditioning, strength):
        c = node_helpers.conditioning_set_values(conditioning, {"strength": strength})
        return (c, )

```
