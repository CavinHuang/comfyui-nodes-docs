---
tags:
- Animation
- CameraControl
---

# Create CameraCtrl Poses (Combo) 🎭🅐🅓②
## Documentation
- Class name: `ADE_CameraPoseCombo`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses`
- Output node: `False`

The ADE_CameraPoseCombo node is designed to create complex camera control poses by combining multiple motion types and their respective strengths. It allows for the customization of camera movements in animation sequences, enabling the generation of dynamic and nuanced camera behaviors.
## Input types
### Required
- **`motion_type1`**
    - Specifies the first type of camera motion to be included in the combination. Each motion type contributes to the overall camera movement pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`motion_type2`**
    - Specifies the second type of camera motion to be included in the combination, adding to the complexity of the camera movement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`motion_type3`**
    - Specifies the third type of camera motion, further enriching the camera movement pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`motion_type4`**
    - Specifies the fourth type of camera motion, contributing to the diversity of the camera movement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`motion_type5`**
    - Specifies the fifth type of camera motion, adding another layer to the camera movement complexity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`motion_type6`**
    - Specifies the sixth type of camera motion, completing the set of movements for a comprehensive camera control.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`speed`**
    - Controls the speed of the camera movement, affecting how quickly or slowly the camera transitions between poses.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_length`**
    - Determines the number of frames over which the camera movement occurs, defining the duration of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_poses`**
    - Optional. Previous camera poses that can be combined with the new motion for seamless transitions in animations. This input is crucial for creating fluid and continuous camera movements, especially in scenarios where maintaining a narrative or visual continuity is essential.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
## Output types
- **`cameractrl_poses`**
    - Comfy dtype: `CAMERACTRL_POSES`
    - The resulting camera control poses after combining the specified motions and strengths, ready for use in animations.
    - Python dtype: `list[list[float]]`
## Usage tips
- Infra type: `CPU`
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

```
