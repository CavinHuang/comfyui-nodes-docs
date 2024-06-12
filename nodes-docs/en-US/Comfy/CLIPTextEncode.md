---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIP Text Encode (Prompt)
## Documentation
- Class name: `CLIPTextEncode`
- Category: `conditioning`
- Output node: `False`

The CLIPTextEncode node is designed to encode textual input using a CLIP model, transforming text into a conditioning format suitable for further processing or integration with other models. It focuses on converting text prompts into a structured format that captures the essence of the input for use in conditioned generative tasks.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the primary textual input that the node encodes. It plays a crucial role in determining the output conditioning, as it is directly processed by the CLIP model to generate embeddings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The 'clip' parameter represents the CLIP model used for text tokenization and encoding. It is essential for transforming the input text into a format that can be utilized for conditioning in generative tasks.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning format that encapsulates the encoded text information, suitable for guiding generative models in producing content that aligns with the input text.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - KSampler //Inspire
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - Reroute
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)



## Source code
```python
class CLIPTextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True, "dynamicPrompts": True}), "clip": ("CLIP", )}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "conditioning"

    def encode(self, clip, text):
        tokens = clip.tokenize(text)
        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {"pooled_output": pooled}]], )

```
