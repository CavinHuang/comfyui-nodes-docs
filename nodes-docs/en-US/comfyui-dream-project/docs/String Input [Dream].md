---
tags:
- Text
---

# ✍ String Input
## Documentation
- Class name: `String Input [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The String Input node is designed to capture and return a single-line string input from the user. It serves as a basic interface component within a larger system, allowing for the collection of textual data in a straightforward and user-friendly manner.
## Input types
### Required
- **`value`**
    - Specifies the default value of the string input, which can be pre-populated or left empty. This parameter enables the initial configuration of the input field, catering to various use cases by providing a customizable starting point.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - Returns the user-provided string input, facilitating the transfer of textual data within the system.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputString:
    NODE_NAME = "String Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING", {"default": "", "multiline": False}),
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
