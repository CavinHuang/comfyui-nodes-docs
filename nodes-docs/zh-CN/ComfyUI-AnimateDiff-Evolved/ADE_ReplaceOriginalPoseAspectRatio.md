---

tags:
- Animation
- CameraControl

---

# Replace Orig. Pose Aspect Ratio 🎭🅐🅓②
## Documentation
- Class name: ADE_ReplaceOriginalPoseAspectRatio
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在调整AnimateDiff框架内原始姿势的纵横比，特别用于摄像机控制应用。它修改姿势的尺寸以匹配新的纵横比，确保动画和视觉效果根据所需的空间维度准确渲染。

## Input types
### Required
- poses
    - 要调整的姿势列表。每个姿势是一个浮点数列表，表示摄像机控制点的空间和旋转参数。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]
- orig_pose_width
    - 姿势的原始宽度，将用于计算新的纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- orig_pose_height
    - 姿势的原始高度，将用于计算新的纵横比。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 应用新纵横比后的调整姿势，准备在AnimateDiff框架内进行进一步处理或动画。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlSetOriginalAspectRatio:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "poses":("CAMERACTRL_POSES",),
                "orig_pose_width": ("INT", {"default": 1280, "min": 1, "max": BIGMAX}),
                "orig_pose_height": ("INT", {"default": 720, "min": 1, "max": BIGMAX}),
            }
        }
    
    RETURN_TYPES = ("CAMERACTRL_POSES",)
    FUNCTION = "set_aspect_ratio"
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"

    def set_aspect_ratio(self, poses: list[list[float]], orig_pose_width: int, orig_pose_height: int):
        return (set_original_pose_dims(poses, pose_width=orig_pose_width, pose_height=orig_pose_height),)