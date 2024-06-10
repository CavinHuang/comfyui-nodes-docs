---
tags:
- BooleanLogic
- ConditionalSelection
---

# BoolToInt
## Documentation
- Class name: `CM_BoolToInt`
- Category: `math/conversion`
- Output node: `False`

This node performs a type conversion from a boolean value to an integer. It abstracts the process of interpreting boolean logic in a numerical context, enabling the translation of true/false values into binary (0 or 1) form.
## Input types
### Required
- **`a`**
    - The boolean input to be converted to an integer. This parameter is crucial as it directly influences the output by determining whether the result will be 0 (False) or 1 (True).
    - Comfy dtype: `BOOL`
    - Python dtype: `bool`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the input boolean value, where True becomes 1 and False becomes 0.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BoolToInt:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("BOOL", {"default": False})}}

    RETURN_TYPES = ("INT",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: bool) -> tuple[int]:
        return (int(a),)

```
