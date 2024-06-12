---
tags:
- Math
---

# Sinus
## Documentation
- Class name: `DF_Sinus`
- Category: `Derfuu_Nodes/Math/Trigonometry`
- Output node: `False`

The Sinus node calculates the sine of a given angle, which can be specified in either radians or degrees. It also offers the option to compute the arcsine of the input value, allowing for flexibility in trigonometric calculations.
## Input types
### Required
- **`value`**
    - The angle for which the sine value is to be calculated. This can be in radians or degrees, based on the 'type_' parameter.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`type_`**
    - Specifies the unit of the input angle: 'RAD' for radians or 'DEG' for degrees, affecting how the input value is interpreted before calculation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`arcSin`**
    - A boolean flag that, when true, changes the operation from sine to arcsine, allowing for inverse trigonometric calculations.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of the sine or arcsine calculation, depending on the input parameters.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SinNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "value": Field.float(),
                "type_": Field.combo(["RAD", "DEG"]),
                "arcSin": Field.combo([False, True])
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_TRIGONOMETRY

    def get_value(self, value, type_="RAD", arcSin=False):
        if type_ == "DEG":
            value = math.radians(value)
        if arcSin == True:
            value = math.asin(value)
        else:
            value = math.sin(value)
        return (value,)

```
