# Create CameraCtrl Poses 🎭🅐🅓②
## Documentation
- Class name: ADE_CameraPoseBasic
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在根据指定的运动类型、速度和帧长创建基本的摄像机控制姿势。它允许生成可用于控制摄像机在3D环境中的运动和方向的姿势，从而实现动态和可定制的动画。

## Input types
### Required
- motion_type
    - 指定要应用于摄像机的运动类型，影响摄像机运动的方向和性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- speed
    - 确定摄像机移动的速度，允许控制动画的节奏。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_length
    - 定义应用摄像机运动的帧数，设置摄像机运动的持续时间。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- prev_poses
    - 可选。提供先前的摄像机姿势，以与新生成的姿势结合，实现动画之间的无缝过渡。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 输出生成的摄像机控制姿势，准备用于动画。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlPoseBasic:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "motion_type": (CAM._LIST,),
                "speed": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                "frame_length": ("INT", {"default": 16}),
            },
            "optional": {
                "prev_poses": ("CAMERACTRL_POSES",),
            }
        }

    RETURN_TYPES = ("CAMERACTRL_POSES",)
    FUNCTION = "camera_pose_basic"
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"

    def camera_pose_basic(self, motion_type: str, speed: float, frame_length: int, prev_poses: list[list[float]]=None):
        motion = CAM.get(motion_type)
        RT = get_camera_motion(motion.rotate, motion.translate, speed, frame_length)
        new_motion = ndarray_to_poses(RT=RT)
        if prev_poses is not None:
            new_motion = combine_poses(prev_poses, new_motion)
        return (new_motion,)