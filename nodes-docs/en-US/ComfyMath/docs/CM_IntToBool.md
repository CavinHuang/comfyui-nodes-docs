---
tags:
- BooleanLogic
- ConditionalSelection
---

# IntToBool
## Documentation
- Class name: `CM_IntToBool`
- Category: `math/conversion`
- Output node: `False`

The node transforms an integer input into a boolean output, effectively converting numerical values into binary conditions based on their equivalence to zero.
## Input types
### Required
- **`a`**
    - The integer input to be converted into a boolean. If the input is non-zero, the output is True; otherwise, it is False.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The boolean result of the conversion, indicating whether the input integer was non-zero.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntToBool:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("INT", {"default": 0})}}

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: int) -> tuple[bool]:
        return (a != 0,)

```
