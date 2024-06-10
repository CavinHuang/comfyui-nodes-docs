---
tags:
- String
- Text
---

# Text to String
## Documentation
- Class name: `Text to String`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

The `WAS_Text_To_String` node is designed to process and transform input text through token parsing, enabling the manipulation and formatting of text data. It supports multiple text inputs, allowing for the flexible handling and transformation of text strings.
## Input types
### Required
- **`text`**
    - The primary text input to be processed and transformed. It serves as the main source of textual data for the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The processed and transformed version of the primary text input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_To_String:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "text_to_string"

    CATEGORY = "WAS Suite/Text/Operations"

    def text_to_string(self, text):
        return (text, )

```
