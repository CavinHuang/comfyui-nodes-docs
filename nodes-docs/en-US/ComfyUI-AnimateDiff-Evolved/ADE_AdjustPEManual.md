---
tags:
- AnimateDiff
- Animation
- ModelTuning
---

# Adjust PE [Manual] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustPEManual`
- Category: `Animate Diff 🎭🅐🅓/ad settings/pe adjust`
- Output node: `False`

The ADE_AdjustPEManual node allows for manual adjustments to the positional encoding (PE) parameters within the AnimateDiff framework. It provides fine-grained control over the PE adjustments, enabling users to tailor the animation process to specific needs.
## Input types
### Required
- **`cap_initial_pe_length`**
    - Specifies the maximum initial length of the positional encoding to be used, allowing for the capping of PE at the beginning of the process. This can be crucial for controlling the animation's starting point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolate_pe_to_length`**
    - Determines the length to which the positional encoding should be interpolated, enabling the adjustment of PE length to match specific animation requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`initial_pe_idx_offset`**
    - Sets the starting index offset for the positional encoding, allowing for the adjustment of the animation's initial phase.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`final_pe_idx_offset`**
    - Defines the ending index offset for the positional encoding, facilitating the control over the animation's final phase.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_adjustment`**
    - Enables the printing of adjustment information, useful for debugging and understanding the impact of the applied adjustments.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_pe_adjust`**
    - Allows for the inclusion of previous positional encoding adjustments, enabling cumulative adjustments over multiple steps.
    - Comfy dtype: `PE_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`pe_adjust`**
    - Comfy dtype: `PE_ADJUST`
    - Returns an adjusted positional encoding object, reflecting the manual adjustments made to the PE settings.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ManualAdjustPENode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cap_initial_pe_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "interpolate_pe_to_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "initial_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
                "final_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_pe_adjust": ("PE_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("PE_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/pe adjust"
    FUNCTION = "get_pe_adjust"

    def get_pe_adjust(self, cap_initial_pe_length: int, interpolate_pe_to_length: int, 
                      initial_pe_idx_offset: int, final_pe_idx_offset: int, print_adjustment: bool,
                      prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(cap_initial_pe_length=cap_initial_pe_length, interpolate_pe_to_length=interpolate_pe_to_length,
                          initial_pe_idx_offset=initial_pe_idx_offset, final_pe_idx_offset=final_pe_idx_offset,
                          print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)

```
