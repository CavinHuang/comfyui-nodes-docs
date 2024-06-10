---
tags:
- AnimateDiff
- Animation
- ModelTuning
- Weight
---

# Adjust Weight [Indiv-Attn◆Mult] 🎭🅐🅓
## Documentation
- Class name: `ADE_AdjustWeightIndivAttnMult`
- Category: `Animate Diff 🎭🅐🅓/ad settings/weight adjust`
- Output node: `False`

This node is designed to adjust the weights of individual attention components in a model by applying multiplication factors. It allows for fine-tuning of the attention mechanism's parameters, such as query, key, value, and output weights and biases, to potentially enhance model performance or adapt it to specific tasks.
## Input types
### Required
- **`pe_MULT`**
    - Specifies the multiplication factor for positional encoding weights, influencing how much the positional information contributes to the model's attention mechanism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_MULT`**
    - Determines the overall multiplication factor for the attention weights, affecting the model's focus on different parts of the input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_q_MULT`**
    - Applies a multiplication factor to the query weights of the attention mechanism, adjusting its querying capabilities.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_k_MULT`**
    - Sets the multiplication factor for the key weights, influencing the model's ability to match queries to relevant information.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_v_MULT`**
    - Controls the multiplication factor for the value weights, affecting how input information is summarized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_weight_MULT`**
    - Adjusts the output weights of the attention mechanism through a multiplication factor, impacting the final attention output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_bias_MULT`**
    - Modifies the bias of the attention output with a multiplication factor, potentially altering the attention mechanism's output bias.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`other_MULT`**
    - Applies a multiplication factor to other unspecified model weights, offering a generic way to adjust model parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`print_adjustment`**
    - A flag to enable or disable printing of the adjustment details, useful for debugging or monitoring the adjustment process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_weight_adjust`**
    - Allows for chaining adjustments by taking a previous weight adjustment group as input, enabling cumulative adjustments.
    - Comfy dtype: `WEIGHT_ADJUST`
    - Python dtype: `AdjustGroup`
## Output types
- **`weight_adjust`**
    - Comfy dtype: `WEIGHT_ADJUST`
    - Returns an updated weight adjustment group, incorporating the specified multiplicative adjustments to the model's attention mechanism and potentially other weights.
    - Python dtype: `AdjustGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightAdjustIndivAttnMultNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_q_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_k_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_v_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_out_weight_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
                "attn_out_bias_MULT": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.000001}),
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

    def get_weight_adjust(self, pe_MULT: float, attn_MULT: float,
                          attn_q_MULT: float, attn_k_MULT: float, attn_v_MULT: float,
                          attn_out_weight_MULT: float, attn_out_bias_MULT: float,
                          other_MULT: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(
            pe_MULT=pe_MULT,
            attn_MULT=attn_MULT,
            attn_q_MULT=attn_q_MULT,
            attn_k_MULT=attn_k_MULT,
            attn_v_MULT=attn_v_MULT,
            attn_out_weight_MULT=attn_out_weight_MULT,
            attn_out_bias_MULT=attn_out_bias_MULT,
            other_MULT=other_MULT,
            print_adjustment=print_adjustment
        )
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)

```
