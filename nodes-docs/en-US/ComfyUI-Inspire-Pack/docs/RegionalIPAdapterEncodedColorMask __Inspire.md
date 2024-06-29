---
tags:
- IPAdapter
- RegionalImageProcessing
---

# Regional IPAdapter Encoded By Color Mask (Inspire)
## Documentation
- Class name: `RegionalIPAdapterEncodedColorMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node specializes in applying regional image processing adaptations based on encoded color masks. It integrates specific color-based mask regions with embedding adjustments, allowing for targeted image modifications that respect the spatial and color-based constraints defined by the user.
## Input types
### Required
- **`color_mask`**
    - The color mask image used to define regions for adaptation. It serves as a spatial guide for where the adaptations should be applied, based on color matching.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask_color`**
    - A string specifying the color used in the color mask to identify the regions of interest. This color acts as a key to isolate specific areas for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`embeds`**
    - Embeddings that represent the desired adjustments or effects to be applied within the specified regions. These embeddings guide the adaptation process.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - A float value that determines the intensity or influence of the embeddings on the adaptation process. It modulates how strongly the specified adjustments are applied.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Specifies the method of applying weights to the embeddings, offering options like original, linear, or channel penalty to fine-tune the adaptation effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`start_at`**
    - A float indicating the start point (in terms of progression through layers or steps) for applying the adaptations, allowing for phased or gradual application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - A float indicating the end point for the adaptation application, enabling precise control over the extent of the modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unfold_batch`**
    - A boolean indicating whether to unfold the batch for processing, affecting how adaptations are applied across multiple instances.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`neg_embeds`**
    - Optional embeddings that represent negative adjustments or effects, providing a means to specify adaptations that should be avoided or counteracted within the regions.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
## Output types
- **`regional_ipadapter`**
    - Comfy dtype: `REGIONAL_IPADAPTER`
    - The result of the regional image processing adaptation, incorporating the specified embeddings and adjustments within the defined color mask regions.
    - Python dtype: `IPAdapterConditioning`
- **`mask`**
    - Comfy dtype: `MASK`
    - The processed mask that was used to guide the adaptations, potentially altered based on the specified color and regions of interest.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterEncodedColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),

                "embeds": ("EMBEDS",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "weight_type": (["original", "linear", "channel penalty"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "neg_embeds": ("EMBEDS",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, neg_embeds=None):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, neg_embeds=neg_embeds)
        return (cond, mask)

```
