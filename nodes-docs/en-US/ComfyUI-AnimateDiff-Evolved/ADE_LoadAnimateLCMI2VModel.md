---
tags:
- AnimateDiff
- Animation
---

# Load AnimateLCM-I2V Model 🎭🅐🅓②
## Documentation
- Class name: `ADE_LoadAnimateLCMI2VModel`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V`
- Output node: `False`

The ADE_LoadAnimateLCMI2VModel node is designed to load and prepare AnimateLCM-I2V motion models for animation processes. It ensures that the selected motion model is compatible with the AnimateLCM-I2V format and has an image encoder, facilitating the integration of motion models into the animation workflow.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the motion model to be loaded, ensuring that the model is available and compatible with the AnimateLCM-I2V format.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`ad_settings`**
    - Optional settings for the Animate Diff process that can be applied to the motion model, allowing for customization of the animation.
    - Comfy dtype: `AD_SETTINGS`
    - Python dtype: `AnimateDiffSettings or None`
## Output types
- **`MOTION_MODEL`**
    - Comfy dtype: `MOTION_MODEL_ADE`
    - The loaded motion model, ready for use in animation processes.
    - Python dtype: `MotionModelPatcher`
- **`encoder_only`**
    - Comfy dtype: `MOTION_MODEL_ADE`
    - A version of the motion model that only includes the encoder, useful for specific animation tasks.
    - Python dtype: `MotionModelPatcher`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadAnimateLCMI2VModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (get_available_motion_models(),),
            },
            "optional": {
                "ad_settings": ("AD_SETTINGS",),
            }
        }
    
    RETURN_TYPES = ("MOTION_MODEL_ADE", "MOTION_MODEL_ADE")
    RETURN_NAMES = ("MOTION_MODEL", "encoder_only")
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"
    FUNCTION = "load_motion_model"

    def load_motion_model(self, model_name: str, ad_settings: AnimateDiffSettings=None):
        # load motion module and motion settings, if included
        motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        # make sure model is an AnimateLCM-I2V model
        if motion_model.model.mm_info.mm_format != AnimateDiffFormat.ANIMATELCM:
            raise Exception(f"Motion model '{motion_model.model.mm_info.mm_name}' is not an AnimateLCM-I2V model; selected model is not AnimateLCM, and does not contain an img_encoder.")
        if motion_model.model.img_encoder is None:
            raise Exception(f"Motion model '{motion_model.model.mm_info.mm_name}' is not an AnimateLCM-I2V model; selected model IS AnimateLCM, but does NOT contain an img_encoder.")
        # create encoder-only motion model
        encoder_only_motion_model = create_fresh_encoder_only_model(motion_model=motion_model)
        return (motion_model, encoder_only_motion_model)

```
