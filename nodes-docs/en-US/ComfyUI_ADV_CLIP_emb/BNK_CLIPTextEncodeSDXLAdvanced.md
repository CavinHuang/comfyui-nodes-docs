---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIP Text Encode SDXL (Advanced)
## Documentation
- Class name: `BNK_CLIPTextEncodeSDXLAdvanced`
- Category: `conditioning/advanced`
- Output node: `False`

This node specializes in generating advanced CLIP text embeddings for Stable Diffusion XL models, incorporating dual text inputs for local and global context, token normalization strategies, and weight interpretation methods to fine-tune the conditioning process.
## Input types
### Required
- **`text_l`**
    - The local context text input, allowing for detailed specification of parts of the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_g`**
    - The global context text input, providing an overarching theme or setting for the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model instance used for text and image embeddings.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`token_normalization`**
    - Specifies the method for normalizing token weights, affecting the emphasis of certain words or phrases.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`weight_interpretation`**
    - Defines how weights are interpreted, influencing the final embedding by adjusting the significance of certain tokens.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`balance`**
    - A float value determining the balance between local and global text embeddings in the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning object containing the advanced CLIP text embeddings, tailored for Stable Diffusion XL models.
    - Python dtype: `List[List[object]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AdvancedCLIPTextEncodeSDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "text_l": ("STRING", {"multiline": True}),
            "text_g": ("STRING", {"multiline": True}),
            "clip": ("CLIP", ),
            "token_normalization": (["none", "mean", "length", "length+mean"],),
            "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
            #"affect_pooled": (["disable", "enable"],),
            "balance": ("FLOAT", {"default": .5, "min": 0.0, "max": 1.0, "step": 0.01}),
            }}
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "conditioning/advanced"

    def encode(self, clip, text_l, text_g, token_normalization, weight_interpretation, balance, affect_pooled='disable'):
        embeddings_final, pooled = advanced_encode_XL(clip, text_l, text_g, token_normalization, weight_interpretation, w_max=1.0, clip_balance=balance, apply_to_pooled=affect_pooled == "enable")
        return ([[embeddings_final, {"pooled_output": pooled}]], )

```
