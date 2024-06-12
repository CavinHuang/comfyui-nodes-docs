---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# String to Float
## Documentation
- Class name: `String to Float`
- Category: `Bmad/api/parseInput`
- Output node: `False`

The String2Float node is designed to convert string representations of numbers into their floating-point numerical equivalents. This functionality is crucial for parsing and processing numerical data that is initially received or stored as text.
## Input types
### Required
- **`inStr`**
    - The 'inStr' parameter accepts a string input that represents a numerical value. This input is crucial for the conversion process, enabling the transformation of text-based numbers into floating-point numbers.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a floating-point number derived from the input string, providing a numerical representation of the text-based input.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class String2Float:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"inStr": ("STRING", {"default": ""})}, }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/api/parseInput"

    def convert(self, inStr):
        return (float(inStr),)

```
