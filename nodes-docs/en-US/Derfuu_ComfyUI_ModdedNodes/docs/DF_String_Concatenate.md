---
tags:
- Concatenate
---

# String Concatenate
## Documentation
- Class name: `DF_String_Concatenate`
- Category: `Derfuu_Nodes/Functions/String Operations`
- Output node: `False`

The DF_String_Concatenate node is designed to concatenate two strings with an optional delimiter. It enables the creation of a new string by appending one string to another, separated by a specified delimiter, thus facilitating string manipulation and formatting tasks.
## Input types
### Required
- **`Prepend`**
    - The string to be placed at the beginning of the new concatenated string. It serves as the base to which the other string is appended, playing a crucial role in the concatenation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Append`**
    - The string to be appended to the end of the 'Prepend' string. This parameter is essential for extending the base string with additional content, contributing to the formation of the concatenated result.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Delimiter`**
    - An optional string used to separate the 'Prepend' and 'Append' strings in the concatenated result. It defines the character or sequence of characters that will be inserted between the two strings, affecting the overall format and readability of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`TEXT`**
    - Comfy dtype: `STRING`
    - The resulting string after concatenation. It represents the combined output of the 'Prepend' and 'Append' strings, optionally separated by the 'Delimiter', showcasing the node's ability to merge strings effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringConcat:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Prepend": Field.string(),
                "Append": Field.string(),
                "Delimiter": Field.string(default=", ")
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("TEXT",)
    FUNCTION = "concatenate"
    CATEGORY = TREE_STRINGS

    def concatenate(self, Prepend, Append, Delimiter):
        out = f"{Prepend}{Delimiter}{Append}"
        return (out,)

```
