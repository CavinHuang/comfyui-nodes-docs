---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Number to String
## Documentation
- Class name: `Number to String`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

The node converts a numerical input into its string representation, facilitating operations that require the input in textual form.
## Input types
### Required
- **`number`**
    - The numerical input to be converted into a string. This parameter is crucial for the conversion process, determining the textual output.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float]`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the numerical input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_To_String:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "number_to_string"

    CATEGORY = "WAS Suite/Number/Operations"

    def number_to_string(self, number):
        return ( str(number), )

```
