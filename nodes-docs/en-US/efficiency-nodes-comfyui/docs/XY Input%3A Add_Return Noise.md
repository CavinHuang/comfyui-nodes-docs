---
tags:
- Noise
---

# XY Input: Add/Return Noise
## Documentation
- Class name: `XY Input: Add_Return Noise`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

The node TSC_XYplot_AddReturnNoise is designed to handle XY input types specifically for adding or returning noise within a given process. It maps input types to their corresponding noise actions, enabling or disabling noise based on the specified type.
## Input types
### Required
- **`XY_type`**
    - Specifies the type of noise action to be performed, either adding noise or returning with leftover noise, which determines how the node processes the input.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_AddReturnNoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "XY_type": (["add_noise", "return_with_leftover_noise"],)}
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, XY_type):
        type_mapping = {
            "add_noise": "AddNoise",
            "return_with_leftover_noise": "ReturnNoise"
        }
        xy_type = type_mapping[XY_type]
        xy_value = ["enable", "disable"]
        return ((xy_type, xy_value),)

```
