---
tags:
- DataConversion
- DataTypeConversion
- Float
- FloatData
- NumericConversion
---

# ✍ Float Input
## Documentation
- Class name: `Float Input [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The Float Input node is designed to accept a floating-point number as input, providing a simple interface for users to input decimal values. It serves as a foundational element in user interfaces where numerical input is required, particularly for configurations that involve precise measurements or adjustments.
## Input types
### Required
- **`value`**
    - Represents the floating-point number that the user inputs. It is the primary value the node operates on, serving as the basis for further processing or computation within the node's workflow.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - Outputs the same floating-point number that was input, effectively acting as a pass-through for the value.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputFloat:
    NODE_NAME = "Float Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.0}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("FLOAT",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
