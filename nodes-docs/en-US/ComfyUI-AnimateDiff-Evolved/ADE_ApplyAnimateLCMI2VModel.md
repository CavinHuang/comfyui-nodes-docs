---
tags:
- AnimateDiff
- Animation
---

# Apply AnimateLCM-I2V Model 🎭🅐🅓②
## Documentation
- Class name: `ADE_ApplyAnimateLCMI2VModel`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V`
- Output node: `False`

This node is designed to apply the AnimateLCM-I2V model to animate images using latent code motion inference with I2V (Image-to-Video) capabilities. It integrates motion models and keyframe groups to generate dynamic, animated visuals from static images, enhancing them with motion and effects based on specified parameters.
## Input types
### Required
- **`motion_model`**
    - The motion model parameter is crucial for defining the motion characteristics and dynamics that will be applied to the static image. It affects the node's execution by determining the type of animation and movement effects that will be introduced.
    - Comfy dtype: `MOTION_MODEL_ADE`
    - Python dtype: `MotionModelPatcher`
- **`ref_latent`**
    - This parameter holds the reference latent representation of the image to be animated. It is essential for maintaining the image's original characteristics while applying motion effects.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`ref_drift`**
    - Specifies the degree of drift or deviation from the original image's characteristics when applying motion, allowing for subtle or significant changes in the animated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`apply_ref_when_disabled`**
    - Determines whether the reference characteristics (e.g., drift) should be applied even when the motion model is disabled, ensuring continuity in the animation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_percent`**
    - Defines the starting point of the animation within the motion model's timeline, allowing for precise control over when the animation effects begin.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Sets the endpoint of the animation within the motion model's timeline, enabling customization of the animation's duration and conclusion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`motion_lora`**
    - A list of motion-specific LoRA settings that can be applied to further customize the animation effects and dynamics.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `MotionLoraList`
- **`scale_multival`**
    - Multipliers for scaling effects, providing additional control over the size and proportion of animated elements.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Optional[List[float]]`
- **`effect_multival`**
    - Multipliers for various effects, offering further customization of the visual appearance and dynamics of the animation.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Optional[List[float]]`
- **`ad_keyframes`**
    - Specifies a group of keyframes for advanced animation control, allowing for detailed customization of motion and effects over time.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `ADKeyframeGroup`
- **`prev_m_models`**
    - A group of previously applied motion models, enabling the node to build upon or modify existing animations for enhanced or varied effects.
    - Comfy dtype: `M_MODELS`
    - Python dtype: `MotionModelGroup`
## Output types
- **`m_models`**
    - Comfy dtype: `M_MODELS`
    - The updated list of motion models, including the most recently applied model with its configured animation and effects.
    - Python dtype: `MotionModelGroup`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyAnimateLCMI2VModel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "ref_latent": ("LATENT",),
                "ref_drift": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.001}),
                "apply_ref_when_disabled": ("BOOLEAN", {"default": False}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
                "prev_m_models": ("M_MODELS",),
            }
        }
    
    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, ref_latent: dict, ref_drift: float=0.0, apply_ref_when_disabled=False, start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        new_m_models = ApplyAnimateDiffModelNode.apply_motion_model(self, motion_model, start_percent=start_percent, end_percent=end_percent,
                                                                    motion_lora=motion_lora, ad_keyframes=ad_keyframes,
                                                                    scale_multival=scale_multival, effect_multival=effect_multival, prev_m_models=prev_m_models)
        # most recent added model will always be first in list;
        curr_model = new_m_models[0].models[0]
        # confirm that model contains img_encoder
        if curr_model.model.img_encoder is None:
            raise Exception(f"Motion model '{curr_model.model.mm_info.mm_name}' does not contain an img_encoder; cannot be used with Apply AnimateLCM-I2V Model node.")
        curr_model.orig_img_latents = ref_latent["samples"]
        curr_model.orig_ref_drift = ref_drift
        curr_model.orig_apply_ref_when_disabled = apply_ref_when_disabled
        return new_m_models

```
