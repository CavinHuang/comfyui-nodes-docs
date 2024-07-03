
# Documentation
- Class name: IP Adapter Tiled Settings Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

IP Adapter Tiled Settings Pipe (JPS)节点用于配置和应用平铺图像的图像处理适配器设置。它允许自定义各种图像处理参数，以根据指定的设置增强或修改平铺图像。

# Input types
## Required
- ip_adapter_settings
    - 定义了针对平铺图像的图像处理适配器设置的综合配置。通过调整模型、权重类型、噪声级别等参数，影响处理和增强的结果。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[str, str, float, float, float, float, int, float, int, int, int, int, str, float]

# Output types
- ipa_model
    - 用于图像处理的模型。
    - Comfy dtype: INT
    - Python dtype: str
- ipa_wtype
    - 图像处理过程中应用的权重类型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- ipa_weight
    - 应用于图像处理的权重。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_noise
    - 应用于图像的噪声级别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_start
    - 图像处理的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_end
    - 图像处理的终止点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_short
    - 平铺的短边长度。
    - Comfy dtype: INT
    - Python dtype: int
- tile_weight
    - 应用于平铺的权重。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoom
    - 应用于图像的缩放级别。
    - Comfy dtype: INT
    - Python dtype: int
- offset_w
    - 应用于图像的宽度偏移。
    - Comfy dtype: INT
    - Python dtype: int
- offset_h
    - 应用于图像的高度偏移。
    - Comfy dtype: INT
    - Python dtype: int
- prepare_type
    - 用于图像的准备类型。
    - Comfy dtype: INT
    - Python dtype: int
- prepare_intpol
    - 用于图像准备的插值方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prepare_sharpening
    - 应用于图像的锐化级别。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Tiled_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_adapter_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT",["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],"FLOAT","FLOAT","FLOAT","FLOAT","INT","FLOAT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT")
    RETURN_NAMES = ("ipa_model","ipa_wtype","ipa_weight","ipa_noise","ipa_start","ipa_end","tile_short","tile_weight","zoom","offset_w","offset_h","prepare_type","prepare_intpol","prepare_sharpening")
    FUNCTION = "get_ipatiled"

    CATEGORY="JPS Nodes/Pipes"

    def get_ipatiled(self,ip_adapter_settings):

        ipamodel,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,preparetype,prepare_intpol,prepare_sharpening = ip_adapter_settings

        return(ipamodel,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,preparetype,prepare_intpol,prepare_sharpening)

```
