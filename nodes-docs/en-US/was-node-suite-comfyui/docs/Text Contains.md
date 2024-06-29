---
tags:
- Text
---

# Text Contains
## Documentation
- Class name: `Text Contains`
- Category: `WAS Suite/Logic`
- Output node: `False`

The `WAS_Text_Contains` node checks if a given substring is present within a specified text string, offering an option to ignore case sensitivity.
## Input types
### Required
- **`text`**
    - The primary text string in which the search for the substring will be conducted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`sub_text`**
    - The substring to search for within the primary text string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`case_insensitive`**
    - A boolean flag indicating whether the search should ignore case sensitivity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - A boolean indicating whether the substring was found within the primary text string.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Contains:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": '', "multiline": False}),
                "sub_text": ("STRING", {"default": '', "multiline": False}),
            },
            "optional": {
                "case_insensitive": ("BOOLEAN", {"default": True}),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    FUNCTION = "text_contains"

    CATEGORY = "WAS Suite/Logic"

    def text_contains(self, text, sub_text, case_insensitive):
        if case_insensitive:
            sub_text = sub_text.lower()
            text = text.lower()

        return (sub_text in text,)

```
