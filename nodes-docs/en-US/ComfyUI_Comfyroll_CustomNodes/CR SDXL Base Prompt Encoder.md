# 🌟 CR SDXL Base Prompt Encoder
## Documentation
- Class name: `CR SDXL Base Prompt Encoder`
- Category: `🧩 Comfyroll Studio/✨ Essential/🌟 SDXL`
- Output node: `False`

The CR SDXL Base Prompt Encoder node is designed to encode base prompts for the SDXL model, providing foundational text inputs that can be further customized or mixed with other prompts. It plays a crucial role in establishing the initial context or theme for text-to-image generation tasks within the SDXL framework.
## Input types
### Required
- **`base_clip`**
    - Represents the foundational CLIP model used for encoding the base prompts, setting the initial visual-textual context for the SDXL model.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`pos_g`**
    - Positive guidance text for enhancing specific attributes or themes in the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pos_l`**
    - Localized positive guidance text for fine-tuning specific areas or aspects within the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg_g`**
    - Negative guidance text for suppressing undesired attributes or themes in the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg_l`**
    - Localized negative guidance text for reducing specific undesired areas or aspects within the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`preset`**
    - A predefined set of parameters or settings that influence the encoding process and the resulting image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`base_width`**
    - The width of the base image or context area for the encoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`base_height`**
    - The height of the base image or context area for the encoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - Width of the cropping area applied to the base context, allowing for focus on specific regions during encoding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Height of the cropping area applied to the base context, enabling emphasis on particular regions during encoding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - The target width for the output image, guiding the scaling and aspect ratio of the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - The target height for the output image, directing the scaling and aspect ratio of the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`base_positive`**
    - Comfy dtype: `CONDITIONING`
    - The encoded positive base prompt, ready for further processing or combination with other prompts for image generation.
    - Python dtype: `torch.Tensor`
- **`base_negative`**
    - Comfy dtype: `CONDITIONING`
    - The encoded negative base prompt, prepared for additional processing or merging with other prompts for image generation.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A helper output providing guidance or suggestions for optimizing the use of encoded prompts in the SDXL model.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [DetailerForEach](../../ComfyUI-Impact-Pack/Nodes/DetailerForEach.md)



## Source code
```python
class CR_SDXLBasePromptEncoder:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "base_clip": ("CLIP", ),
                    "pos_g": ("STRING", {"multiline": True, "default": "POS_G"}),
                    "pos_l": ("STRING", {"multiline": True, "default": "POS_L"}),
                    "neg_g": ("STRING", {"multiline": True, "default": "NEG_G"}),
                    "neg_l": ("STRING", {"multiline": True, "default": "NEG_L"}),
                    "preset": (["preset A", "preset B", "preset C"],), 
                    "base_width": ("INT", {"default": 4096.0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    "base_height": ("INT", {"default": 4096.0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    "crop_w": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    "crop_h": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    "target_width": ("INT", {"default": 4096.0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    "target_height": ("INT", {"default": 4096.0, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                    },
                }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "STRING", )
    RETURN_NAMES = ("base_positive", "base_negative", "show_help", )
    FUNCTION = "encode"
    CATEGORY = icons.get("Comfyroll/SDXL")

    def encode(self, base_clip, pos_g, pos_l, neg_g, neg_l, base_width, base_height, crop_w, crop_h, target_width, target_height, preset,):
        empty = base_clip.tokenize("")

        # positive prompt
        tokens1 = base_clip.tokenize(pos_g)
        tokens1["l"] = base_clip.tokenize(pos_l)["l"]

        if len(tokens1["l"]) != len(tokens1["g"]):
            while len(tokens1["l"]) < len(tokens1["g"]):
                tokens1["l"] += empty["l"]
            while len(tokens1["l"]) > len(tokens1["g"]):
                tokens1["g"] += empty["g"]

        cond1, pooled1 = base_clip.encode_from_tokens(tokens1, return_pooled=True)
        res1 = [[cond1, {"pooled_output": pooled1, "width": base_width, "height": base_height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        # negative prompt
        tokens2 = base_clip.tokenize(neg_g)
        tokens2["l"] = base_clip.tokenize(neg_l)["l"]

        if len(tokens2["l"]) != len(tokens2["g"]):
            while len(tokens2["l"]) < len(tokens2["g"]):
                tokens2["l"] += empty["l"]
            while len(tokens2["l"]) > len(tokens2["g"]):
                tokens2["g"] += empty["g"]

        cond2, pooled2 = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res2 = [[cond2, {"pooled_output": pooled2, "width": base_width, "height": base_height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        # positive style
        tokens2 = base_clip.tokenize(pos_l)
        tokens2["l"] = base_clip.tokenize(neg_l)["l"]

        if len(tokens2["l"]) != len(tokens2["g"]):
            while len(tokens2["l"]) < len(tokens2["g"]):
                tokens2["l"] += empty["l"]
            while len(tokens2["l"]) > len(tokens2["g"]):
                tokens2["g"] += empty["g"]

        cond2, pooled2 = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res3 = [[cond2, {"pooled_output": pooled2, "width": base_width, "height": base_height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        # negative style
        tokens2 = base_clip.tokenize(neg_l)
        tokens2["l"] = base_clip.tokenize(neg_l)["l"]

        if len(tokens2["l"]) != len(tokens2["g"]):
            while len(tokens2["l"]) < len(tokens2["g"]):
                tokens2["l"] += empty["l"]
            while len(tokens2["l"]) > len(tokens2["g"]):
                tokens2["g"] += empty["g"]

        cond2, pooled2 = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res4 = [[cond2, {"pooled_output": pooled2, "width": base_width, "height": base_height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]]

        if preset == "preset A":
            base_positive = res1
            base_negative = res2
        elif preset == "preset B":
            base_positive = res3
            base_negative = res4
        elif preset == "preset C":
            base_positive = res1 + res3
            base_negative = res2 + res4
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-base-prompt-encoder"
        return (base_positive, base_negative, show_help, )

```
