# SDXL Base Prompt Encoder (Searge)
## Documentation
- Class name: `SeargeSDXLBasePromptEncoder`
- Category: `Searge/_deprecated_/ClipEncoding`
- Output node: `False`

The SeargeSDXLBasePromptEncoder node is designed to encode base prompts for the SDXL model, focusing on converting textual descriptions into a format suitable for further processing or generation tasks. It serves as a foundational component in the pipeline, preparing the input for more specialized encoding or refinement stages.
## Input types
### Required
- **`base_clip`**
    - Serves as the primary input for the encoding process, representing the base CLIP model used to encode the prompts.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`pos_g`**
    - Represents the global positive textual content to be encoded, crucial for guiding the model's generation towards desired attributes or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pos_l`**
    - Specifies local positive textual content, complementing the global positive content to refine the encoding process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg_g`**
    - Represents the global negative textual content, used to steer the model away from undesired attributes or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg_l`**
    - Specifies local negative textual content, complementing the global negative content to refine the encoding process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`base_width`**
    - Defines the width of the base image for encoding, affecting the spatial dimensions of the encoded output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`base_height`**
    - Defines the height of the base image for encoding, affecting the spatial dimensions of the encoded output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - Specifies the width of the crop area, allowing for focused encoding on a specific region of the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Specifies the height of the crop area, allowing for focused encoding on a specific region of the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - Determines the target width for the encoded output, influencing the resolution of the generation task.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Determines the target height for the encoded output, influencing the resolution of the generation task.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`base_positive`**
    - Comfy dtype: `CONDITIONING`
    - The encoded positive prompt, ready for further processing or direct use in generation tasks.
    - Python dtype: `CONDITIONING`
- **`base_negative`**
    - Comfy dtype: `CONDITIONING`
    - The encoded negative prompt, prepared for use in guiding the model away from undesired outputs.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLBasePromptEncoder:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_clip": ("CLIP",),
            "pos_g": ("STRING", {"multiline": True, "default": "POS_G"}),
            "pos_l": ("STRING", {"multiline": True, "default": "POS_L"}),
            "neg_g": ("STRING", {"multiline": True, "default": "NEG_G"}),
            "neg_l": ("STRING", {"multiline": True, "default": "NEG_L"}),
            "base_width": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "base_height": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "crop_w": ("INT", {"default": 0, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "crop_h": ("INT", {"default": 0, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "target_width": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "target_height": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
        },
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("base_positive", "base_negative",)
    FUNCTION = "encode"

    CATEGORY = "Searge/_deprecated_/ClipEncoding"

    def encode(self, base_clip, pos_g, pos_l, neg_g, neg_l, base_width, base_height, crop_w, crop_h, target_width,
               target_height):

        empty = base_clip.tokenize("")

        # positive base prompt
        tokens1 = base_clip.tokenize(pos_g)
        tokens1["l"] = base_clip.tokenize(pos_l)["l"]

        if len(tokens1["l"]) != len(tokens1["g"]):
            while len(tokens1["l"]) < len(tokens1["g"]):
                tokens1["l"] += empty["l"]
            while len(tokens1["l"]) > len(tokens1["g"]):
                tokens1["g"] += empty["g"]

        cond1, pooled1 = base_clip.encode_from_tokens(tokens1, return_pooled=True)
        res1 = [[cond1, {"pooled_output": pooled1, "width": base_width, "height": base_height, "crop_w": crop_w,
                         "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        # negative base prompt
        tokens2 = base_clip.tokenize(neg_g)
        tokens2["l"] = base_clip.tokenize(neg_l)["l"]

        if len(tokens2["l"]) != len(tokens2["g"]):
            while len(tokens2["l"]) < len(tokens2["g"]):
                tokens2["l"] += empty["l"]
            while len(tokens2["l"]) > len(tokens2["g"]):
                tokens2["g"] += empty["g"]

        cond2, pooled2 = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res2 = [[cond2, {"pooled_output": pooled2, "width": base_width, "height": base_height, "crop_w": crop_w,
                         "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        return (res1, res2,)

```
