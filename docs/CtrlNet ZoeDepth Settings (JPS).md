
# Documentation
- Class name: CtrlNet ZoeDepth Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

这个节点旨在为控制网络配置深度设置，特别关注ZoeDepth方面。它允许用户选择深度源、调整深度强度，以及定义深度应用的起始和结束点，为图像提供可自定义的深度效果。

# Input types
## Required
- zoe_from
    - 指定深度信息的来源，允许从预定义的选项中选择，如源图像、支持图像或直接支持。这个选择决定了用于处理的深度数据的来源。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- zoe_strength
    - 控制深度效果的强度，范围允许从微妙到明显的深度增强。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoe_start
    - 定义深度应用的起始点，能够微调深度效果在图像中开始的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoe_end
    - 设置深度应用的终点，允许用户指定深度效果在图像中结束的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- zoedepth_settings
    - 输出配置好的ZoeDepth设置作为元组，可用于后续处理阶段。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_ZoeDepth_Settings:
    zoefrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "zoe_from": (s.zoefrom,),
                "zoe_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "zoe_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "zoe_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("zoedepth_settings",)
    FUNCTION = "get_ctrlnet_zoedepth"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_zoedepth(self, zoe_from, zoe_strength, zoe_start, zoe_end):

        zoe_source = int (1)
        if (zoe_from == "Support Image"):
            zoe_source = int(2)
        if (zoe_from == "Support Direct"):
            zoe_source = int(3)
        
        zoedepth_settings = zoe_source, zoe_strength, zoe_start, zoe_end

        return(zoedepth_settings,)

```
