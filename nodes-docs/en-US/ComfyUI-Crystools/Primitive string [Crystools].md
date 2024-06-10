---
tags:
- String
- Text
---

# 🪛 Primitive string
## Documentation
- Class name: `Primitive string [Crystools]`
- Category: `crystools 🪛/Primitive`
- Output node: `False`

This node is designed to handle and process primitive string data. It provides a straightforward interface for receiving a string input, performing any necessary operations, and then outputting the modified or unmodified string.
## Input types
### Required
- **`string`**
    - The string input for the node. It represents the primary data that the node will process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output of the node, which is a string that has potentially been processed or modified by the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CText:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": STRING,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, string=""):
        return (string,)

```
