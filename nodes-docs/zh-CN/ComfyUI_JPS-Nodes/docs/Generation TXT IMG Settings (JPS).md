
# Documentation
- Class name: Generation TXT IMG Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

这个节点旨在根据选择的模式和图像百分比配置和确定生成模式和图像强度。它支持在文本到图像和图像到图像模式之间切换，根据模式的特定要求调整输出。

# Input types
## Required
- mode
    - 指定生成模式，可以是'Txt2Img'或'Img2Img'，影响生成过程和输出特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- img_percentage
    - 确定图像处理的强度或强度，影响'Img2Img'模式下的最终图像输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- gen_mode
    - 以整数值表示生成模式，区分文本到图像和图像到图像模式。
    - Comfy dtype: INT
    - Python dtype: int
- img_strength
    - 表示根据提供的图像百分比计算出的图像处理强度或强度。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Generation_TXT_IMG_Settings:
    mode = ["Txt2Img","Img2Img"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mode": (s.mode,),
                "img_percentage": ("INT", {"default": 50, "min": 0, "max": 100, "step": 5}),
            }
        }
    RETURN_TYPES = ("INT","FLOAT",)
    RETURN_NAMES = ("gen_mode", "img_strength")
    FUNCTION = "get_genmode"

    CATEGORY="JPS Nodes/Settings"

    def get_genmode(self,mode,img_percentage):
        gen_mode = 1
        img_strength = 0
        if(mode == "Txt2Img"):
            gen_mode = int(1)
            img_strength = 0.001
        if(mode == "Img2Img"):
            gen_mode = int(2)
            img_strength = img_percentage / 100
            
        return(int(gen_mode),float(img_strength))

```
