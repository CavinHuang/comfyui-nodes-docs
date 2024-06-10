# Cfg Literal
## Documentation
- Class name: `Cfg Literal`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Cfg Literal node is designed to provide a configurable floating-point value within a specified range. It serves as a utility within the ImageSaverTools/utils category, allowing for the dynamic adjustment of parameters that require precise numerical inputs.
## Input types
### Required
- **`float`**
    - Specifies the floating-point value to be returned by the node. This parameter allows for the dynamic configuration of values within a defined range, influencing the node's output based on the specified numerical input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point value specified by the input parameter. This output is used to dynamically configure other nodes or parameters within the system.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class CfgLiteral:
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_float"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"float": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0})}}

    def get_float(self, float):
        return (float,)

```
