---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# String to Int
## Documentation
- Class name: `StringToInt`
- Category: `Art Venture/Utils`
- Output node: `False`

Converts a string representation of a number into its integer form, providing a straightforward way to parse and utilize numerical data represented as text.
## Input types
### Required
- **`string`**
    - The string input represents the numerical data in text form that needs to be converted into an integer. This parameter is crucial for the conversion process, determining the numerical value that will be returned.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the input string, allowing for numerical operations and processing within the system.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilStringToInt:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"string": ("STRING", {"default": "0"})},
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "string_to_int"

    def string_to_int(self, string: str):
        return (int(string),)

```
