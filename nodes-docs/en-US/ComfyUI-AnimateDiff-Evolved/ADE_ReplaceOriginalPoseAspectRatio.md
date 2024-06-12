---
tags:
- Animation
- CameraControl
---

# Replace Orig. Pose Aspect Ratio 🎭🅐🅓②
## Documentation
- Class name: `ADE_ReplaceOriginalPoseAspectRatio`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses`
- Output node: `False`

This node is designed to adjust the aspect ratio of original poses within the AnimateDiff framework, specifically for camera control applications. It modifies the dimensions of poses to match a new aspect ratio, ensuring that animations and visual effects are accurately rendered according to the desired spatial dimensions.
## Input types
### Required
- **`poses`**
    - The list of poses to be adjusted. Each pose is a list of floats representing the spatial and rotational parameters of a camera control point.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
- **`orig_pose_width`**
    - The original width of the pose, which will be used to calculate the new aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`orig_pose_height`**
    - The original height of the pose, which will be used to calculate the new aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`cameractrl_poses`**
    - Comfy dtype: `CAMERACTRL_POSES`
    - The adjusted poses with the new aspect ratio applied, ready for further processing or animation within the AnimateDiff framework.
    - Python dtype: `list[list[float]]`
## Usage tips
- Infra type: `CPU`
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

```
