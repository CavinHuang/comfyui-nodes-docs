
# Documentation
- Class name: CtrlNet MiDaS Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

此节点旨在为控制网络中的MiDaS深度估计模型配置设置，允许用户指定深度信息的来源、强度以及应用深度效果的范围。

# Input types
## Required
- midas_from
    - 指定深度信息的来源，提供"源图像"、"支持图像"或"直接支持"等选项。这个选择决定了用于处理的深度数据的来源。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- midas_strength
    - 控制MiDaS模型应用的深度效果强度，其范围允许对深度感知进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_start
    - 定义深度效果应用的起始点，能够精确控制深度开始生效的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_end
    - 设置深度效果的终止点，允许用户将深度的影响限制在图像内的特定范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_a
    - 调整MiDaS模型内的特定参数，提供深度效果的额外自定义选项。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_bg
    - 修改背景深度值，使用户能够微调深度效果的背景强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- midas_settings
    - 输出MiDaS模型的配置设置，以元组形式呈现，可直接用于深度估计过程。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, float, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_MiDaS_Settings:
    midasfrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "midas_from": (s.midasfrom,),
                "midas_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "midas_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "midas_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "midas_a": ("FLOAT", {"default": 6.28, "min": 0.00, "max": 15.71, "step": 0.05}),
                "midas_bg": ("FLOAT", {"default": 0.10, "min": 0.00, "max": 1.00, "step": 0.05}),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("midas_settings",)
    FUNCTION = "get_ctrlnet_midas"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_midas(self, midas_from, midas_strength, midas_start, midas_end, midas_a, midas_bg):

        midas_source = int (1)
        if (midas_from == "Support Image"):
            midas_source = int(2)
        if (midas_from == "Support Direct"):
            midas_source = int(3)
        
        midas_settings = midas_source, midas_strength, midas_start, midas_end, midas_a, midas_bg

        return(midas_settings,)

```
