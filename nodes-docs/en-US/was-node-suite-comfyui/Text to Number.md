---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Text to Number
## Documentation
- Class name: `Text to Number`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

The 'Text to Number' node is designed to convert textual representations of numbers into their numerical form. This node is essential for processing and interpreting text-based data that includes numerical information, facilitating the transition from textual to numerical analysis.
## Input types
### Required
- **`text`**
    - The 'text' parameter accepts a string representation of a number, which can be either an integer or a floating-point number. This parameter is crucial for the node's operation as it determines the numerical value that will be extracted and converted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The output is the numerical representation of the input text, provided as either an integer or a floating-point number, depending on the format of the input text.
    - Python dtype: `float or int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_To_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("NUMBER",)
    FUNCTION = "text_to_number"

    CATEGORY = "WAS Suite/Text/Operations"

    def text_to_number(self, text):
        if text.replace(".", "").isnumeric():
            number = float(text)
        else:
            number = int(text)
        return (number, )

```
