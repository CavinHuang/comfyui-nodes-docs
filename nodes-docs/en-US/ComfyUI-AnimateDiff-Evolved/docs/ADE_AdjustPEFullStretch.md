---
tags:
- AnimateDiff
- Animation
- ModelTuning
---

# Adjust PE [Full Stretch] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustPEFullStretch`
- Category: `Animate Diff 🎭🅐🅓/ad settings/pe adjust`
- Output node: `False`

This node is designed to adjust the positional encoding (PE) within a model by stretching it to a new length, optionally printing the adjustment process. It allows for dynamic modification of the PE to accommodate different sequence lengths or to apply specific transformations for animation or other advanced modeling purposes.
## Input types
### Required
- **`pe_stretch`**
    - Specifies the amount by which the positional encoding should be stretched. A positive integer increases the PE length, enabling the model to handle longer sequences or apply specific transformations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_adjustment`**
    - A boolean flag that, when set to True, enables the printing of the adjustment process for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_pe_adjust`**
    - An optional parameter that allows for the chaining of positional encoding adjustments by taking a previous adjustment group as input.
    - Comfy dtype: `PE_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`pe_adjust`**
    - Comfy dtype: `PE_ADJUST`
    - Returns an updated adjustment group that includes the new positional encoding stretch, ready for further processing or application.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FullStretchPENode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_stretch": ("INT", {"default": 0, "min": 0, "max": BIGMAX},),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_pe_adjust": ("PE_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("PE_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/pe adjust"
    FUNCTION = "get_pe_adjust"

    def get_pe_adjust(self, pe_stretch: int, print_adjustment: bool, prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(motion_pe_stretch=pe_stretch,
                          print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)

```
