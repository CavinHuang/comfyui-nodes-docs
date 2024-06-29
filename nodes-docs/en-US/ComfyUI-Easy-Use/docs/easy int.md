---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# Int
## Documentation
- Class name: `easy int`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

The `easy int` node is designed to simplify the process of handling integer values within the ComfyUI framework. It abstracts the complexities involved in integer operations, providing a straightforward interface for users to work with integer data.
## Input types
### Required
- **`value`**
    - Represents an integer value that the node processes. This parameter is crucial for the node's operation as it directly influences the outcome of the integer manipulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is an integer value, resulting from the node's processing of the input integer.
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
    RETURN_NAMES = ("int",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic/Type"

    def execute(self, value):
        return (value,)

```
