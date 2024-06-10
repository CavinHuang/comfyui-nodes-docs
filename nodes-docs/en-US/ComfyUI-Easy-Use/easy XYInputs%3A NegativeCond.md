---
tags:
- Conditioning
---

# XY Inputs: NegCond //EasyUse
## Documentation
- Class name: `easy XYInputs: NegativeCond`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

The easy XYInputs: NegativeCond node is designed to process negative conditioning inputs for XY plotting. It dynamically generates values and conditions based on the specified negative inputs, facilitating the creation of plots that visually represent negative conditions.
## Input types
### Optional
- **`negative_i`**
    - Specifies a negative condition to be considered in the XY plot. It plays a role in determining the plot's representation of negative conditions, where 'i' can range from 1 to 4, representing up to four negative conditions.
    - Comfy dtype: `C`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs the processed XY values and conditions, encapsulating the negative conditions into a format suitable for plotting.
    - Python dtype: `Dict[str, List]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Negative_Cond:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "optional": {
                "negative_1": ("CONDITIONING"),
                "negative_2": ("CONDITIONING"),
                "negative_3": ("CONDITIONING"),
                "negative_4": ("CONDITIONING"),
            }
        }

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, negative_1=None, negative_2=None, negative_3=None, negative_4=None):
        axis = "advanced: Neg Condition"
        values = []
        cond = []
        # Create base entry
        if negative_1 is not None:
            values.append(0)
            cond.append(negative_1)
        if negative_2 is not None:
            values.append(1)
            cond.append(negative_2)
        if negative_3 is not None:
            values.append(2)
            cond.append(negative_3)
        if negative_4 is not None:
            values.append(3)
            cond.append(negative_4)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
