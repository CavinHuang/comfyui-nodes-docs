---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# 🔧 SDXLCLIPTextEncode
## Documentation
- Class name: `CLIPTextEncodeSDXL+`
- Category: `essentials`
- Output node: `False`

This node is designed to encode text inputs using the CLIP model tailored for the SDXL architecture, facilitating advanced text-to-image generation tasks by converting textual descriptions into a format that can be effectively utilized by image synthesis models.
## Input types
### Required
- **`width`**
    - Specifies the width of the target image in pixels. This parameter influences the dimensions of the encoded output, affecting how the textual description is spatially conditioned for image synthesis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the target image in pixels. Similar to width, it affects the spatial conditioning of the textual description, tailoring the encoded output to the desired image dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_cond_factor`**
    - A factor that adjusts the size of the conditioning, impacting the resolution at which the text is encoded. This can affect the level of detail and the scale at which the text influences the image synthesis process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The textual input to be encoded. This parameter is crucial as it provides the descriptive content that the node will encode into a format suitable for image synthesis. The specific text influences the thematic elements and details that will be present in the synthesized image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A reference to the CLIP model instance used for encoding the text. This parameter is essential for the node to perform the encoding process, leveraging the CLIP model's capabilities to interpret and encode the textual description in a way that's compatible with image synthesis models.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output of the node, which includes the encoded text along with additional information relevant for image synthesis, such as aesthetic scores and dimensions. This conditioning data is crucial for guiding the image synthesis process according to the encoded textual description.
    - Python dtype: `List[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeSDXLSimplified:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "size_cond_factor": ("INT", {"default": 4, "min": 1, "max": 16 }),
            "text": ("STRING", {"multiline": True, "dynamicPrompts": True, "default": ""}),
            "clip": ("CLIP", ),
            }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, clip, width, height, size_cond_factor, text):
        crop_w = 0
        crop_h = 0
        width = width*size_cond_factor
        height = height*size_cond_factor
        target_width = width
        target_height = height
        text_g = text_l = text

        tokens = clip.tokenize(text_g)
        tokens["l"] = clip.tokenize(text_l)["l"]
        if len(tokens["l"]) != len(tokens["g"]):
            empty = clip.tokenize("")
            while len(tokens["l"]) < len(tokens["g"]):
                tokens["l"] += empty["l"]
            while len(tokens["l"]) > len(tokens["g"]):
                tokens["g"] += empty["g"]
        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {"pooled_output": pooled, "width": width, "height": height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]], )

```
