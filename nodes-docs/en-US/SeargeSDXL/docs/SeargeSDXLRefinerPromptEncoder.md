# SDXL Refiner Prompt Encoder (Searge)
## Documentation
- Class name: `SeargeSDXLRefinerPromptEncoder`
- Category: `Searge/_deprecated_/ClipEncoding`
- Output node: `False`

This node specializes in refining the encoding of prompts for the SDXL model by applying specific aesthetic and dimensional adjustments to both positive and negative prompts. It leverages a refiner encoder to enhance the quality and relevance of the prompts based on given aesthetic scores and dimensions, aiming to optimize the generation process.
## Input types
### Required
- **`refiner_clip`**
    - The CLIP model used for refining the encoding of prompts, central to adjusting the prompt's quality and relevance.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`pos_r`**
    - Positive text prompt for refinement, influencing the encoding process with a focus on enhancing positive aspects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg_r`**
    - Negative text prompt for refinement, influencing the encoding process with a focus on enhancing negative aspects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pos_ascore`**
    - The aesthetic score assigned to the positive prompt, influencing its refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`neg_ascore`**
    - The aesthetic score assigned to the negative prompt, influencing its refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_width`**
    - The width dimension for the refined encoding, used to adjust the spatial characteristics of the prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_height`**
    - The height dimension for the refined encoding, used to adjust the spatial characteristics of the prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - The refined encoding of the positive prompt, enhanced for better quality and relevance.
    - Python dtype: `tuple`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - The refined encoding of the negative prompt, enhanced for better quality and relevance.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLRefinerPromptEncoder:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "refiner_clip": ("CLIP",),
            "pos_r": ("STRING", {"multiline": True, "default": "POS_R"}),
            "neg_r": ("STRING", {"multiline": True, "default": "NEG_R"}),
            "pos_ascore": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            "neg_ascore": ("FLOAT", {"default": 2.5, "min": 0.0, "max": 1000.0, "step": 0.01}),
            "refiner_width": ("INT", {"default": 2048, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "refiner_height": ("INT", {"default": 2048, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
        },
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("refiner_positive", "refiner_negative",)
    FUNCTION = "encode"

    CATEGORY = "Searge/_deprecated_/ClipEncoding"

    def encode(self, refiner_clip, pos_r, neg_r, pos_ascore, neg_ascore, refiner_width, refiner_height):
        # positive refiner prompt
        tokens1 = refiner_clip.tokenize(pos_r)
        cond1, pooled1 = refiner_clip.encode_from_tokens(tokens1, return_pooled=True)
        res1 = [[cond1, {"pooled_output": pooled1, "aesthetic_score": pos_ascore, "width": refiner_width,
                         "height": refiner_height}]]

        # negative refiner prompt
        tokens2 = refiner_clip.tokenize(neg_r)
        cond2, pooled2 = refiner_clip.encode_from_tokens(tokens2, return_pooled=True)
        res2 = [[cond2, {"pooled_output": pooled2, "aesthetic_score": neg_ascore, "width": refiner_width,
                         "height": refiner_height}]]

        return (res1, res2,)

```
