---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Int to String (Mikey)
## Documentation
- Class name: `Int to String`
- Category: `Mikey/Utils`
- Output node: `False`

The IntToString node is designed to convert integer values into their string representation, optionally formatting the output with commas for readability. This node serves as a utility for transforming numerical data into a text format suitable for display or further text-based processing.
## Input types
### Required
- **`int_`**
    - The integer value to be converted into a string. This parameter is the primary input for the conversion process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`use_commas`**
    - A flag indicating whether to format the output string with commas for thousands, millions, etc., enhancing readability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string representation of the input integer, formatted according to the 'use_commas' parameter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class INTtoSTRING:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"int_": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "use_commas": (['true','false'], {"default": 'false'})}}

    RETURN_TYPES = ('STRING',)
    FUNCTION = 'convert'
    CATEGORY = 'Mikey/Utils'

    def convert(self, int_, use_commas):
        if use_commas == 'true':
            return (f'{int_:,}', )
        else:
            return (f'{int_}', )

```
