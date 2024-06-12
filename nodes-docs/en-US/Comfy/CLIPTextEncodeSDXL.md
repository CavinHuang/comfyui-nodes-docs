---
tags:
- CLIP
- CLIPConditioning
- CLIPTextEncoding
- Conditioning
---

# CLIPTextEncodeSDXL
## Documentation
- Class name: `CLIPTextEncodeSDXL`
- Category: `advanced/conditioning`
- Output node: `False`

This node is designed to refine and encode text inputs using the CLIP model, specifically tailored for the SDXL architecture. It enhances textual descriptions for image generation or manipulation by incorporating aesthetic scores and dimensions, leveraging the CLIP model's understanding of text in visual contexts.
## Input types
### Required
- **`width`**
    - The desired width of the output image, affecting the aspect ratio and detail level of the generated visual content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The desired height of the output image, impacting the aspect ratio and detail resolution of the generated visuals.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - The width of the crop area from the original image, which can influence the focus area of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - The height of the crop area from the original image, affecting the focus area of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - The target width for the output image, which may differ from the original width to adjust the image's aspect ratio or detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - The target height for the output image, potentially altering the original height to adjust the image's aspect ratio or detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_g`**
    - The global textual input that provides the overall descriptive context for image generation, encoded by the CLIP model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - An instance of the CLIP model used for encoding the text input into a visual context-aware representation.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`text_l`**
    - The local textual input that provides specific details for refining the image generation, encoded by the CLIP model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning format that includes the encoded text representation along with additional metadata necessary for image generation or manipulation tasks.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - Reroute
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [Prompts Everywhere](../../cg-use-everywhere/Nodes/Prompts Everywhere.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - KRestartSamplerAdv



## Source code
```python
class CLIPTextEncodeSDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "crop_w": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
            "crop_h": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
            "target_width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "target_height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "text_g": ("STRING", {"multiline": True, "dynamicPrompts": True}), "clip": ("CLIP", ),
            "text_l": ("STRING", {"multiline": True, "dynamicPrompts": True}), "clip": ("CLIP", ),
            }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "advanced/conditioning"

    def encode(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l):
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
