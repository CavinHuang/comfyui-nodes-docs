# Reroute Primitive 🐍
## Documentation
- Class name: ReroutePrimitive|pysssss
- Category: utils
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

ReroutePrimitive节点旨在传递任何给定输入而不进行修改，充当数据流架构中的通用连接器。它抽象掉了数据类型的复杂性，允许灵活地重新路由数据流。

## Input types
### Required
- value
    - 'value'参数作为节点将未修改传递的通用输入。它是节点功能的核心，使其能够在各种数据处理场景中充当多功能连接器。
    - Comfy dtype: *
    - Python dtype: AnyType

## Output types
- *
    - Comfy dtype: *
    - 输出是包含未修改输入值的元组，促进无缝的数据重新路由。
    - Python dtype: Tuple[AnyType]

## Usage tips
- Infra type: CPU
<!-- - Common nodes:
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [ColorCorrect](../../comfyui-art-venture/Nodes/ColorCorrect.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [ReroutePrimitive|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ReroutePrimitive|pysssss.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md) -->

## Source code
```python
class ReroutePrimitive:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"value": (any, )},
        }

    @classmethod
    def VALIDATE_INPUTS(s, **kwargs):
        return True

    RETURN_TYPES = (any,)
    FUNCTION = "route"
    CATEGORY = "utils"

    def route(self, value):
        return (value,)