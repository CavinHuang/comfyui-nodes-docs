---
tags:
- MathematicalFunctions
- Multiplication
---

# Number Multiple Of
## Documentation
- Class name: `Number Multiple Of`
- Category: `WAS Suite/Number/Functions`
- Output node: `False`

The `Number Multiple Of` node is designed to determine if a given number is a multiple of another specified number, and if not, it adjusts the number to the next multiple. This functionality is essential in scenarios where alignment to specific numerical intervals is required.
## Input types
### Required
- **`number`**
    - The `number` parameter represents the value to be checked against the specified multiple. It plays a crucial role in determining whether the number is already a multiple or needs adjustment.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int or float`
- **`multiple`**
    - The `multiple` parameter specifies the base value that the `number` parameter is checked against to determine if it is a multiple. This parameter influences the calculation of the next closest multiple if necessary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The output is either the original number if it is a multiple of the specified `multiple` parameter, or the next closest multiple. It provides a way to ensure numbers align with specific intervals.
    - Python dtype: `int or float`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is either the original number if it is a multiple of the specified `multiple` parameter, or the next closest multiple, represented as a float.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The output is either the original number if it is a multiple of the specified `multiple` parameter, or the next closest multiple, represented as an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_Multiple_Of:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
                "multiple": ("INT", {"default": 8, "min": -18446744073709551615, "max": 18446744073709551615}),
            }
        }

    RETURN_TYPES =("NUMBER", "FLOAT", "INT")
    FUNCTION = "number_multiple_of"

    CATEGORY = "WAS Suite/Number/Functions"

    def number_multiple_of(self, number, multiple=8):
        if number % multiple != 0:
            return ((number // multiple) * multiple + multiple, )
        return (number, number, int(number))

```
