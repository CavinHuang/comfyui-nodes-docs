---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# String to Integer
## Documentation
- Class name: `String to Integer`
- Category: `Bmad/api/parseInput`
- Output node: `False`

The String to Integer node is designed to convert string representations of integers into their integer form. It is particularly useful in scenarios where integer values are received as strings, such as from JSON inputs, and need to be processed or calculated as numerical values.
## Input types
### Required
- **`inStr`**
    - The 'inStr' parameter accepts a string representation of an integer. It plays a crucial role in the conversion process by serving as the input that is transformed into an integer value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the integer representation of the input string. This conversion facilitates numerical operations and processing on the originally string-typed data.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class String2Int:
    """
    Under the supposition that this node will receive values from the RequestInputs node,
     will still work with integer values in the json, as int() cast will work both int and str types.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"inStr": ("STRING", {"default": ""})}, }

    RETURN_TYPES = ("INT",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/api/parseInput"

    def convert(self, inStr):
        return (int(inStr),)

```
