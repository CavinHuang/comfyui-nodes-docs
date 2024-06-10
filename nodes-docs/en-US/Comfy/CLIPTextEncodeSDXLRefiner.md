---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIPTextEncodeSDXLRefiner
## Documentation
- Class name: `CLIPTextEncodeSDXLRefiner`
- Category: `advanced/conditioning`
- Output node: `False`

The CLIPTextEncodeSDXLRefiner node specializes in refining text inputs for image generation by encoding them using a CLIP model, incorporating aesthetic scores and dimensions to enhance the conditioning for image synthesis.
## Input types
### Required
- **`ascore`**
    - The aesthetic score parameter influences the aesthetic quality of the generated image, allowing for fine-tuning based on aesthetic preferences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - Specifies the desired width of the output image, impacting the aspect ratio and detail level of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the output image, affecting its aspect ratio and the level of detail in the vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The text input to be encoded, serving as the primary source of semantic information for image generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model instance used for encoding the text input, crucial for interpreting the semantic content.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Provides the encoded text along with aesthetic scores and dimensions, ready for use in further image synthesis processes.
    - Python dtype: `list`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)



## Source code
```python
class CLIPTextEncodeSDXLRefiner:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "ascore": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "text": ("STRING", {"multiline": True, "dynamicPrompts": True}), "clip": ("CLIP", ),
            }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "advanced/conditioning"

    def encode(self, clip, ascore, width, height, text):
        tokens = clip.tokenize(text)
        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {"pooled_output": pooled, "aesthetic_score": ascore, "width": width,"height": height}]], )

```
