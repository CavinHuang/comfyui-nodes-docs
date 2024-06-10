---
tags:
- AnimateDiff
- Animation
---

# AnimateDiff Settings 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffSettings`
- Category: `Animate Diff 🎭🅐🅓/ad settings`
- Output node: `False`

This node is designed to configure settings for the animation difference process, allowing users to adjust parameters related to positional encoding and weight adjustments. It serves as a foundational element in customizing the behavior and output of animation difference operations.
## Input types
### Optional
- **`pe_adjust`**
    - Specifies the adjustments to be made to the positional encoding, influencing how animation frames are generated and interpolated.
    - Comfy dtype: `PE_ADJUST`
    - Python dtype: `AdjustGroup (custom type defined within the AnimateDiff framework)`
- **`weight_adjust`**
    - Defines the adjustments to the weights, affecting the influence of different components in the animation difference calculation.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup (custom type defined within the AnimateDiff framework)`
## Output types
- **`ad_settings`**
    - Comfy dtype: `AD_SETTINGS`
    - The configured animation difference settings, ready to be applied in subsequent animation difference processes.
    - Python dtype: `AnimateDiffSettings (custom type defined within the AnimateDiff framework)`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffSettingsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "pe_adjust": ("PE_ADJUST",),
                "weight_adjust": ("WEIGHT_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings"
    FUNCTION = "get_ad_settings"

    def get_ad_settings(self, pe_adjust: AdjustGroup=None, weight_adjust: AdjustGroup=None):
        return (AnimateDiffSettings(adjust_pe=pe_adjust, adjust_weight=weight_adjust),)

```
