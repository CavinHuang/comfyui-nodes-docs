---
tags:
- Text
- TextReplacement
---

# String Replace (mtb)
## Documentation
- Class name: `String Replace (mtb)`
- Category: `mtb/string`
- Output node: `False`

Provides a basic string replacement functionality, allowing for the substitution of a specified substring with another within a given string. This node is designed to facilitate text manipulation by enabling users to easily replace parts of strings.
## Input types
### Required
- **`string`**
    - The original string where replacements will be made. It serves as the base text for the operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`old`**
    - The substring to be replaced. This parameter specifies the part of the original string that should be substituted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`new`**
    - The replacement substring. This parameter defines the new text that will replace the specified 'old' substring in the original string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The modified string after the specified replacements have been made.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_StringReplace:
    """Basic string replacement."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"forceInput": True}),
                "old": ("STRING", {"default": ""}),
                "new": ("STRING", {"default": ""}),
            }
        }

    FUNCTION = "replace_str"
    RETURN_TYPES = ("STRING",)
    CATEGORY = "mtb/string"

    def replace_str(self, string: str, old: str, new: str):
        log.debug(f"Current string: {string}")
        log.debug(f"Find string: {old}")
        log.debug(f"Replace string: {new}")

        string = string.replace(old, new)

        log.debug(f"New string: {string}")

        return (string,)

```
