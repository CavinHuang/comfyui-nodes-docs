
# Documentation
- Class name: CtrlNet OpenPose Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

CtrlNet OpenPose Pipe节点旨在处理和应用OpenPose设置到输入数据中，便于配置和应用OpenPose参数进行姿态估计任务。它抽象了设置OpenPose配置的复杂性，使姿态估计更容易集成到更广泛的工作流程中。

# Input types
## Required
- openpose_settings
    - 指定OpenPose的配置设置，包括源、强度、起始点、结束点，以及身体、面部和手部检测的选项。每个设置在调整OpenPose算法的行为中都起着关键作用，影响姿态估计的准确性和重点。例如，源决定了OpenPose算法将应用于哪里（如主图像或辅助图像），强度调整姿态检测的强度，而身体、面部和手部检测的选项则允许根据任务需求强调或忽略特定的姿态方面。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, str, str, str]

# Output types
- openpose_source
    - Comfy dtype: INT
    - 标识OpenPose处理的输入源。
    - Python dtype: int
- openpose_strength
    - Comfy dtype: FLOAT
    - 定义OpenPose效果的强度。
    - Python dtype: float
- openpose_start
    - Comfy dtype: FLOAT
    - 指定OpenPose效果的起始点。
    - Python dtype: float
- openpose_end
    - Comfy dtype: FLOAT
    - 指定OpenPose效果的结束点。
    - Python dtype: float
- openpose_body
    - Comfy dtype: COMBO[STRING]
    - 启用或禁用OpenPose中的身体检测。
    - Python dtype: str
- openpose_face
    - Comfy dtype: COMBO[STRING]
    - 启用或禁用OpenPose中的面部检测。
    - Python dtype: str
- openpose_hand
    - Comfy dtype: COMBO[STRING]
    - 启用或禁用OpenPose中的手部检测。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_OpenPose_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "openpose_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", ["enable","disable"], ["enable","disable"], ["enable","disable"],)
    RETURN_NAMES = ("openpose_source", "openpose_strength", "openpose_start", "openpose_end", "openpose_body", "openpose_face", "openpose_hand",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,openpose_settings):
        
        openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand = openpose_settings

        return(openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand,)

```
