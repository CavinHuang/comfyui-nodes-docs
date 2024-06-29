---
tags:
- AnimateDiff
- Animation
---

# 🚫[DEPR] Motion Model Settings 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffModelSettings_Release`
- Category: ``
- Output node: `False`

This node is designed to configure motion model settings for the AnimateDiff process, focusing on advanced attention strengths adjustments. It aims to provide users with the ability to fine-tune the animation effects applied through the AnimateDiff framework.
## Input types
### Required
- **`min_motion_scale`**
    - Specifies the minimum scale for motion, influencing the subtlety or intensity of the animation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_motion_scale`**
    - Defines the maximum scale for motion, affecting the range of motion intensity that can be applied to the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask_motion_scale`**
    - A mask tensor that allows for fine-tuned control over motion scaling across different regions of the input.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`ad_settings`**
    - Comfy dtype: `AD_SETTINGS`
    - The output is a configuration set for the AnimateDiff model, encapsulating adjustments to motion scales and potentially other parameters.
    - Python dtype: `AnimateDiffSettings`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffModelSettings:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "max_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            },
            "optional": {
                "mask_motion_scale": ("MASK",),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = ""  #"Animate Diff 🎭🅐🅓/① Gen1 nodes ①/motion settings"
    FUNCTION = "get_motion_model_settings"

    def get_motion_model_settings(self, mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        motion_model_settings = AnimateDiffSettings(
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
            )

        return (motion_model_settings,)

```
