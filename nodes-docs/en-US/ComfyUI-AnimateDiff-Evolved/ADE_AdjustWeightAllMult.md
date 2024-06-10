---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [All◆Mult] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightAllMult`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

The ADE_AdjustWeightAllMult node is designed for adjusting the weights of various components in an animation diffusion model by applying a multiplication factor to all weights simultaneously. This node facilitates the fine-tuning of animation generation by allowing for global adjustments to the model's behavior, enhancing or diminishing the influence of all weights based on the provided multiplier.
## Input types
### Required
- **`all_MULT`**
    - Specifies the multiplication factor to be applied to all weights, enabling global adjustment of the model's behavior. This parameter allows for the scaling of weights to either amplify or reduce their influence in the animation generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`print_adjustment`**
    - A boolean flag that, when set to True, enables the printing of the adjustment details for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_weight_adjust`**
    - An optional parameter that allows for the continuation of weight adjustments from a previous state, facilitating sequential adjustments within a workflow.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`weight_adjust`**
    - Comfy dtype: `WEIGHT_ADJUST`
    - Returns an updated weight adjustment object, encapsulating the applied global multiplication adjustments to all weights.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustAllMultNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "all_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_weight_adjust": ("WEIGHT_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("WEIGHT_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/weight adjust"
    FUNCTION = "get_weight_adjust"

    def get_weight_adjust(self, all_MULT: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            all_MULT=all_MULT,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
