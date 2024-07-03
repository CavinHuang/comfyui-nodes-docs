
# Documentation
- Class name: Cfg Literal
- Category: ImageSaverTools/utils
- Output node: False

Cfg Literal节点旨在提供一个可配置的浮点值,该值位于指定范围内。它作为ImageSaverTools/utils类别中的一个实用工具,允许动态调整需要精确数值输入的参数。

# Input types
## Required
- float
    - 指定由节点返回的浮点值。该参数允许在定义的范围内动态配置值,根据指定的数值输入影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 由输入参数指定的浮点值。该输出用于动态配置系统内的其他节点或参数。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
