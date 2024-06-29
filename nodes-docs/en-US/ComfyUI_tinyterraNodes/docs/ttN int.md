---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# int
## Documentation
- Class name: `ttN int`
- Category: `ttN/util`
- Output node: `False`

The node is designed to handle integer values, providing functionality to convert an integer input into multiple formats, including its original integer form, a floating-point representation, and a string representation. This conversion process facilitates the use of integer values across different contexts where specific data types are required.
## Input types
### Required
- **`int`**
    - Accepts an integer value as input, which is then converted into multiple formats. This parameter is central to the node's operation, enabling the conversion of numeric data to suit various application needs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Returns the original integer input, preserving its value in the integer format.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - Provides a floating-point representation of the input integer, allowing for applications that require floating-point numbers.
    - Python dtype: `float`
- **`text`**
    - Comfy dtype: `STRING`
    - Converts the input integer into a string representation, facilitating its use in contexts that require textual data.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)



## Source code
```python
class ttN_INT:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "int": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                },
                "hidden": {"ttNnodeVersion": ttN_INT.version},
        }

    RETURN_TYPES = ("INT", "FLOAT", "STRING",)
    RETURN_NAMES = ("int", "float", "text",)
    FUNCTION = "convert"

    CATEGORY = "ttN/util"

    @staticmethod
    def convert(int):
        return int, float(int), str(int)

```
