---
tags:
- BooleanLogic
- ConditionalSelection
---

# Bool
## Documentation
- Class name: `Bool`
- Category: `Logic`
- Output node: `False`

The Bool node is designed to simply pass through a boolean value, allowing for logical operations or conditions to be applied based on its input.
## Input types
### Required
- **`value`**
    - Represents the boolean input for the node, determining the output directly. It serves as the fundamental logical unit for further operations.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`BOOLEAN`**
    - Comfy dtype: `BOOLEAN`
    - Outputs the same boolean value as received in the input, facilitating logical decision-making in workflows.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Bool:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("BOOLEAN", {"default": False})},
        }

    RETURN_TYPES = ("BOOLEAN",)

    RETURN_NAMES = ("BOOLEAN",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
