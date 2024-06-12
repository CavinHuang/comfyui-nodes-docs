---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Float to String (Mikey)
## Documentation
- Class name: `Float to String`
- Category: `Mikey/Utils`
- Output node: `False`

The FLOATtoSTRING node is designed to convert floating-point numbers into their string representation, optionally formatting the output with commas for readability. This node serves as a utility for transforming numerical data into a text format that can be easily displayed or processed further.
## Input types
### Required
- **`float_`**
    - The floating-point number to be converted into a string. This parameter is central to the node's operation, determining the numerical value that will be transformed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`use_commas`**
    - A flag indicating whether to format the resulting string with commas for thousands, millions, etc., enhancing readability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the input floating-point number, formatted according to the 'use_commas' parameter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FLOATtoSTRING:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"float_": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000000.0}),
                             "use_commas": (['true','false'], {"default": 'false'})}}

    RETURN_TYPES = ('STRING',)
    FUNCTION = 'convert'
    CATEGORY = 'Mikey/Utils'

    def convert(self, float_, use_commas):
        if use_commas == 'true':
            return (f'{float_:,}', )
        else:
            return (f'{float_}', )

```
