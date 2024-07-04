
# Documentation
- Class name: IP Adapter Tiled Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/jps326/ComfyUI_JPS_Nodes

这个节点旨在配置和调整分块图像生成的图像处理设置，允许对图像处理流程进行详细的自定义。它便于调整各种参数，如模型选择、权重类型、噪声级别和插值方法，以根据特定需求定制图像生成过程。

# Input types
## Required
- ipa_model
    - 指定用于图像处理操作的模型，影响生成图像的整体质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_wtype
    - 确定图像处理的权重类型，影响权重在生成过程中的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipa_weight
    - 设置图像处理的权重，调整某些参数对最终输出的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_noise
    - 定义要添加到图像处理中的噪声级别，影响生成图像的纹理和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_start
    - 标记图像处理操作的起始点，设置初始条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_end
    - 指示图像处理操作的结束点，确定图像生成的最终条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_short
    - 指定瓦片的最短边，影响整体分块策略和输出尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- tile_weight
    - 确定图像处理过程中应用于瓦片的权重，影响不同瓦片之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoom
    - 设置图像处理的缩放级别，改变生成图像的焦点和比例。
    - Comfy dtype: INT
    - Python dtype: int
- offset_w
    - 调整图像处理的水平偏移，水平移动图像生成的焦点。
    - Comfy dtype: INT
    - Python dtype: int
- offset_h
    - 调整图像处理的垂直偏移，垂直移动图像生成的焦点。
    - Comfy dtype: INT
    - Python dtype: int
- prepare_type
    - 定义图像处理的准备类型，设置图像在处理前的准备方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prepare_intpol
    - 指定图像处理中使用的插值方法，影响生成图像的平滑度和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prepare_sharpening
    - 设置图像处理过程中应用的锐化级别，增强生成图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- ip_adapter_tiled_settings
    - 返回一套针对分块图像处理优化的综合设置，包括模型细节、权重调整、噪声级别等，以优化图像生成流程。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, str, float, float, float, float, int, float, int, int, int, int, str, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Tiled_Settings:
    
    preparetypes = ["Target AR + Target Res", "Target AR + Tile Res", "Tile AR + Target Res", "Source AR + Source Res", "Source AR + Tile Res", "Tile AR + Source Res", "Square AR + Target Res", "Square AR + Tile Res", "Direct Source" ]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipa_model": (["SDXL ViT-H", "SDXL Plus ViT-H", "SDXL Plus Face ViT-H"],),
                "ipa_wtype": (["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],),
                "ipa_weight": ("FLOAT", {"default": 0.5, "min": 0, "max": 3, "step": 0.01}),
                "ipa_noise": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "ipa_start": ("FLOAT", {"default": 0.00, "min": 0, "max": 1, "step": 0.05}),
                "ipa_end": ("FLOAT", {"default": 1.00, "min": 0, "max": 1, "step": 0.05}),
                "tile_short": ("INT", { "default": 2, "min": 1, "max": 5, "step": 1, "display": "number" }),
                "tile_weight": ("FLOAT", {"default": 0.55, "min": 0, "max": 1, "step": 0.05}),
                "zoom": ("INT", {"default": 100, "min": 1, "max": 500, "step": 1}),
                "offset_w": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "offset_h": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "prepare_type": (s.preparetypes,),
                "prepare_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "prepare_sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("ip_adapter_tiled_settings",)
    FUNCTION = "get_ipatiled"

    CATEGORY="JPS Nodes/Settings"

    def get_ipatiled(self,ipa_model,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,prepare_type,prepare_intpol,prepare_sharpening,):

        ipamodel = int (0)
        if(ipa_model == "SDXL ViT-H"):
            ipamodel = int(1)
        elif(ipa_model == "SDXL Plus ViT-H"):
            ipamodel = int(2)
        elif(ipa_model == "SDXL Plus Face ViT-H"):
            ipamodel = int(3)

        preparetype = int (0)
        if(prepare_type == "Target AR + Target Res"):
            preparetype = int(1)
        elif(prepare_type == "Target AR + Tile Res"):
            preparetype = int(2)
        elif(prepare_type == "Tile AR + Target Res"):
            preparetype = int(3)
        elif(prepare_type == "Source AR + Source Res"):
            preparetype = int(4)
        elif(prepare_type == "Source AR + Tile Res"):
            preparetype = int(5)
        elif(prepare_type == "Tile AR + Source Res"):
            preparetype = int(6)
        elif(prepare_type == "Square AR + Target Res"):
            preparetype = int(7)
        elif(prepare_type == "Square AR + Tile Res"):
            preparetype = int(8)
        elif(prepare_type == "Direct Source"):
            preparetype = int(9)
        
        ip_adapter_settings = ipamodel,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,preparetype,prepare_intpol,prepare_sharpening

        return(ip_adapter_settings,)

```
