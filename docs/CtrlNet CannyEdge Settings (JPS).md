
# Documentation
- Class name: CtrlNet CannyEdge Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/jps-yes/ComfyUI_JPS

该节点用于配置管道中的Canny边缘检测过程设置，允许用户指定诸如边缘检测强度、起始和结束阈值以及高低阈值等参数。

# Input types
## Required
- cannyedge_from
    - 指定Canny边缘检测的图像来源，允许从预定义的源中选择，如"源图像"、"支持图像"或"直接支持"。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cannyedge_strength
    - 决定边缘检测过程的强度，范围允许微调边缘检测的敏感度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_start
    - 设置边缘检测的起始阈值，可控制将被考虑的最小边缘强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_end
    - 定义边缘检测的结束阈值，允许用户限制将被检测的最大边缘强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_low
    - 指定Canny边缘检测中滞后过程的低阈值，影响较弱边缘的检测。
    - Comfy dtype: INT
    - Python dtype: int
- cannyedge_high
    - 设置Canny边缘检测中滞后过程的高阈值，影响较强边缘的检测。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cannyedge_settings
    - 输出配置好的Canny边缘检测设置作为元组，可直接用于检测过程。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, int, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_CannyEdge_Settings:
    cannyedgefrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cannyedge_from": (s.cannyedgefrom,),
                "cannyedge_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "cannyedge_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "cannyedge_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "cannyedge_low": ("INT", {"default": 100, "min": 0, "max": 255, "step": 1}),
                "cannyedge_high": ("INT", {"default": 200, "min": 0, "max": 255, "step": 1}),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("cannyedge_settings",)
    FUNCTION = "get_ctrlnet_cannyedge"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_cannyedge(self, cannyedge_from, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high):

        cannyedge_source = int (1)
        if (cannyedge_from == "Support Image"):
            cannyedge_source = int(2)
        if (cannyedge_from == "Support Direct"):
            cannyedge_source = int(3)
        
        cannyedge_settings = cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high

        return(cannyedge_settings,)

```
