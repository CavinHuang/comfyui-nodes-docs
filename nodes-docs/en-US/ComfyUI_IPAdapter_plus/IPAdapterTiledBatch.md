---
tags:
- IPAdapter
---

# IPAdapter Tiled Batch
## Documentation
- Class name: `IPAdapterTiledBatch`
- Category: `ipadapter/tiled`
- Output node: `False`

The IPAdapterTiledBatch node is designed to apply image processing adaptations in a batched, tiled manner to images, leveraging an underlying IPAdapter model. It enhances image processing by unfolding batches for more efficient computation, particularly suitable for handling large images or multiple image segments simultaneously.
## Input types
### Required
- **`model`**
    - Specifies the model to which the IPAdapter modifications will be applied, serving as the foundation for the image processing tasks.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`ipadapter`**
    - Defines the IPAdapter to be used for processing the images, indicating the specific adaptation logic to apply.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `IPADAPTER`
- **`image`**
    - The image to be processed, which can be segmented into tiles for batch processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`weight`**
    - A floating-point value that influences the adaptation process, potentially altering the intensity or effect of the applied adaptations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Determines the type of weighting applied during the adaptation process, affecting how the modifications are calculated and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `WEIGHT_TYPES`
- **`start_at`**
    - A floating-point value indicating the starting point of the adaptation effect, allowing for gradual application over the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - A floating-point value indicating the end point of the adaptation effect, enabling precise control over where the adaptations cease.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sharpening`**
    - A floating-point value that adjusts the sharpness of the image, enhancing detail and clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Specifies the approach to scaling embeddings during the adaptation process, impacting the adaptation's effect on the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_negative`**
    - An optional negative image input that can be used to specify areas of the image to be de-emphasized or altered in contrast to the primary image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`attn_mask`**
    - An optional attention mask that can be applied to focus or defocus certain areas of the image during the adaptation process.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
- **`clip_vision`**
    - An optional CLIP vision model input that can be used to guide the adaptation process based on visual concepts.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `CLIP_VISION`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The modified model after applying the IPAdapter adaptations.
    - Python dtype: `MODEL`
- **`tiles`**
    - Comfy dtype: `IMAGE`
    - The processed image tiles resulting from the batched, tiled adaptation process.
    - Python dtype: `List[IMAGE]`
- **`masks`**
    - Comfy dtype: `MASK`
    - The masks applied to each tile during the adaptation process, indicating areas of focus or alteration.
    - Python dtype: `List[MASK]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterTiledBatch(IPAdapterTiled):
    def __init__(self):
        self.unfold_batch = True

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image": ("IMAGE",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 3, "step": 0.05 }),
                "weight_type": (WEIGHT_TYPES, ),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
            }
        }

```
