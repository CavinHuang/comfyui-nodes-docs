# Create CameraCtrl Poses (Combo) 🎭🅐🅓②
## Documentation
- Class name: ADE_CameraPoseCombo
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_CameraPoseCombo节点旨在通过组合多种运动类型及其相应的强度来创建复杂的摄像机控制姿势。它允许在动画序列中自定义摄像机运动，从而生成动态且细致的摄像机行为。

## Input types
### Required
- motion_type1
    - 指定要包含在组合中的第一种摄像机运动类型。每种运动类型都对整体摄像机运动模式有所贡献。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_type2
    - 指定要包含在组合中的第二种摄像机运动类型，增加摄像机运动的复杂性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_type3
    - 指定第三种摄像机运动类型，进一步丰富摄像机的运动模式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_type4
    - 指定第四种摄像机运动类型，对摄像机运动的多样性有所贡献。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_type5
    - 指定第五种摄像机运动类型，为摄像机运动的复杂性增加另一层。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_type6
    - 指定第六种摄像机运动类型，完成综合摄像机控制的运动集。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- speed
    - 控制摄像机运动的速度，影响摄像机在姿势之间过渡的快慢。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_length
    - 确定摄像机运动发生的帧数，定义动画的持续时间。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- prev_poses
    - 可选。可以与新运动结合的先前摄像机姿势，以实现动画中的无缝过渡。此输入对于创建流畅且连续的摄像机运动至关重要，尤其是在需要保持叙述或视觉连续性的场景中。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 组合指定的运动和强度后生成的摄像机控制姿势，准备用于动画。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlPoseCombo:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "motion_type1": (CAM._LIST,),
                "motion_type2": (CAM._LIST,),
                "motion_type3": (CAM._LIST,),
                "motion_type4": (CAM._LIST,),
                "motion_type5": (CAM._LIST,),
                "motion_type6": (CAM._LIST,),
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
        combined_motion = CameraMotion.combine([
            CAM.get(motion_type1).multiply(strength1), CAM.get(motion_type2).multiply(strength2), CAM.get(motion_type3).multiply(strength3),
            CAM.get(motion_type4).multiply(strength4), CAM.get(motion_type5).multiply(strength5), CAM.get(motion_type6).multiply(strength6)
            ])
        RT = get_camera_motion(combined_motion.rotate, combined_motion.translate, speed, frame_length)
        new_motion = ndarray_to_poses(RT=RT)
        if prev_poses is not None:
            new_motion = combine_poses(prev_poses, new_motion)
        return (new_motion,)