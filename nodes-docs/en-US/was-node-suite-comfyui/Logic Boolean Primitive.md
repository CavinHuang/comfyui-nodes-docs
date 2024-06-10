---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic Boolean Primitive
## Documentation
- Class name: `Logic Boolean Primitive`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Logic Boolean Primitive node is designed to process a single boolean input and return it unchanged. This node serves as a fundamental building block in logical operations, allowing for the straightforward handling and passing of boolean values within a logic-based workflow.
## Input types
### Required
- **`boolean`**
    - The boolean input to be processed. This parameter is crucial as it directly determines the output of the node, effectively making the node act as a pass-through for the boolean value.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The unchanged boolean input. This output is significant as it allows the boolean value to be used directly in subsequent logical operations or conditions.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Boolean_Primitive:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    FUNCTION = "do"

    CATEGORY = "WAS Suite/Logic"

    def do(self, boolean):
        return (boolean,)

```
