---
tags:
- ModelGuidance
---

# XY Inputs: CFG Scale //EasyUse
## Documentation
- Class name: `easy XYInputs: CFG Scale`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node is designed to facilitate the exploration and manipulation of CFG (Conditional Free Guidance) scale values within generative models. It allows users to dynamically adjust the CFG scale, enabling fine-tuning of the model's conditional generation capabilities for enhanced control over the output quality and adherence to specified conditions.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of batches for which the CFG scale adjustments will be applied. This parameter is crucial for understanding the scale of the operation and ensuring that the adjustments are applied uniformly across multiple instances.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_cfg`**
    - Determines the starting value of the CFG scale adjustment. This allows for the initial setting of the conditional guidance's influence on the generative process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`last_cfg`**
    - Sets the ending value of the CFG scale adjustment. This parameter enables the fine-tuning of the CFG scale's influence on the generative process over a specified range, allowing for gradual adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Returns the outcome of the CFG scale adjustments, which could be either a modified generative model or a specific set of generation results, depending on the context of the operation.
    - Python dtype: `custom type`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class XYplot_CFG:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": 3, "min": 0, "max": 50}),
                "first_cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                "last_cfg": ("FLOAT", {"default": 9.0, "min": 0.0, "max": 100.0}),
            }
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count, first_cfg, last_cfg):
        axis = "advanced: CFG Scale"
        values = generate_floats(batch_count, first_cfg, last_cfg)
        return ({"axis": axis, "values": values},) if values else (None,)

```
