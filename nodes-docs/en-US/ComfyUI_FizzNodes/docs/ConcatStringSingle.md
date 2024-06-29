---
tags:
- Concatenate
---

# Concat String (Single) 📅🅕🅝
## Documentation
- Class name: `ConcatStringSingle`
- Category: `FizzNodes 📅🅕🅝/HelperNodes`
- Output node: `False`

The ConcatStringSingle node is designed to concatenate two strings into a single string. It focuses on combining textual inputs, providing a straightforward way to merge text data.
## Input types
### Required
- **`string_a`**
    - The first string to be concatenated. It serves as the initial part of the new combined string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`string_b`**
    - The second string to be concatenated. It is appended to the end of the first string, completing the new combined string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The concatenated result of the two input strings, returned as a single string.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class ConcatStringSingle:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string_a": ("STRING", {"forceInput":True,"default":"","multiline": True}),
                "string_b": ("STRING", {"forceInput":True,"default":"","multiline": True}),
            }
        }
    RETURN_TYPES = ("STRING", )
    FUNCTION = "concat"

    CATEGORY = "FizzNodes 📅🅕🅝/HelperNodes"

    def concat(self, string_a, string_b):
        c = string_a + string_b
        return (c,)

```
