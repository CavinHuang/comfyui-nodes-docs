---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# IntToFloat
## Documentation
- Class name: `CM_IntToFloat`
- Category: `math/conversion`
- Output node: `False`

The CM_IntToFloat node is designed for mathematical conversion operations, specifically converting an integer value to a floating-point number. This node facilitates the seamless transition between different numerical types, enhancing flexibility in mathematical computations.
## Input types
### Required
- **`a`**
    - The integer value to be converted into a floating-point number. This parameter is crucial for specifying the exact integer that needs to be transformed, thereby enabling precise numerical conversions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The resulting floating-point number after the conversion of the input integer. This output is significant for further mathematical operations that require floating-point precision.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntToFloat:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("INT", {"default": 0})}}

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: int) -> tuple[float]:
        return (float(a),)

```
