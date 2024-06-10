---
tags:
- IPAdapter
---

# IPAdapter Mad Scientist
## Documentation
- Class name: `IPAdapterMS`
- Category: `ipadapter/dev`
- Output node: `False`

The IPAdapterMS node is designed for advanced image processing and manipulation, integrating multiple image adaptation techniques. It allows for the customization and combination of embeddings, weights, and image attributes to achieve specific visual outcomes.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for image processing, central to the node's operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`ipadapter`**
    - Defines the IPAdapter to be applied, determining the specific adaptation or transformation technique.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image`**
    - The input image to be processed or transformed by the node.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`weight`**
    - A float value that adjusts the overall impact of the IPAdapter on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_faceidv2`**
    - Adjusts the influence of FaceID v2 features in the image adaptation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Determines the method of weight application, affecting the adaptation's intensity and areas.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`combine_embeds`**
    - Specifies how multiple embeddings should be combined, influencing the final image output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`start_at`**
    - A float value indicating the starting point of the adaptation effect within the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - A float value indicating the end point of the adaptation effect within the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Defines how embeddings are scaled, affecting the adaptation's emphasis on certain image features.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`layer_weights`**
    - A string specifying custom weights for different layers, allowing for fine-tuned image adaptation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_negative`**
    - An optional negative image input for contrastive adaptation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`attn_mask`**
    - An optional attention mask to focus or exclude specific areas of the image during adaptation.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`clip_vision`**
    - Optional CLIP vision model input to enhance image adaptation with visual context.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`insightface`**
    - Optional InsightFace model input for advanced facial feature adaptation.
    - Comfy dtype: `INSIGHTFACE`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The adapted model after processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterMS(IPAdapterAdvanced):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image": ("IMAGE",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 5, "step": 0.05 }),
                "weight_faceidv2": ("FLOAT", { "default": 1.0, "min": -1, "max": 5.0, "step": 0.05 }),
                "weight_type": (WEIGHT_TYPES, ),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'], ),
                "layer_weights": ("STRING", { "default": "", "multiline": True }),
            },
            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
                "insightface": ("INSIGHTFACE",),
            }
        }

    CATEGORY = "ipadapter/dev"

```
