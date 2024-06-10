---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# IntToNumber
## Documentation
- Class name: `CM_IntToNumber`
- Category: `math/conversion`
- Output node: `False`

This node is designed for converting integer values to a more general number format, facilitating operations across different numeric types within mathematical computations.
## Input types
### Required
- **`a`**
    - The integer value to be converted into a general number format. This conversion enables seamless integration and operation with other numeric types.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The converted general number format value, allowing for versatile mathematical operations.
    - Python dtype: `number`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CM_NumberBinaryOperation](../../ComfyMath/Nodes/CM_NumberBinaryOperation.md)



## Source code
```python
class IntToNumber:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("INT", {"default": 0})}}

    RETURN_TYPES = ("NUMBER",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: int) -> tuple[number]:
        return (a,)

```
