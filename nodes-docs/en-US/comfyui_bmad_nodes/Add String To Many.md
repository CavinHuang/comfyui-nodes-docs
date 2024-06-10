---
tags:
- Concatenate
---

# Add String To Many
## Documentation
- Class name: `Add String To Many`
- Category: `Bmad/conditioning`
- Output node: `False`

This node is designed to either append or prepend a given string to multiple other strings, allowing for batch processing of string manipulation tasks.
## Input types
### Required
- **`to_add`**
    - The string to be added to each of the input strings. Its role is central to the operation, determining the content that will be appended or prepended.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`inputs_len`**
    - Specifies the number of input strings to which the 'to_add' string will be appended or prepended. It influences the number of operations performed by the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`operation`**
    - Determines whether the 'to_add' string should be appended or prepended to the input strings. This choice affects the final arrangement of the strings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting strings after appending or prepending the 'to_add' string to each input string.
    - Python dtype: `Tuple[str, ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddString2Many:
    """
    Append or prepend a string to other, many, strings.
    """

    OPERATION = ["append", "prepend"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "to_add": ("STRING", {"default": '', "multiline": False}),
            "inputs_len": ("INT", {"default": 3, "min": 2, "max": 32, "step": 1}),
            "operation": (s.OPERATION, {"default": 'append'}),
        }}

    RETURN_TYPES = tuple(["STRING" for x in range(32)])
    FUNCTION = "add_str"
    CATEGORY = "Bmad/conditioning"

    def add_str(self, to_add, inputs_len, operation, **kwargs):
        new_strs = []
        for r in range(inputs_len):
            str_input_name = f"i{r + 1}"
            new_str = kwargs[str_input_name]
            if operation == "append":
                new_str = new_str + to_add
            else:
                new_str = to_add + new_str
            new_strs.append(new_str)

        return tuple(new_strs)

```
