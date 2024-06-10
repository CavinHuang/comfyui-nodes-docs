# SDXL Prompt Encoder (Searge)
## Documentation
- Class name: `SeargeSDXLPromptEncoder`
- Category: `Searge/_deprecated_/ClipEncoding`
- Output node: `False`

The SeargeSDXLPromptEncoder node is designed to encode prompts for the SDXL model, facilitating the generation of text prompts that are optimized for image synthesis tasks. It supports the encoding of both base and refined prompts, enabling users to fine-tune the prompt details for more precise image generation outcomes.
## Input types
### Required
- **`base_clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`refiner_clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`pos_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`pos_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`pos_r`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`neg_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`neg_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`neg_r`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`base_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`base_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop_w`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop_h`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`pos_ascore`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`neg_ascore`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`refiner_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`refiner_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`base_positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`base_negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLPromptEncoder:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_clip": ("CLIP",),
            "refiner_clip": ("CLIP",),
            "pos_g": ("STRING", {"multiline": True, "default": "POS_G"}),
            "pos_l": ("STRING", {"multiline": True, "default": "POS_L"}),
            "pos_r": ("STRING", {"multiline": True, "default": "POS_R"}),
            "neg_g": ("STRING", {"multiline": True, "default": "NEG_G"}),
            "neg_l": ("STRING", {"multiline": True, "default": "NEG_L"}),
            "neg_r": ("STRING", {"multiline": True, "default": "NEG_R"}),
            "base_width": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "base_height": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "crop_w": ("INT", {"default": 0, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "crop_h": ("INT", {"default": 0, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "target_width": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "target_height": ("INT", {"default": 4096, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "pos_ascore": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            "neg_ascore": ("FLOAT", {"default": 2.5, "min": 0.0, "max": 1000.0, "step": 0.01}),
            "refiner_width": ("INT", {"default": 2048, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "refiner_height": ("INT", {"default": 2048, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
        },
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("base_positive", "base_negative", "refiner_positive", "refiner_negative",)
    FUNCTION = "encode"

    CATEGORY = "Searge/_deprecated_/ClipEncoding"

    def encode(self, base_clip, refiner_clip, pos_g, pos_l, pos_r, neg_g, neg_l, neg_r, base_width, base_height,
               crop_w, crop_h, target_width, target_height, pos_ascore, neg_ascore, refiner_width, refiner_height):

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

        # positive refiner prompt
        tokens3 = refiner_clip.tokenize(pos_r)
        cond3, pooled3 = refiner_clip.encode_from_tokens(tokens3, return_pooled=True)
        res3 = [[cond3, {"pooled_output": pooled3, "aesthetic_score": pos_ascore, "width": refiner_width,
                         "height": refiner_height}]]

        # negative refiner prompt
        tokens4 = refiner_clip.tokenize(neg_r)
        cond4, pooled4 = refiner_clip.encode_from_tokens(tokens4, return_pooled=True)
        res4 = [[cond4, {"pooled_output": pooled4, "aesthetic_score": neg_ascore, "width": refiner_width,
                         "height": refiner_height}]]

        return (res1, res2, res3, res4,)

```
