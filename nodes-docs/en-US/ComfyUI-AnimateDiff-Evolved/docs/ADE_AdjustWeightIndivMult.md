---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [Indiv◆Mult] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightIndivMult`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

This node is designed to adjust the weights of individual components in a model multiplicatively, based on specified multipliers for each component. It allows for fine-tuning of model behavior by scaling the influence of different parts of the model, such as attention mechanisms and other parameters, to achieve desired outcomes.
## Input types
### Required
- **`pe_MULT`**
    - Specifies the multiplier for positional encoding weights, influencing how much the positional encodings are scaled during the adjustment process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_MULT`**
    - Determines the multiplier for the overall attention weights, affecting the scaling of attention mechanisms within the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`other_MULT`**
    - Specifies a general multiplier for other model weights not explicitly covered by other parameters, allowing for broad adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`print_adjustment`**
    - A flag indicating whether the adjustments made by this node should be printed for verification or debugging purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_weight_adjust`**
    - An optional parameter allowing for the input of previous weight adjustments, enabling cumulative adjustments over multiple iterations.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`weight_adjust`**
    - Comfy dtype: `WEIGHT_ADJUST`
    - Returns the updated weight adjustments, incorporating the multiplicative changes specified by the input parameters.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustIndivMultNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "other_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "print_adjustment": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_weight_adjust": ("WEIGHT_ADJUST",),
            }
        }
    
    RETURN_TYPES = ("WEIGHT_ADJUST",)
    CATEGORY = "Animate Diff 🎭🅐🅓/ad settings/weight adjust"
    FUNCTION = "get_weight_adjust"

    def get_weight_adjust(self, pe_MULT: float, attn_MULT: float, other_MULT: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            pe_MULT=pe_MULT,
            attn_MULT=attn_MULT,
            other_MULT=other_MULT,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
