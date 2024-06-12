---
tags:
- Math
---

# Cosines
## Documentation
- Class name: `DF_Cosines`
- Category: `Derfuu_Nodes/Math/Trigonometry`
- Output node: `False`

The Cosines node calculates the cosine of a given angle, with the option to compute the arc cosine instead. It supports angles in both degrees and radians, allowing for flexible trigonometric calculations.
## Input types
### Required
- **`value`**
    - The numerical value of the angle for which the cosine (or arc cosine) is to be calculated. This value determines the specific angle involved in the trigonometric operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`type_`**
    - Specifies the unit of the input angle: radians ('RAD') or degrees ('DEG'). This affects how the angle is interpreted for the trigonometric calculation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`arcCos`**
    - A boolean flag that, when set to True, changes the operation from calculating the cosine to calculating the arc cosine of the given angle.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of the cosine (or arc cosine) calculation for the given angle.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CosNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"],),
                "arcCos": Field.combo([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcCos=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcCos == True:
            value = math.acos(value)
        else:
            value = math.cos(value)
        return (value,)

```
