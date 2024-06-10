---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [Indiv◆Add] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightIndivAdd`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

This node is designed to adjust individual attention and positional encoding weights by addition, allowing for fine-tuned control over the animation diffusion process. It facilitates the customization of the animation generation by modifying the weights associated with different components of the attention mechanism.
## Input types
### Required
- **`pe_ADD`**
    - Specifies the addition value for positional encoding weights, influencing the spatial aspect of generated animations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_ADD`**
    - Determines the addition value for the overall attention weights, affecting the focus and relevance of elements within the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`other_ADD`**
    - Applies an addition adjustment to other unspecified weights, offering a generic mechanism for weight modification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`print_adjustment`**
    - Controls whether the adjustments made are printed out, aiding in debugging and fine-tuning processes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_weight_adjust`**
    - Allows for the chaining of weight adjustments by taking a previous adjustment group as input, enabling cumulative adjustments.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`weight_adjust`**
    - Comfy dtype: `WEIGHT_ADJUST`
    - Returns an updated weight adjustment group, encapsulating all the specified additions to the weights.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustIndivAddNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "other_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_weight_adjust": ("WEIGHT_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("WEIGHT_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/weight adjust"
    FUNCTION = "get_weight_adjust"

    def get_weight_adjust(self, pe_ADD: float, attn_ADD: float, other_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            pe_ADD=pe_ADD,
            attn_ADD=attn_ADD,
            other_ADD=other_ADD,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
