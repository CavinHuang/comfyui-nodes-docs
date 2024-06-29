---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [Indiv-Attn◆Add] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightIndivAttnAdd`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

This node is designed to adjust the weights of individual attention components in an animation differential setting by adding specified values. It allows for fine-tuning of the attention mechanism's parameters to achieve desired animation effects.
## Input types
### Required
- **`pe_ADD`**
    - Specifies the amount to be added to the positional encoding weights, influencing the animation's spatial transformations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_ADD`**
    - Determines the addition to the overall attention weights, affecting how the model's attention mechanism prioritizes different parts of the input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_q_ADD`**
    - Adjusts the query weights in the attention mechanism by adding the specified value, impacting the calculation of attention scores.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_k_ADD`**
    - Modifies the key weights in the attention mechanism through addition, influencing how keys and queries interact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_v_ADD`**
    - Alters the value weights in the attention mechanism by addition, affecting the output of the attention calculation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_weight_ADD`**
    - Specifies the addition to the attention output weights, impacting the final attention output before it's passed to subsequent layers.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_bias_ADD`**
    - Adjusts the bias added to the attention output, fine-tuning the attention mechanism's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`other_ADD`**
    - Specifies the amount to be added to other unspecified weights, allowing for general adjustments outside the main attention components.
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
    - Returns an updated weight adjustment group, incorporating the specified individual attention and other adjustments.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustIndivAttnAddNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_q_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_k_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_v_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_out_weight_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
                "attn_out_bias_ADD": ("FLOAT", {"default": 0.0, "min": -2.0, "max": 2.0, "step": 0.000001}),
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

    def get_weight_adjust(self, pe_ADD: float, attn_ADD: float,
                          attn_q_ADD: float, attn_k_ADD: float, attn_v_ADD: float,
                          attn_out_weight_ADD: float, attn_out_bias_ADD: float,
                          other_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            pe_ADD=pe_ADD,
            attn_ADD=attn_ADD,
            attn_q_ADD=attn_q_ADD,
            attn_k_ADD=attn_k_ADD,
            attn_v_ADD=attn_v_ADD,
            attn_out_weight_ADD=attn_out_weight_ADD,
            attn_out_bias_ADD=attn_out_bias_ADD,
            other_ADD=other_ADD,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
