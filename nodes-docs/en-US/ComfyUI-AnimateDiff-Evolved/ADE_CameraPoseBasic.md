---
tags:
- Animation
- CameraControl
---

# Create CameraCtrl Poses 🎭🅐🅓②
## Documentation
- Class name: `ADE_CameraPoseBasic`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses`
- Output node: `False`

This node is designed to create basic camera control poses based on specified motion types, speed, and frame length. It allows for the generation of camera poses that can be used to control the camera's movement and orientation in a 3D environment, facilitating dynamic and customizable animations.
## Input types
### Required
- **`motion_type`**
    - Specifies the type of motion to apply to the camera, influencing the direction and nature of the camera's movement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`speed`**
    - Determines the speed at which the camera moves, allowing for control over the pace of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_length`**
    - Defines the number of frames over which the camera motion is applied, setting the duration of the camera's movement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_poses`**
    - Optional. Provides previous camera poses to be combined with the newly generated ones, enabling seamless transitions between animations.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
## Output types
- **`cameractrl_poses`**
    - Comfy dtype: `CAMERACTRL_POSES`
    - Outputs the generated camera control poses, ready for use in animations.
    - Python dtype: `list[list[float]]`
## Usage tips
- Infra type: `CPU`
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

```
