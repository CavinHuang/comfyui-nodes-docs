---
tags:
- Text
---

# ✍ Text Input
## Documentation
- Class name: `Text Input [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

Provides a user interface component for text input, allowing multiline text entry with a default value. It's designed for collecting textual data from users within a graphical interface.
## Input types
### Required
- **`value`**
    - Represents the text value entered by the user. It supports multiline input and starts with an empty string by default, facilitating the collection of user-generated text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - Outputs the text entered by the user, directly reflecting the input without modification.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputText:
    NODE_NAME = "Text Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING", {"default": "", "multiline": True}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
