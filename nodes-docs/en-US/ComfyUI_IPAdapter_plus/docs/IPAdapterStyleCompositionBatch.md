---
tags:
- IPAdapter
---

# IPAdapter Style & Composition Batch SDXL
## Documentation
- Class name: `IPAdapterStyleCompositionBatch`
- Category: `ipadapter/style_composition`
- Output node: `False`

The IPAdapterStyleCompositionBatch node is designed for advanced image processing, specifically focusing on blending and enhancing images through style and composition adjustments. It extends the capabilities of IPAdapterStyleComposition by allowing batch processing, enabling efficient handling of multiple images simultaneously.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for the image processing task, serving as the core computational element.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IPAdapter to be utilized, which is a key component in the image processing pipeline.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image_style`**
    - The image to be used as the style reference in the composition process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`image_composition`**
    - The image to be used for composition, acting as the base for style application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`weight_style`**
    - Determines the influence of the style image on the final output, allowing for fine-tuned control over the style intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_composition`**
    - Controls the impact of the composition image on the final result, enabling precise adjustment of the composition effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`expand_style`**
    - A boolean flag that, when set to true, expands the style application across the composition, offering a broader stylistic influence.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_at`**
    - Defines the starting point of the effect application in the processing sequence, allowing for staged integration of styles and compositions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Sets the endpoint for the effect application, providing a boundary for style and composition adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Specifies the method for scaling embeddings, which influences how style and composition features are integrated into the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`image_negative`**
    - An optional image that serves as a negative influence, reducing its stylistic or compositional features in the final output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`attn_mask`**
    - An optional mask that directs attention to specific areas of the image, enhancing or diminishing effects accordingly.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`clip_vision`**
    - Optionally integrates CLIP vision models to refine the style and composition effects based on semantic understanding.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after processing the images with style and composition adjustments.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterStyleCompositionBatch(IPAdapterStyleComposition):
    def __init__(self):
        self.unfold_batch = True

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

```
