---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# FloatToNumber
## Documentation
- Class name: `CM_FloatToNumber`
- Category: `math/conversion`
- Output node: `False`

This node is designed for converting floating-point values to a more general number type, facilitating operations across different numeric types by standardizing them to a common format.
## Input types
### Required
- **`a`**
    - The floating-point value to be converted into a general number type. This conversion enables seamless integration and manipulation within a broader range of mathematical operations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The result of converting the input floating-point value to a general number type, allowing for its use in a wide array of numerical computations and operations.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatToNumber:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("FLOAT", {"default": 0.0})}}

    RETURN_TYPES = ("NUMBER",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: float) -> tuple[number]:
        return (a,)

```
