---
tags:
- String
- Text
---

# Single String (klinter)
## Documentation
- Class name: `SingleString`
- Category: `String`
- Output node: `False`

The SingleString node is designed to pass through a single string input without modification, serving as a straightforward conduit for string data within a pipeline.
## Input types
### Required
- **`string`**
    - Represents the string input to be passed through. It is essential for the node's operation as it directly influences the output by being returned unchanged.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is the unaltered input string, demonstrating the node's function as a simple pass-through mechanism.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SingleString:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": '', "multiline": True}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "passtring"

    CATEGORY = "String"

    def passtring(self, string):
        return (string, )

```
