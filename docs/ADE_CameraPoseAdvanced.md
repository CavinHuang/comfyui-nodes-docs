# Create CameraCtrl Poses (Adv.) 🎭🅐🅓②
## Documentation
- Class name: ADE_CameraPoseAdvanced
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_CameraPoseAdvanced节点旨在为动画创建高级摄像机控制姿势。它允许组合多种运动类型和强度，以生成复杂的摄像机运动，增强动画序列中的动态视觉叙事。

## Input types
### Required
- motion_type1
    - 指定要应用的第一种摄像机运动类型，影响整体摄像机运动及其对动画的视觉影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength1
    - 指定第一种运动类型的强度乘数，调整摄像机运动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_type2
    - 定义第二种摄像机运动类型，有助于增加摄像机路径的复杂性和深度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength2
    - 定义第二种运动类型的强度乘数，修改摄像机路径的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_type3
    - 指示第三种摄像机运动类型，为摄像机轨迹增加另一层运动。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength3
    - 指示第三种运动类型的强度乘数，改变摄像机运动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_type4
    - 指定第四种摄像机运动类型，进一步丰富摄像机的运动及其对场景的影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength4
    - 指定第四种运动类型的强度乘数，影响摄像机轨迹的深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_type5
    - 定义第五种摄像机运动类型，通过额外的运动细微差别增强动画。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength5
    - 定义第五种运动类型的强度乘数，影响摄像机运动的细微差别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_type6
    - 指示第六种摄像机运动类型，完成复杂摄像机控制的运动集。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength6
    - 指示第六种运动类型的强度乘数，微调摄像机运动的复杂性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- speed
    - 控制摄像机运动的速度，影响摄像机在姿势之间过渡的快慢。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_length
    - 确定应用摄像机运动的帧数，定义运动的持续时间。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- prev_poses
    - 可选。可以与新运动结合的先前摄像机姿势，以实现动画中的无缝过渡。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 生成的摄像机控制姿势，代表指定运动和参数对摄像机在动画中路径的综合效果。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlPoseAdvanced:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "motion_type1": (CAM._LIST,),
                "strength1": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "motion_type2": (CAM._LIST,),
                "strength2": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "motion_type3": (CAM._LIST,),
                "strength3": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "motion_type4": (CAM._LIST,),
                "strength4": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "motion_type5": (CAM._LIST,),
                "strength5": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "motion_type6": (CAM._LIST,),
                "strength6": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "speed": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                "frame_length": ("INT", {"default": 16}),
            },
            "optional": {
                "prev_poses": ("CAMERACTRL_POSES",),
            }
        }

    RETURN_TYPES = ("CAMERACTRL_POSES",)
    FUNCTION = "camera_pose_combo"
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"

    def camera_pose_combo(self,
                          motion_type1: str, motion_type2: str, motion_type3: str,
                          motion_type4: str, motion_type5: str, motion_type6: str,
                          speed: float, frame_length: int,
                          prev_poses: list[list[float]]=None,
                          strength1=1.0, strength2=1.0, strength3=1.0, strength4=1.0, strength5=1.0, strength6=1.0):
        return CameraCtrlPoseCombo.camera_pose_combo(self,
                                                     motion_type1=motion_type1, motion_type2=motion_type2, motion_type3=motion_type3,
                                                     motion_type4=motion_type4, motion_type5=motion_type5, motion_type6=motion_type6,
                                                     speed=speed, frame_length=frame_length, prev_poses=prev_poses,
                                                     strength1=strength1, strength2=strength2, strength3=strength3,
                                                     strength4=strength4, strength5=strength5, strength6=strength6)