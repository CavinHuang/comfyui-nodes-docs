---
tags:
- Animation
- CameraControl
---

# Manual Append CameraCtrl Poses 🎭🅐🅓②
## Documentation
- Class name: `ADE_CameraManualPoseAppend`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses`
- Output node: `False`

The ADE_CameraManualPoseAppend node is designed for manually appending camera control poses, enabling the customization and extension of camera movements within animations. This node facilitates the integration of user-defined camera poses, enhancing the dynamic visual storytelling capabilities in animation projects.
## Input types
### Required
- **`poses_first`**
    - Specifies the initial set of camera control poses to be appended. It plays a crucial role in determining the starting point of the camera's movement.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
- **`poses_last`**
    - Defines the final set of camera control poses to be appended. It determines the ending point of the camera's movement, allowing for a seamless transition between camera states.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
## Output types
- **`cameractrl_poses`**
    - Comfy dtype: `CAMERACTRL_POSES`
    - Outputs the combined set of camera control poses, representing the seamless integration of the initial and final poses for dynamic camera movement in animations.
    - Python dtype: `list[list[float]]`
## Usage tips
- Infra type: `CPU`
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

```
