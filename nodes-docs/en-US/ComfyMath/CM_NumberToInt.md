---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# NumberToInt
## Documentation
- Class name: `CM_NumberToInt`
- Category: `math/conversion`
- Output node: `False`

The CM_NumberToInt node is designed for converting numerical values from a generic number type to an integer type. This node facilitates the type casting process within mathematical or computational operations, ensuring compatibility and precision in scenarios where integer-specific operations are required.
## Input types
### Required
- **`a`**
    - The input 'a' represents the numerical value to be converted to an integer. This parameter is crucial for the conversion process, determining the resultant integer value.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float]`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the integer representation of the input numerical value, achieved through type conversion.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)



## Source code
```python
class NumberToInt:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("NUMBER", {"default": 0.0})}}

    RETURN_TYPES = ("INT",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: number) -> tuple[int]:
        return (int(a),)

```
