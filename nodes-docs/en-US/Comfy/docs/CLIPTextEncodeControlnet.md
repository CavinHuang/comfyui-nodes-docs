---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIPTextEncodeControlnet
## Documentation
- Class name: `CLIPTextEncodeControlnet`
- Category: `_for_testing/conditioning`
- Output node: `False`

The CLIPTextEncodeControlnet node is designed for encoding text inputs using a CLIP model, specifically tailored for generating conditioning data that integrates with control networks. This node processes text to produce embeddings and pooled outputs, which are then augmented with existing conditioning data to enhance control over generative processes.
## Input types
### Required
- **`clip`**
    - The CLIP model used for text tokenization and encoding. It plays a crucial role in transforming the input text into a format suitable for further processing and embedding generation.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`conditioning`**
    - A collection of conditioning data to be augmented with the encoded text outputs. This data is essential for tailoring the generative process to specific requirements or contexts.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`text`**
    - The input text to be encoded. This text is tokenized and encoded to produce embeddings and pooled outputs, serving as a basis for the conditioning augmentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Enhanced conditioning data, incorporating the encoded text's embeddings and pooled outputs. This output is crucial for controlling and guiding generative models.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeControlnet:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"clip": ("CLIP", ), "conditioning": ("CONDITIONING", ), "text": ("STRING", {"multiline": True, "dynamicPrompts": True})}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "_for_testing/conditioning"

    def encode(self, clip, conditioning, text):
        tokens = clip.tokenize(text)
        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['cross_attn_controlnet'] = cond
            n[1]['pooled_output_controlnet'] = pooled
            c.append(n)
        return (c, )

```
