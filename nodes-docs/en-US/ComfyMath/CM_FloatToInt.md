---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# FloatToInt
## Documentation
- Class name: `CM_FloatToInt`
- Category: `math/conversion`
- Output node: `False`

The CM_FloatToInt node is designed for mathematical conversion operations, specifically converting floating-point numbers to integers. It abstracts the process of type conversion in mathematical computations, facilitating the transition between different numerical types.
## Input types
### Required
- **`a`**
    - The floating-point number to be converted into an integer. This parameter is crucial as it directly influences the outcome of the conversion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer result obtained from converting the input floating-point number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatToInt:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("FLOAT", {"default": 0.0})}}

    RETURN_TYPES = ("INT",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: float) -> tuple[int]:
        return (int(a),)

```
