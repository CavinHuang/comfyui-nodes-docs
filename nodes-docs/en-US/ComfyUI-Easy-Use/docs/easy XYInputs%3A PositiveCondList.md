---
tags:
- Conditioning
---

# XY Inputs: PosCondList //EasyUse
## Documentation
- Class name: `easy XYInputs: PositiveCondList`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

The XYplot_Positive_Cond_List node is designed to process a list of positive conditions, transforming them into a structured format suitable for plotting or further analysis. It focuses on identifying and organizing the conditions based on their positive attributes, facilitating easy visualization or manipulation of data points in a 'positive' context.
## Input types
### Required
- **`positive`**
    - The 'positive' input accepts a list of conditions, each representing a positive attribute or criterion. This input is crucial for the node's operation, as it determines the conditions that will be processed and structured for output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs a structured representation of the positive conditions, including their indices and corresponding conditions, ready for plotting or analysis.
    - Python dtype: `Tuple[Dict[str, List[str]], ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Positive_Cond_List:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "positive": ("CONDITIONING",),
            }
        }

    INPUT_IS_LIST = True
    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, positive):
        axis = "advanced: Pos Condition"
        values = []
        cond = []
        for index, c in enumerate(positive):
            values.append(str(index))
            cond.append(c)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
