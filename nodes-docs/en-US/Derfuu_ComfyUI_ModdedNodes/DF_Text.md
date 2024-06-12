---
tags:
- Text
---

# Text
## Documentation
- Class name: `DF_Text`
- Category: `Derfuu_Nodes/Variables`
- Output node: `False`

The `DF_Text` node is designed to capture and process textual input, allowing for the manipulation and transformation of strings within a workflow. It emphasizes the handling of text data, providing a straightforward interface for inputting and outputting text in various forms.
## Input types
### Required
- **`Text`**
    - This parameter accepts a string input, serving as the primary data for the node's operation. It plays a crucial role in the text processing and manipulation capabilities of the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the processed text as a string, reflecting any transformations or manipulations applied within the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_value"
    CATEGORY = TREE_VARIABLE

    def get_value(self, Text: str) -> tuple[str]:
        return (Text,)

```
