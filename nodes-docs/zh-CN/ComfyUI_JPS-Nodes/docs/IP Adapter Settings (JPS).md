
# Documentation
- Class name: IP Adapter Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/jps-yes/jps-ip-adapter

IP Adapter Settings (JPS)节点旨在为图像生成或处理的各个阶段配置和调整图像处理设置。它允许用户自定义权重、噪声、起始和结束点、裁剪、缩放以及模型选择等参数，从而对图像处理流程进行精细控制。

# Input types
## Required
- ipa_weight
    - 指定图像处理适配的权重，影响应用设置的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_wtype
    - 定义权重应用的类型，如线性或缓入缓出，影响图像处理效果的进程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_noise
    - 设置图像处理过程中要应用的噪声水平，按指定添加纹理或颗粒感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_start
    - 确定图像处理效果的起始点，允许精确控制适配开始的时机。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_stop
    - 定义图像处理效果的结束点，使效果持续时间可自定义。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_crop
    - 指定裁剪偏好，如居中或顶部，以调整图像的焦点区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_zoom
    - 设置图像处理的缩放级别，根据需要允许更近距离的检查或更广阔的视图。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_offset_x
    - 确定图像处理的水平偏移，实现横向调整。
    - Comfy dtype: INT
    - Python dtype: int
- ipa_offset_y
    - 指定图像处理的垂直偏移，允许纵向调整。
    - Comfy dtype: INT
    - Python dtype: int
- ipa_mask
    - 定义图像处理中使用的遮罩类型，如蒙版编辑器或图像中的红色，以针对特定区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int
- crop_intpol
    - 指定裁剪的插值方法，影响边缘的平滑度或锐利度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 设置锐化强度，增强处理后图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_model
    - 选择图像处理的模型类型，如SDXL ViT-H，影响适配的特性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int

# Output types
- ip_adapter_single_settings
    - 表示单个图像处理适配已配置设置的元组。此输出封装了应用指定图像处理调整所需的所有参数。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, str, float, float, float, str, float, int, int, int, str, float, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Settings:
    ipamasktype = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]    

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipa_weight": ("FLOAT", {"default": 0.5, "min": 0, "max": 3, "step": 0.01}),
                "ipa_wtype": (["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],),
                "ipa_noise": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "ipa_start": ("FLOAT", {"default": 0.00, "min": 0, "max": 1, "step": 0.05}),
                "ipa_stop": ("FLOAT", {"default": 1.00, "min": 0, "max": 1, "step": 0.05}),
                "ipa_crop": (["center","top", "bottom", "left", "right"],),
                "ipa_zoom": ("FLOAT", { "default": 1, "min": 1, "max": 5, "step": 0.1, "display": "number" }),
                "ipa_offset_x": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "ipa_offset_y": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),                
                "ipa_mask": (s.ipamasktype,),
                "crop_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "ipa_model": (["SDXL ViT-H", "SDXL Plus ViT-H", "SDXL Plus Face ViT-H"],),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("ip_adapter_single_settings",)
    FUNCTION = "get_ipamodesingle"

    CATEGORY="JPS Nodes/Settings"

    def get_ipamodesingle(self,ipa_weight,ipa_wtype,ipa_noise,ipa_start,ipa_stop,ipa_crop,ipa_zoom,ipa_offset_x,ipa_offset_y,ipa_mask,crop_intpol,sharpening,ipa_model):

        ipamask = int(0)
        if(ipa_mask == "Mask Editor"):
            ipamask = int(1)
        elif(ipa_mask == "Mask Editor (inverted)"):
            ipamask = int(2)
        elif(ipa_mask == "Red from Image"):
            ipamask = int(3)
        elif(ipa_mask == "Green from Image"):
            ipamask = int(4)
        elif(ipa_mask == "Blue from Image"):
            ipamask = int(5)

        ipamodel = int (0)
        if(ipa_model == "SDXL ViT-H"):
            ipamodel = int(1)
        elif(ipa_model == "SDXL Plus ViT-H"):
            ipamodel = int(2)
        elif(ipa_model == "SDXL Plus Face ViT-H"):
            ipamodel = int(3)

        ipaweight = ipa_weight
        ipawtype = ipa_wtype
        ipanoise = ipa_noise
        ipastart = ipa_start
        ipastop = ipa_stop
        ipacrop = ipa_crop
        ipazoom = ipa_zoom
        ipaoffsetx = ipa_offset_x
        ipaoffsety = ipa_offset_y
        cropintpol = crop_intpol
        
        ip_adapter_settings = ipaweight,ipawtype,ipanoise,ipastart,ipastop,ipacrop,ipazoom,ipaoffsetx,ipaoffsety,ipamask,cropintpol,sharpening,ipamodel

        return(ip_adapter_settings,)

```
