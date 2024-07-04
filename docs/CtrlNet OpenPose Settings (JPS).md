
# Documentation
- Class name: CtrlNet OpenPose Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在配置控制网络中OpenPose算法的设置，允许用户指定姿态估计的来源、强度，以及是否启用身体、面部和手部估计。它将OpenPose配置的复杂性抽象为一个简单、用户友好的接口。

# Input types
## Required
- openpose_from
    - 指定OpenPose估计的源图像，可以在"Source Image"、"Support Image"或"Support Direct"之间选择。这个选择决定了OpenPose算法将应用于哪个输入图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- openpose_strength
    - 控制OpenPose估计的强度，范围从0.00到10.00。这个参数允许微调姿态估计对最终输出的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- openpose_start
    - 定义OpenPose效果在处理流程中的起始点，允许精确控制姿态估计开始的时机。
    - Comfy dtype: FLOAT
    - Python dtype: float
- openpose_end
    - 设置OpenPose效果的终点，使用户能够定义工作流程中姿态估计的持续时间和最终性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- openpose_body
    - 启用或禁用OpenPose算法中的身体估计，提供对输出中是否包含身体姿态数据的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- openpose_face
    - 允许用户启用或禁用面部估计，在OpenPose分析中是否包含面部姿态数据方面提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- openpose_hand
    - 确定是否启用或禁用手部估计，使用户能够决定是否将手部姿态数据纳入OpenPose结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]

# Output types
- openpose_settings
    - 输出配置好的OpenPose设置，作为一个元组，可直接用于控制网络的姿态估计流程。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, str, str, str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_OpenPose_Settings:
    openposefrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "openpose_from": (s.openposefrom,),
                "openpose_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "openpose_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "openpose_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "openpose_body": (["enable","disable"],),
                "openpose_face": (["enable","disable"],),
                "openpose_hand": (["enable","disable"],),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("openpose_settings",)
    FUNCTION = "get_ctrlnet_openpose"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_openpose(self, openpose_from, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand):

        openpose_source = int (1)
        if (openpose_from == "Support Image"):
            openpose_source = int(2)
        if (openpose_from == "Support Direct"):
            openpose_source = int(3)
        
        openpose_settings = openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand

        return(openpose_settings,)

```
