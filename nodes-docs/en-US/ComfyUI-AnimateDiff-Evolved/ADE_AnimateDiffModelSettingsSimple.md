---
tags:
- AnimateDiff
- Animation
---

# 🚫[DEPR] Motion Model Settings (Simple) 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffModelSettingsSimple`
- Category: ``
- Output node: `False`

This node is designed to configure motion model settings for simple scenarios within the AnimateDiff framework. It allows for the adjustment of motion scale parameters and the application of optional masks to fine-tune the animation process.
## Input types
### Required
- **`motion_pe_stretch`**
    - Defines the stretch factor of positional encoding in the motion model, affecting the scale and intensity of motion applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask_motion_scale`**
    - An optional mask tensor to apply scaling selectively across different regions, enhancing control over motion effects.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`min_motion_scale`**
    - Sets the minimum scale for motion, providing a baseline for motion intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_motion_scale`**
    - Determines the maximum scale for motion, capping the intensity of motion effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`ad_settings`**
    - Comfy dtype: `AD_SETTINGS`
    - Outputs the configured motion model settings, encapsulating adjustments made to motion scale and optional masking.
    - Python dtype: `AnimateDiffSettings`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffModelSettingsSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_pe_stretch": ("INT", {"default": 0, "min": 0, "step": 1}),
            },
            "optional": {
                "mask_motion_scale": ("MASK",),
                "min_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "max_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = ""  #"Animate Diff 🎭🅐🅓/① Gen1 nodes ①/motion settings/experimental"
    FUNCTION = "get_motion_model_settings"

    def get_motion_model_settings(self, motion_pe_stretch: int,
                                  mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        adjust_pe = AdjustGroup(AdjustPE(motion_pe_stretch=motion_pe_stretch))
        motion_model_settings = AnimateDiffSettings(
            adjust_pe=adjust_pe,
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
            )

        return (motion_model_settings,)

```
