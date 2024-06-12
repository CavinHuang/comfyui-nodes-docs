---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Number to Float
## Documentation
- Class name: `Number to Float`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

This node is designed to convert a given number into its floating-point representation. It abstracts the process of type conversion, ensuring that numerical inputs are seamlessly transformed into floats, facilitating operations that require floating-point precision.
## Input types
### Required
- **`number`**
    - The 'number' input is the numerical value that is to be converted into a floating-point representation. This input is crucial as it directly influences the output by determining the exact floating-point value that will be produced.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float, str]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is the floating-point representation of the input number. This is significant for operations or calculations that require floating-point precision.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_To_Float:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "number_to_float"

    CATEGORY = "WAS Suite/Number/Operations"

    def number_to_float(self, number):
        return (float(number), )

```
