---
tags:
- AnimateDiff
- Animation
---

# Apply AnimateDiff+CameraCtrl Model 🎭🅐🅓②
## Documentation
- Class name: `ADE_ApplyAnimateDiffModelWithCameraCtrl`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl`
- Output node: `False`

This node applies the AnimateDiff model with camera control, integrating motion model adjustments and camera control parameters to generate animated sequences. It leverages camera control poses and other animation parameters to enhance the AnimateDiff model's output, providing a more dynamic and customizable animation experience.
## Input types
### Required
- **`motion_model`**
    - The motion model to be animated, incorporating both the AnimateDiff model's capabilities and camera control features for enhanced animation.
    - Comfy dtype: `MOTION_MODEL_ADE`
    - Python dtype: `MotionModelPatcher`
- **`cameractrl_poses`**
    - A list of camera control poses, each defining a specific camera position and orientation to be applied during the animation process.
    - Comfy dtype: `CAMERACTRL_POSES`
    - Python dtype: `list[list[float]]`
- **`start_percent`**
    - The starting point of the animation as a percentage of the total animation length, allowing for partial animations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - The ending point of the animation as a percentage of the total animation length, enabling customization of the animation's duration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`motion_lora`**
    - Optional parameter for specifying motion LoRA settings to further customize the animation.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `MotionLoraList`
- **`scale_multival`**
    - Optional parameter for applying scale multipliers to the animation, affecting the overall size of animated elements.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `dict`
- **`effect_multival`**
    - Optional parameter for applying effect multipliers, allowing for additional visual effects in the animation.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `dict`
- **`cameractrl_multival`**
    - Optional parameter for applying multiple camera control values, enhancing the dynamic camera movements within the animation.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `dict`
- **`ad_keyframes`**
    - Optional parameter for defining keyframes within the animation, enabling precise control over animation sequences.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `ADKeyframeGroup`
- **`prev_m_models`**
    - Optional parameter for incorporating previously generated motion models, facilitating sequential or layered animations.
    - Comfy dtype: `M_MODELS`
    - Python dtype: `MotionModelGroup`
## Output types
- **`m_models`**
    - Comfy dtype: `M_MODELS`
    - The resulting motion models after applying the AnimateDiff model with camera control, including any specified animations and effects.
    - Python dtype: `MotionModelGroup`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyAnimateDiffWithCameraCtrl:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "cameractrl_poses": ("CAMERACTRL_POSES",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "cameractrl_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
                "prev_m_models": ("M_MODELS",),
            }
        }
    
    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, cameractrl_poses: list[list[float]], start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None, cameractrl_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        new_m_models = ApplyAnimateDiffModelNode.apply_motion_model(self, motion_model, start_percent=start_percent, end_percent=end_percent,
                                                                    motion_lora=motion_lora, ad_keyframes=ad_keyframes,
                                                                    scale_multival=scale_multival, effect_multival=effect_multival, prev_m_models=prev_m_models)
        # most recent added model will always be first in list;
        curr_model = new_m_models[0].models[0]
        # confirm that model contains camera_encoder
        if curr_model.model.camera_encoder is None:
            raise Exception(f"Motion model '{curr_model.model.mm_info.mm_name}' does not contain a camera_encoder; cannot be used with Apply AnimateDiff-CameraCtrl Model node.")
        camera_entries = [CameraEntry(entry) for entry in cameractrl_poses]
        curr_model.orig_camera_entries = camera_entries
        curr_model.cameractrl_multival = cameractrl_multival
        return new_m_models

```
