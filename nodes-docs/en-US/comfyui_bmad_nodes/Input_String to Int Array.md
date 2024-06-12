---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Input/String to Int Array
## Documentation
- Class name: `Input_String to Int Array`
- Category: `Bmad/api/parseInput`
- Output node: `False`

This node is designed to convert a string representation of integers, separated by commas, into an array of integers. It is versatile for handling different types of input sources.
## Input types
### Required
- **`inStr`**
    - The input string containing integers separated by commas, or an array of integers. This parameter allows for flexible input handling.
    - Comfy dtype: `STRING`
    - Python dtype: `Union[str, List[int]]`
## Output types
- **`int_array`**
    - Comfy dtype: `INT_ARRAY`
    - The output is an array of integers, derived from parsing the input string or directly using the input array.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InputString2IntArray:
    """
    Under the supposition this will be used with RequestInputs, the integers may already come as an array.
    The input is, therefore, polymorphic and both array and string types are accepted as inputs to both allow a valid
    request json and a mock array given via the web UI.

    When using a string: the integers should be separated with commas
    """

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"inStr": ("STRING", {"default": ""})}, }

    RETURN_TYPES = ("INT_ARRAY",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/api/parseInput"

    def convert(self, inStr):
        # not really a str, suppose is a list read from the input json
        if isinstance(inStr, list):
            return (inStr, )

        # otherwise suppose it is a valid string
        return ([int(x) for x in inStr.split(',')],)

```
