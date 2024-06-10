---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIP Text Encode (Advanced)
## Documentation
- Class name: `BNK_CLIPTextEncodeAdvanced`
- Category: `conditioning/advanced`
- Output node: `False`

This node specializes in generating advanced CLIP text embeddings by processing input text with options for token normalization and weight interpretation strategies. It aims to enhance text representation for conditioning in generative models.
## Input types
### Required
- **`text`**
    - The input text to be encoded. It supports multiline input, allowing for more complex and detailed text representations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model instance used for text tokenization and embedding generation.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`token_normalization`**
    - Specifies the method for normalizing token embeddings, offering options like none, mean, length, and length+mean to adjust the embedding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`weight_interpretation`**
    - Defines the strategy for interpreting the weights of token embeddings, with options including comfy, A1111, compel, comfy++, and down_weight.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning format suitable for generative models, including the advanced CLIP text embeddings and optional pooled output.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



## Source code
```python
class AdvancedCLIPTextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "text": ("STRING", {"multiline": True}),
            "clip": ("CLIP", ),
            "token_normalization": (["none", "mean", "length", "length+mean"],),
            "weight_interpretation": (["comfy", "A1111", "compel", "comfy++" ,"down_weight"],),
            #"affect_pooled": (["disable", "enable"],),
            }}
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "conditioning/advanced"

    def encode(self, clip, text, token_normalization, weight_interpretation, affect_pooled='disable'):
        embeddings_final, pooled = advanced_encode(clip, text, token_normalization, weight_interpretation, w_max=1.0, apply_to_pooled=affect_pooled=='enable')
        return ([[embeddings_final, {"pooled_output": pooled}]], )

```
