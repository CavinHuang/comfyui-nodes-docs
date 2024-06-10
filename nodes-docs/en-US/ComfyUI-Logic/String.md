---
tags:
- String
- Text
---

# String
## Documentation
- Class name: `String`
- Category: `Logic`
- Output node: `False`

The String node is designed to process and return string values, allowing for basic manipulation and handling of text data within a logic-based framework.
## Input types
### Required
- **`value`**
    - Represents the string value to be processed by the node. It is the primary input through which users can supply text data for manipulation or evaluation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - Outputs the processed or unchanged string value, depending on the node's implementation and the input provided.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class String:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("STRING", {"default": ""})},
        }

    RETURN_TYPES = ("STRING",)

    RETURN_NAMES = ("STRING",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
