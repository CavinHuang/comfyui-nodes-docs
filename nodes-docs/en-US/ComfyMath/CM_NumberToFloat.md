---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# NumberToFloat
## Documentation
- Class name: `CM_NumberToFloat`
- Category: `math/conversion`
- Output node: `False`

The CM_NumberToFloat node is designed for converting numerical values from a generic number type, which can be an integer or a float, into a floating-point representation. This conversion facilitates operations that require floating-point precision and is essential in mathematical computations where such precision is necessary.
## Input types
### Required
- **`a`**
    - The input 'a' represents the numerical value to be converted into a floating-point number. This parameter is crucial for the conversion process, affecting the node's execution by determining the output's precision and value.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a floating-point representation of the input numerical value, providing the necessary precision for further mathematical operations.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [CR Integer Multiple](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Integer Multiple.md)



## Source code
```python
class NumberToFloat:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("NUMBER", {"default": 0.0})}}

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: number) -> tuple[float]:
        return (float(a),)

```
