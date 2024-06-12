---
tags:
- Math
---

# Tangent
## Documentation
- Class name: `DF_Tangent`
- Category: `Derfuu_Nodes/Math/Trigonometry`
- Output node: `False`

The DF_Tangent node calculates the tangent or arctangent of a given value, with the option to specify the angle measurement unit (degrees or radians). This functionality allows for the transformation and analysis of angular data within mathematical and trigonometric computations.
## Input types
### Required
- **`value`**
    - The numerical value for which the tangent or arctangent is to be calculated. This input is crucial for determining the specific angle or its tangent value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`type_`**
    - Specifies the angle measurement unit for the input value, either as radians (RAD) or degrees (DEG), affecting how the value is interpreted and processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`arcTan`**
    - A boolean flag that determines whether to calculate the arctangent (True) or tangent (False) of the input value, allowing for flexibility in trigonometric calculations.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The calculated tangent or arctangent of the input value, provided as a floating-point number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class tgNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"],),
                "arcTan": Field.combo([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcTan=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcTan == True:
            value = math.atan(value)
        else:
            value = math.tan(value)
        return (value,)

```
