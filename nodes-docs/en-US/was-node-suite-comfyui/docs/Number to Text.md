---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Number to Text
## Documentation
- Class name: `Number to Text`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

The 'Number to Text' node is designed to convert numerical inputs into their textual representation, facilitating the integration of numerical data into text-based workflows or interfaces.
## Input types
### Required
- **`number`**
    - The 'number' input accepts a numerical value that will be converted into its textual representation. This conversion allows for the seamless incorporation of numerical data into text-based formats.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int or float`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is the textual representation of the input number, enabling its use in text-based applications or for display purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_To_Text:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "number_to_text"

    CATEGORY = "WAS Suite/Number/Operations"

    def number_to_text(self, number):
        return ( str(number), )

```
