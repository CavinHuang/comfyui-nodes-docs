---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# String to Number
## Documentation
- Class name: `StringToNumber`
- Category: `Art Venture/Utils`
- Output node: `False`

The `StringToNumber` node converts a string representation of a number into its numerical form, offering options for rounding the result to the nearest integer, flooring it, or ceiling it. This functionality is essential for scenarios where numerical values are received as text and precise mathematical operations or comparisons are required.
## Input types
### Required
- **`string`**
    - The `string` parameter takes a string input that represents a number, which is then converted into a numerical form. This conversion is crucial for further numerical operations or analyses.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`rounding`**
    - The `rounding` parameter specifies the method of rounding (nearest, floor, or ceil) to be applied to the converted number, affecting the final numerical output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer part of the converted number, after applying the specified rounding method.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the converted number, providing a precise numerical value.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilStringToNumber:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "string": ("STRING", {"default": "0"}),
                "rounding": (["round", "floor", "ceil"], {"default": "round"}),
            },
        }

    RETURN_TYPES = ("INT", "FLOAT")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "string_to_numbers"

    def string_to_numbers(self, string: str, rounding):
        f = float(string)

        if rounding == "floor":
            return (int(np.floor(f)), f)
        elif rounding == "ceil":
            return (int(np.ceil(f)), f)
        else:
            return (int(round(f)), f)

```
