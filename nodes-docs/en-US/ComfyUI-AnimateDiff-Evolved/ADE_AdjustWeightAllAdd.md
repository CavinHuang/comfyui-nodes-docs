---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [All◆Add] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightAllAdd`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

The ADE_AdjustWeightAllAdd node is designed to adjust the weights of various components in an animation diffusion model by adding specified values. This adjustment process is crucial for fine-tuning the animation generation process, allowing for more precise control over the animation's appearance and behavior.
## Input types
### Required
- **`all_ADD`**
    - Specifies the value to be added to all weight components, enabling a uniform adjustment across the model. This parameter allows for a broad modification of the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`print_adjustment`**
    - A boolean flag that, when set to true, enables the printing of the adjustment details for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_weight_adjust`**
    - An optional parameter that allows for the chaining of weight adjustments by providing a previous AdjustGroup object. This facilitates cumulative adjustments over multiple steps.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`weight_adjust`**
    - Comfy dtype: `WEIGHT_ADJUST`
    - Returns an updated AdjustGroup object that encapsulates the new weight adjustments, reflecting the changes made to the model's weights.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustAllAddNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "all_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_weight_adjust": ("WEIGHT_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("WEIGHT_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/weight adjust"
    FUNCTION = "get_weight_adjust"

    def get_weight_adjust(self, all_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            all_ADD=all_ADD,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
