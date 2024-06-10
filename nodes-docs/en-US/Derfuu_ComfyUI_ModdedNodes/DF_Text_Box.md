---
tags:
- Text
---

# Text Box
## Documentation
- Class name: `DF_Text_Box`
- Category: `Derfuu_Nodes/Variables`
- Output node: `False`

The DF_Text_Box node is designed to capture and process multiline text input, allowing for the handling of extended text data within a node-based programming environment.
## Input types
### Required
- **`Text`**
    - This parameter accepts multiline text input, enabling the node to process and manipulate text data that spans multiple lines.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the processed text as a string, maintaining its multiline format.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MultilineStringNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(multiline=True),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_value"
    CATEGORY = TREE_VARIABLE

    def get_value(self, Text: str) -> tuple[str]:
        return (Text,)

```
