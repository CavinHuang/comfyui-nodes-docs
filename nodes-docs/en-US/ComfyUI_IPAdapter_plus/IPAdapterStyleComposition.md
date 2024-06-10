---
tags:
- IPAdapter
---

# IPAdapter Style & Composition SDXL
## Documentation
- Class name: `IPAdapterStyleComposition`
- Category: `ipadapter/style_composition`
- Output node: `False`

This node specializes in the application of style and composition adjustments to images using IP adapters, enabling the enhancement or alteration of visual elements through advanced image processing techniques.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for the style and composition adjustments, serving as the foundation for the image processing operations.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IP adapter to be utilized for applying the style and composition adjustments to the images.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image_style`**
    - The image to which the style adjustments will be applied, dictating the aesthetic direction of the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`image_composition`**
    - The image to which the composition adjustments will be applied, influencing the structural aspects of the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`weight_style`**
    - Determines the intensity of the style adjustments, affecting the degree to which the style influences the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_composition`**
    - Controls the intensity of the composition adjustments, impacting how significantly the composition alters the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`expand_style`**
    - A boolean flag that, when true, expands the influence of style adjustments beyond their typical scope, potentially leading to more pronounced stylistic changes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`combine_embeds`**
    - Specifies the method for combining embeddings from different sources, affecting how style and composition adjustments are integrated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Defines the starting point in the process for applying adjustments, allowing for precise control over when the style and composition changes begin to take effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Sets the endpoint in the process for applying adjustments, determining when the style and composition changes cease to influence the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Dictates the approach to scaling embeddings, influencing how adjustments are calibrated and applied to the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_negative`**
    - An optional image that represents undesired elements or styles, guiding the adjustments away from these characteristics.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`attn_mask`**
    - An optional mask that can be applied to focus or restrict adjustments to specific areas of the image, enhancing precision.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`clip_vision`**
    - An optional parameter that, when provided, utilizes CLIP vision models to further refine the style and composition adjustments based on semantic understanding.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after applying style and composition adjustments, reflecting the changes made to the visual elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterStyleComposition(IPAdapterAdvanced):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image_style": ("IMAGE",),
                "image_composition": ("IMAGE",),
                "weight_style": ("FLOAT", { "default": 1.0, "min": -1, "max": 5, "step": 0.05 }),
                "weight_composition": ("FLOAT", { "default": 1.0, "min": -1, "max": 5, "step": 0.05 }),
                "expand_style": ("BOOLEAN", { "default": False }),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"], {"default": "average"}),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

    CATEGORY = "ipadapter/style_composition"

```
