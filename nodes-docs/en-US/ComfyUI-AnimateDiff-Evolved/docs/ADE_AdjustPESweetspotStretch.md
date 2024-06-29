---
tags:
- AnimateDiff
- Animation
- ModelTuning
---

# Adjust PE [Sweetspot Stretch] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustPESweetspotStretch`
- Category: `Animate Diff 🎭🅐🅓/ad settings/pe adjust`
- Output node: `False`

This node is designed to adjust the position encoding (PE) sweetspot stretch in the AnimateDiff framework, allowing for dynamic modification of the PE stretch based on input parameters. It facilitates the fine-tuning of animation effects by modifying how the position encoding adapts over the course of an animation.
## Input types
### Required
- **`sweetspot`**
    - Defines the initial position encoding length, serving as a baseline for adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`new_sweetspot`**
    - Specifies the target position encoding length to adjust towards, enabling the stretch or compression of the encoding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_adjustment`**
    - A flag to control the logging of adjustment details, aiding in debugging and fine-tuning.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_pe_adjust`**
    - Allows for the incorporation of previous position encoding adjustments, enabling cumulative modifications.
    - Comfy dtype: `PE_ADJUST`
    - Python dtype: `custom.AdjustGroup`
## Output types
- **`pe_adjust`**
    - Comfy dtype: `PE_ADJUST`
    - Returns the updated position encoding adjustment, encapsulating the modifications applied.
    - Python dtype: `custom.AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SweetspotStretchPENode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sweetspot": ("INT", {"default": 16, "min": 0, "max": BIGMAX},),
                "new_sweetspot": ("INT", {"default": 16, "min": 0, "max": BIGMAX},),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_pe_adjust": ("PE_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("PE_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/pe adjust"
    FUNCTION = "get_pe_adjust"

    def get_pe_adjust(self, sweetspot: int, new_sweetspot: int, print_adjustment: bool, prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(cap_initial_pe_length=sweetspot, interpolate_pe_to_length=new_sweetspot,
                          print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)

```
