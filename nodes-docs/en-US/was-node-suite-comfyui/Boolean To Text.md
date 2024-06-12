---
tags:
- BooleanLogic
- ConditionalSelection
---

# Boolean To Text
## Documentation
- Class name: `Boolean To Text`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node converts a boolean input into its textual representation, outputting 'True' or 'False' as a string based on the input value. It serves as a simple utility within the WAS Suite for logic operations, facilitating the interpretation or display of boolean values in a human-readable format.
## Input types
### Required
- **`boolean`**
    - The boolean input that will be converted to its textual representation. This parameter determines whether the output will be 'True' or 'False'.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The textual representation of the input boolean value, either 'True' or 'False'.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Boolean_To_Text:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "do"

    CATEGORY = "WAS Suite/Logic"

    def do(self, boolean):
        if boolean:
            return ("True",)
        return ("False",)

```
