---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Load AnimateDiff Model 🎭🅐🅓②
## Documentation
- Class name: `ADE_LoadAnimateDiffModel`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②`
- Output node: `False`

This node is designed to load the AnimateDiff model, facilitating the integration and application of motion models for animation purposes within the AnimateDiff framework. It serves as a foundational component in the animation pipeline, enabling users to leverage advanced animation techniques.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the motion model to be loaded. This is a critical input as it determines which motion model will be utilized for animation within the AnimateDiff framework.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`ad_settings`**
    - Optional parameter that allows for the inclusion of specific animation settings, providing additional customization and control over the animation process.
    - Comfy dtype: `AD_SETTINGS`
    - Python dtype: `AnimateDiffSettings`
## Output types
- **`MOTION_MODEL`**
    - Comfy dtype: `MOTION_MODEL_ADE`
    - Outputs the loaded motion model, ready for further processing and application within the animation pipeline.
    - Python dtype: `MotionModelPatcher`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ADE_ApplyAnimateDiffModel](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_ApplyAnimateDiffModel.md)



## Source code
```python
class LoadAnimateDiffModelNode:
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

    RETURN_TYPES = ("MOTION_MODEL_ADE",)
    RETURN_NAMES = ("MOTION_MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "load_motion_model"

    def load_motion_model(self, model_name: str, ad_settings: AnimateDiffSettings=None):
        # load motion module and motion settings, if included
        motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        return (motion_model,)

```
