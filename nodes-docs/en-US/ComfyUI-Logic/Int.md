---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# Int
## Documentation
- Class name: `Int`
- Category: `Logic`
- Output node: `False`

The Int node is designed to process integer values, allowing for the manipulation or evaluation of these values within a logical or computational context.
## Input types
### Required
- **`value`**
    - Defines the integer value to be processed or manipulated by the node. It serves as the primary input for operations or evaluations performed by the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - Outputs the processed or evaluated integer value, reflecting any operations or manipulations performed by the node.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Int:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("INT", {"default": 0})},
        }

    RETURN_TYPES = ("INT",)

    RETURN_NAMES = ("INT",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
