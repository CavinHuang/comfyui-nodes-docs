---
tags:
- AnimateDiff
- Animation
---

# 🚫[DEPR] Motion Model Settings (Adv. Attn) 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffModelSettingsAdvancedAttnStrengths`
- Category: ``
- Output node: `False`

This node is designed to configure advanced attention strengths within the AnimateDiff model settings. It allows for fine-tuning of the model's attention mechanisms by adjusting the strengths of various attention components, providing a more detailed control over the animation generation process.
## Input types
### Required
- **`pe_strength`**
    - Specifies the strength of the positional encoding adjustments, influencing the model's spatial awareness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_strength`**
    - Defines the overall strength of the attention mechanism, affecting how the model focuses on different parts of the input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_q_strength`**
    - Adjusts the strength of the query component in the attention mechanism, fine-tuning the model's querying process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_k_strength`**
    - Modifies the strength of the key component in the attention mechanism, impacting how the model matches queries to keys.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_v_strength`**
    - Alters the strength of the value component in the attention mechanism, affecting the output based on the matched queries and keys.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_weight_strength`**
    - Controls the strength of the attention output weights, influencing the final attention output's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attn_out_bias_strength`**
    - Adjusts the strength of the attention output bias, fine-tuning the bias applied to the attention output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`other_strength`**
    - Specifies the strength of other model adjustments not directly related to attention, offering broader control over the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`motion_pe_stretch`**
    - Defines the stretch factor for positional encoding in motion, affecting how motion is represented spatially.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cap_initial_pe_length`**
    - Caps the initial length of positional encoding, limiting the spatial extent at the start of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolate_pe_to_length`**
    - Determines the length to which positional encoding is interpolated, affecting the spatial resolution over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`initial_pe_idx_offset`**
    - Sets the initial offset for positional encoding indices, adjusting the starting spatial reference point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`final_pe_idx_offset`**
    - Sets the final offset for positional encoding indices, adjusting the ending spatial reference point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask_motion_scale`**
    - Optional tensor to scale motion selectively, allowing for differential motion scaling across the animation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`min_motion_scale`**
    - Sets the minimum scale for motion, ensuring a lower bound on motion intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_motion_scale`**
    - Sets the maximum scale for motion, ensuring an upper bound on motion intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`ad_settings`**
    - Comfy dtype: `AD_SETTINGS`
    - Returns the advanced attention strength settings for the AnimateDiff model, enabling precise control over the animation generation process.
    - Python dtype: `AnimateDiffSettings`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffModelSettingsAdvancedAttnStrengths:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_q_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_k_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_v_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_out_weight_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_out_bias_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "other_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "motion_pe_stretch": ("INT", {"default": 0, "min": 0, "step": 1}),
                "cap_initial_pe_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "interpolate_pe_to_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "initial_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
                "final_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
            },
            "optional": {
                "mask_motion_scale": ("MASK",),
                "min_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "max_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = ""  #"Animate Diff 🎭🅐🅓/① Gen1 nodes ①/motion settings/experimental"
    FUNCTION = "get_motion_model_settings"

    def get_motion_model_settings(self, pe_strength: float, attn_strength: float,
                                  attn_q_strength: float,
                                  attn_k_strength: float,
                                  attn_v_strength: float,
                                  attn_out_weight_strength: float,
                                  attn_out_bias_strength: float,
                                  other_strength: float,
                                  motion_pe_stretch: int,
                                  cap_initial_pe_length: int, interpolate_pe_to_length: int,
                                  initial_pe_idx_offset: int, final_pe_idx_offset: int,
                                  mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        adjust_pe = AdjustGroup(AdjustPE(motion_pe_stretch=motion_pe_stretch,
                             cap_initial_pe_length=cap_initial_pe_length, interpolate_pe_to_length=interpolate_pe_to_length,
                             initial_pe_idx_offset=initial_pe_idx_offset, final_pe_idx_offset=final_pe_idx_offset))
        adjust_weight = AdjustGroup(AdjustWeight(
            pe_MULT=pe_strength,
            attn_MULT=attn_strength,
            attn_q_MULT=attn_q_strength,
            attn_k_MULT=attn_k_strength,
            attn_v_MULT=attn_v_strength,
            attn_out_weight_MULT=attn_out_weight_strength,
            attn_out_bias_MULT=attn_out_bias_strength,
            other_MULT=other_strength,
        ))
        motion_model_settings = AnimateDiffSettings(
            adjust_pe=adjust_pe,
            adjust_weight=adjust_weight,
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
        )

        return (motion_model_settings,)

```
