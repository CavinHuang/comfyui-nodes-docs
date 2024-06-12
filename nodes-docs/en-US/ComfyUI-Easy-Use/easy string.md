---
tags:
- String
- Text
---

# String
## Documentation
- Class name: `easy string`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

The 'easy string' node is designed to simplify the process of generating and manipulating strings within a computational context. It abstracts complex string operations, offering a user-friendly interface for tasks such as formatting, concatenation, and potentially parsing. This node aims to reduce the technical overhead associated with string manipulation, making it accessible to users with varying levels of programming expertise.
## Input types
### Required
- **`value`**
    - The 'value' input is crucial for the node's operation as it represents the primary text or data that the node processes or manipulates. Its role is central to the functionality of the node, determining the nature of the string manipulation tasks performed, such as formatting or concatenation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The 'string' output is the result of the node's processing or manipulation of the input text. It holds significant importance as it represents the final, processed form of the input data, ready for further use or display in the intended context.
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
    RETURN_NAMES = ("string",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic/Type"

    def execute(self, value):
        return (value,)

```
