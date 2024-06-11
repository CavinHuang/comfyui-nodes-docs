# Manual Append CameraCtrl Poses 🎭🅐🅓②
## Documentation
- Class name: ADE_CameraManualPoseAppend
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_CameraManualPoseAppend节点用于手动追加摄像机控制姿势，允许在动画中自定义和扩展摄像机运动。此节点有助于集成用户定义的摄像机姿势，增强动画项目中动态视觉叙事的能力。

## Input types
### Required
- poses_first
    - 指定要追加的初始摄像机控制姿势集。它在确定摄像机运动的起点方面起着关键作用。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]
- poses_last
    - 定义要追加的最终摄像机控制姿势集。它决定摄像机运动的终点，允许摄像机状态之间的无缝过渡。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 输出组合的摄像机控制姿势集，表示初始和最终姿势的无缝集成，以实现动画中动态摄像机运动。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlManualAppendPose:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "poses_first": ("CAMERACTRL_POSES",),
                "poses_last": ("CAMERACTRL_POSES",),
            }
        }

    RETURN_TYPES = ("CAMERACTRL_POSES",)
    FUNCTION = "camera_manual_append"
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"

    def camera_manual_append(self, poses_first: list[list[float]], poses_last: list[list[float]]):
        return (combine_poses(poses0=poses_first, poses1=poses_last),)