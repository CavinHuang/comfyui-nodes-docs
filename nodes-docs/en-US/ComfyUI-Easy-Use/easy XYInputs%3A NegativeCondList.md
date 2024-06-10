---
tags:
- Conditioning
---

# XY Inputs: NegCondList //EasyUse
## Documentation
- Class name: `easy XYInputs: NegativeCondList`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node processes a list of negative conditions for XY plotting, transforming them into a structured format suitable for further processing or visualization. It abstracts the complexity of handling multiple negative conditions by encapsulating them into a unified representation.
## Input types
### Required
- **`negative`**
    - The 'negative' input accepts a list of conditions intended to be used for negative scenarios in XY plotting. It plays a crucial role in defining the conditions under which certain actions or events are considered negative, thereby influencing the outcome of the plotting process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs a structured representation of the negative conditions, including their indices and corresponding conditions, formatted for easy integration with XY plotting functionalities.
    - Python dtype: `Tuple[Dict[str, List[str]], ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Negative_Cond_List:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "negative": ("CONDITIONING",),
            }
        }

    INPUT_IS_LIST = True
    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, negative):
        axis = "advanced: Neg Condition"
        values = []
        cond = []
        for index, c in enumerate(negative):
            values.append(index)
            cond.append(c)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
