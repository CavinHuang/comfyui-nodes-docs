---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# float
## Documentation
- Class name: `ttN float`
- Category: `ttN/util`
- Output node: `False`

The ttN_FLOAT node is designed for converting floating-point numbers into different formats. It takes a float as input and outputs the same value in float, integer, and string formats, facilitating versatile data manipulation and representation.
## Input types
### Required
- **`float`**
    - The floating-point number to be converted. This input is crucial as it determines the base value from which the integer and string representations will be derived.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The original floating-point number input.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the input floating-point number.
    - Python dtype: `int`
- **`text`**
    - Comfy dtype: `STRING`
    - The string representation of the input floating-point number.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_FLOAT:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "float": ("FLOAT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                },
                "hidden": {"ttNnodeVersion": ttN_FLOAT.version},
        }

    RETURN_TYPES = ("FLOAT", "INT", "STRING",)
    RETURN_NAMES = ("float", "int", "text",)
    FUNCTION = "convert"

    CATEGORY = "ttN/util"

    @staticmethod
    def convert(float):
        return float, int(float), str(float)

```
