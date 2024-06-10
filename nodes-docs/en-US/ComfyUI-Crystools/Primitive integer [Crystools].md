---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🪛 Primitive integer
## Documentation
- Class name: `Primitive integer [Crystools]`
- Category: `crystools 🪛/Primitive`
- Output node: `False`

This node is designed to handle integer values, providing a straightforward way to work with integers within the Crystools framework. It encapsulates the functionality required to input, process, and return integer values, simplifying the handling of numeric data.
## Input types
### Required
- **`int`**
    - Represents the integer value to be processed by the node. It is essential for executing the node's functionality, as it directly influences the output integer value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output of this node is the integer value that was input, allowing for seamless integration and further processing within the Crystools framework.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CInteger:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int": INT,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("int",)

    FUNCTION = "execute"

    def execute(self, int=True):
        return (int,)

```
