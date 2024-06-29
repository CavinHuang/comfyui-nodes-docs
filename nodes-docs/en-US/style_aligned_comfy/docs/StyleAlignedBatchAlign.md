---
tags:
- Latent
- Normalization
---

# StyleAligned Batch Align
## Documentation
- Class name: `StyleAlignedBatchAlign`
- Category: `style_aligned`
- Output node: `False`

The StyleAlignedBatchAlign node is designed to modify a given model to incorporate style alignment techniques, specifically focusing on sharing normalization and attention mechanisms across different parts of the model. This node enables the adjustment of the model's behavior to better align with specific styles by patching the model's attention and normalization layers based on the provided parameters.
## Input types
### Required
- **`model`**
    - The model to be patched with style alignment techniques. It serves as the base model for modifications aimed at enhancing style alignment.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`share_norm`**
    - Specifies how normalization layers should be shared within the model to achieve style alignment, influencing the model's internal processing for style consistency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`share_attn`**
    - Determines the sharing strategy for attention mechanisms within the model, affecting how the model focuses on different aspects of the input for style alignment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale`**
    - A scaling factor that adjusts the intensity of the style alignment effect, allowing for fine-tuning of the model's style-aligned behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with enhanced style alignment capabilities, reflecting the applied patches for shared normalization and attention mechanisms.
    - Python dtype: `ModelPatcher`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StyleAlignedBatchAlign:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "share_norm": (SHARE_NORM_OPTIONS,),
                "share_attn": (SHARE_ATTN_OPTIONS,),
                "scale": ("FLOAT", {"default": 1, "min": 0, "max": 1.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"
    CATEGORY = "style_aligned"

    def patch(
        self,
        model: ModelPatcher,
        share_norm: str,
        share_attn: str,
        scale: float,
    ):
        m = model.clone()
        share_group_norm = share_norm in ["group", "both"]
        share_layer_norm = share_norm in ["layer", "both"]
        register_shared_norm(model, share_group_norm, share_layer_norm)
        args = StyleAlignedArgs(share_attn)
        m.set_model_attn1_patch(SharedAttentionProcessor(args, scale))
        return (m,)

```
