---
tags:
- Constant
---

# Float Constant
## Documentation
- Class name: `FloatConstant`
- Category: `KJNodes/constants`
- Output node: `False`

The FloatConstant node provides a mechanism to define a constant floating-point value within a node-based processing environment. It allows for the specification of a float value with a wide range of possible values, enabling precise control over constants used in computations or data flows.
## Input types
### Required
- **`value`**
    - Specifies the floating-point value to be used as a constant. This parameter allows for a wide range of values, enabling the node to serve various computational needs with precision.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`value`**
    - Comfy dtype: `FLOAT`
    - Outputs the same floating-point value as defined by the input, serving as a constant throughout the node's usage.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatConstant:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value": ("FLOAT", {"default": 0.0, "min": -0xffffffffffffffff, "max": 0xffffffffffffffff, "step": 0.001}),
        },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("value",)
    FUNCTION = "get_value"
    CATEGORY = "KJNodes/constants"

    def get_value(self, value):
        return (value,)

```
