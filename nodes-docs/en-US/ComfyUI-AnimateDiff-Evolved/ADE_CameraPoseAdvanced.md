---
tags:
- Animation
- CameraControl
---

# Create CameraCtrl Poses (Adv.) 🎭🅐🅓②
## Documentation
- Class name: `ADE_CameraPoseAdvanced`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses`
- Output node: `False`

The ADE_CameraPoseAdvanced node is designed for creating advanced camera control poses for animations. It allows for the combination of multiple motion types and strengths to generate complex camera movements, enhancing the dynamic visual storytelling in animated sequences.
## Input types
### Required
- **`motion_type1`**
    - Specifies the first type of camera motion to apply, influencing the overall camera movement and its visual impact on the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength1`**
    - Specifies the strength multiplier for the first motion type, adjusting the intensity of the camera's movement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_type2`**
    - Defines the second type of camera motion, contributing to the complexity and depth of the camera's path.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength2`**
    - Defines the strength multiplier for the second motion type, modifying the impact of the camera's path.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_type3`**
    - Indicates the third type of camera motion, adding another layer of movement to the camera's trajectory.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength3`**
    - Indicates the strength multiplier for the third motion type, altering the camera's movement intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_type4`**
    - Specifies the fourth type of camera motion, further enriching the camera's movement and its effect on the scene.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength4`**
    - Specifies the strength multiplier for the fourth motion type, affecting the depth of the camera's trajectory.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_type5`**
    - Defines the fifth type of camera motion, enhancing the animation with additional movement nuances.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength5`**
    - Defines the strength multiplier for the fifth motion type, influencing the nuance of the camera's movement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_type6`**
    - Indicates the sixth type of camera motion, completing the set of movements for sophisticated camera control.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength6`**
    - Indicates the strength multiplier for the sixth motion type, fine-tuning the complexity of the camera's control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`speed`**
    - Controls the speed of the camera movement, affecting how quickly or slowly the camera transitions between poses.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_length`**
    - Determines the number of frames over which the camera movement is applied, defining the duration of the motion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_poses`**
    - Optional. Previous camera poses that can be combined with the new motion for seamless transitions in animations.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
## Output types
- **`cameractrl_poses`**
    - Comfy dtype: `CAMERACTRL_POSES`
    - The resulting camera control poses, representing the combined effect of the specified motions and parameters on the camera's path through the animation.
    - Python dtype: `list[list[float]]`
## Usage tips
- Infra type: `CPU`
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

```
