
# Documentation
- Class name: SMPLShapeParameters
- Category: MotionDiff/smpl
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SMPLShapeParameters节点旨在根据各种人体测量数据调整SMPL模型的形状参数。它封装了修改SMPL模型尺寸的功能，如身体部位的大小、厚度和比例，以达到所需的外观或匹配特定的身体特征。

# Input types
## Required
- smpl
    - 待修改的SMPL模型。这个参数至关重要，因为它作为基础模型，其形状参数将根据提供的测量数据进行调整。
    - Comfy dtype: SMPL
    - Python dtype: dict
- size
    - 表示SMPL模型的整体大小，影响其比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- thickness
    - 控制SMPL模型的厚度，影响其体积和块状程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upper_body_height
    - 调整上半身的高度，改变躯干长度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lower_body_height
    - 修改下半身的高度，影响腿部长度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- muscle_mass
    - 决定SMPL模型的肌肉质量，影响其肌肉定义。
    - Comfy dtype: FLOAT
    - Python dtype: float
- legs
    - 调整腿部比例，影响其形状和长度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- chest
    - 修改胸部大小，影响躯干的宽度和外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- waist_height
    - 控制腰部高度，影响身体的整体比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- waist_width
    - 调整腰部宽度，影响模型的轮廓。
    - Comfy dtype: FLOAT
    - Python dtype: float
- arms
    - 修改手臂的长度和形状，影响其外观和比例。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- smpl
    - 修改后的SMPL模型，其形状参数反映了输入的测量数据。
    - Comfy dtype: SMPL
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SMPLShapeParameters:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "size": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "thickness": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "upper_body_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "lower_body_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "muscle_mass": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "legs": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "chest": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "waist_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "waist_width": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "arms": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("SMPL",)
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "setparams"
    def setparams(self, smpl, size, thickness, upper_body_height, lower_body_height, muscle_mass, legs, chest, waist_height, waist_width, arms):
        shape_parameters = [size, thickness, upper_body_height, lower_body_height, muscle_mass, legs, chest, waist_height, waist_width, arms]
        smpl[2]["shape_parameters"] = shape_parameters
        return (smpl,)

```
