---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🪛 Primitive float
## Documentation
- Class name: `Primitive float [Crystools]`
- Category: `crystools 🪛/Primitive`
- Output node: `False`

This node provides a simple interface for working with floating-point numbers, allowing users to input and receive floats. It's designed to facilitate operations that require floating-point precision within the Crystools ecosystem.
## Input types
### Required
- **`float`**
    - Represents the floating-point number to be processed. It's essential for operations requiring decimal precision.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The processed floating-point number, returned as is from the input.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CFloat:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": FLOAT,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)

    FUNCTION = "execute"

    def execute(self, float=True):
        return (float,)

```
