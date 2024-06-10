---
tags:
- Concatenate
---

# JoinStrings
## Documentation
- Class name: `JoinStrings`
- Category: `KJNodes/constants`
- Output node: `False`

The JoinStrings node is designed to concatenate two input strings using a specified delimiter, allowing for flexible string manipulation and construction within a workflow.
## Input types
### Required
- **`string1`**
    - The first string to be joined. It serves as the starting point of the concatenation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`string2`**
    - The second string to be joined. It follows the first string, separated by the specified delimiter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`delimiter`**
    - The string used to separate the two input strings. It defines the character(s) inserted between the concatenated strings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of concatenating string1 and string2 with the delimiter in between. It represents the combined output of the operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class JoinStrings:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string1": ("STRING", {"default": '', "forceInput": True}),
                "string2": ("STRING", {"default": '', "forceInput": True}),
                "delimiter": ("STRING", {"default": ' ', "multiline": False}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "joinstring"
    CATEGORY = "KJNodes/constants"

    def joinstring(self, string1, string2, delimiter):
        joined_string = string1 + delimiter + string2
        return (joined_string, )

```
