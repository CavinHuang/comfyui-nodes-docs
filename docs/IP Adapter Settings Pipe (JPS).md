
# Documentation
- Class name: IP Adapter Settings Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

IP Adapter Settings Pipe节点用于处理和调整图像处理设置，便于根据提供的设置来自定义和应用各种图像处理技术。它抽象了配置和应用这些设置的复杂性，使得实现所需的图像操作效果变得更加简单。

# Input types
## Required
- ip_adapter_settings
    - 指定图像处理适配的设置，包括权重、类型、噪声水平、起始和停止点、裁剪偏好、缩放级别、偏移量、遮罩类型、插值方法、锐化级别和模型类型。这套全面的参数允许对图像处理流程进行详细的自定义。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, str, float, float, float, str, float, int, int, int, str, float, int]

# Output types
- ipa_weight
    - 应用于图像处理设置的权重因子，影响应用效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_wtype
    - 图像处理设置中使用的权重应用方法类型，如线性或缓入缓出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_noise
    - 作为处理设置的一部分，将应用于图像的噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_start
    - 开始应用图像处理效果的起点，通常与效果的强度或持续时间有关。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_stop
    - 图像处理效果的停止点，标志着效果应用的结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_crop
    - 应用于图像的裁剪方法，可以是方向性的（如中心、顶部、底部）或基于特定尺寸的。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_zoom
    - 应用于图像的缩放级别，影响处理后图像的焦点和比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_offset_x
    - 应用于图像的水平偏移，调整其在x轴上的位置。
    - Comfy dtype: INT
    - Python dtype: int
- ipa_offset_y
    - 应用于图像的垂直偏移，调整其在y轴上的位置。
    - Comfy dtype: INT
    - Python dtype: int
- ipa_mask
    - 应用于图像的遮罩类型，可以影响受处理设置影响的图像区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_intpol
    - 用于裁剪图像的插值方法，影响裁剪区域的平滑度和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化级别，增强其清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_model
    - 用于处理图像的模型类型，可以影响输出的整体风格和质量。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_adapter_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("FLOAT",["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],"FLOAT","FLOAT","FLOAT",["center","top", "bottom", "left", "right"],"FLOAT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT","INT")
    RETURN_NAMES = ("ipa_weight","ipa_wtype","ipa_noise","ipa_start","ipa_stop","ipa_crop","ipa_zoom","ipa_offset_x","ipa_offset_y","ipa_mask","crop_intpol","sharpening","ipa_model")
    FUNCTION = "get_ipamode_single"

    CATEGORY="JPS Nodes/Pipes"

    def get_ipamode_single(self,ip_adapter_settings):

        ipaweight,ipawtype,ipanoise,ipastart,ipastop,ipacrop,ipazoom,ipaoffsetx,ipaoffsety,ipamask,cropintpol,sharpening,ipamodel = ip_adapter_settings

        return(float(ipaweight),ipawtype,float(ipanoise),float(ipastart),float(ipastop),ipacrop,float(ipazoom),int(ipaoffsetx),int(ipaoffsety),int(ipamask),cropintpol,float(sharpening),int(ipamodel),)

```
