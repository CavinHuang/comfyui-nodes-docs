---
tags:
- BooleanLogic
- ConditionalSelection
---

# Int To Bool (mtb)
## Documentation
- Class name: `Int To Bool (mtb)`
- Category: `mtb/number`
- Output node: `False`

This node performs a basic conversion of an integer to a boolean value, abstracting the process of interpreting numerical inputs as binary truth values.
## Input types
### Required
- **`int`**
    - The integer input that will be converted to a boolean. A non-zero value is considered true, while zero is considered false.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The boolean result of the conversion, where non-zero integers are true and zero is false.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)



## Source code
```python
class MTB_IntToBool:
    """Basic int to bool conversion"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int": (
                    "INT",
                    {
                        "default": 0,
                    },
                ),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    FUNCTION = "int_to_bool"
    CATEGORY = "mtb/number"

    def int_to_bool(self, int):
        return (bool(int),)

```
