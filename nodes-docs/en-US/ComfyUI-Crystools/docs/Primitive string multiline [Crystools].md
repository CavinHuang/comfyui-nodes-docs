---
tags:
- List
- MultilineText
- Text
---

# 🪛 Primitive string multiline
## Documentation
- Class name: `Primitive string multiline [Crystools]`
- Category: `crystools 🪛/Primitive`
- Output node: `False`

This node is designed to handle multiline string inputs, providing a straightforward way to work with longer text segments within the Crystools framework. It abstracts the complexity of managing multiline strings, making it easier for users to input and process textual data that spans multiple lines.
## Input types
### Required
- **`string`**
    - The multiline string input for the node. It allows users to input text that spans across multiple lines, facilitating the handling and processing of longer textual data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output of this node is the multiline string that was input, allowing for further processing or utilization within a workflow.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CTextML:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": STRING_ML,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, string=""):
        return (string,)

```
