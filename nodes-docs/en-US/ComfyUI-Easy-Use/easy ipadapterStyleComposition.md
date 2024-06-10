---
tags:
- IPAdapter
---

# Easy Apply IPAdapter (StyleComposition)
## Documentation
- Class name: `easy ipadapterStyleComposition`
- Category: `EasyUse/Adapter`
- Output node: `False`

The `easy ipadapterStyleComposition` node facilitates the application of style and composition adjustments to images using an IPAdapter. It abstracts complex processes into an easier interface, enabling users to modify image aesthetics and composition through predefined or custom settings.
## Input types
### Required
- **`model`**
    - The model to which the IPAdapter style and composition adjustments will be applied, serving as the foundation for the modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`image_style`**
    - Specifies the style image used for style transfer or composition adjustments, providing a visual reference for the desired aesthetic.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`preset`**
    - A predefined configuration that sets the baseline for style and composition adjustments, simplifying the selection process for users.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_style`**
    - Determines the intensity of the style adjustment applied to the image, allowing for nuanced control over the aesthetic outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_composition`**
    - Controls the degree of composition adjustment, enabling users to fine-tune how elements are blended or arranged.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`expand_style`**
    - A boolean flag that indicates whether to apply the style adjustments more broadly or restrictively across the image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`combine_embeds`**
    - Defines the method for combining multiple embeddings or adjustments, such as concatenation or averaging, to achieve the desired effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Specifies the starting point for applying adjustments, allowing for targeted modifications within the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Defines the endpoint for adjustment application, enabling precise control over the area of effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Adjusts the scaling of embeddings to influence the strength and impact of style and composition adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cache_mode`**
    - Sets the caching strategy for the node, optimizing performance and resource usage based on the selected mode.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_composition`**
    - Optional. The image used for composition adjustments, providing an additional layer for blending or arrangement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`image_negative`**
    - Optional. An image that represents undesired aesthetic elements, guiding the adjustment process away from these characteristics.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`attn_mask`**
    - Optional. A mask that highlights specific areas of the image for focused adjustments, enhancing the precision of the application.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`clip_vision`**
    - Optional. Incorporates vision embeddings from CLIP models to guide the style and composition adjustments, enriching the contextual understanding.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`optional_ipadapter`**
    - Optional. Specifies an IPAdapter for advanced customization and control over the adjustment process, offering extended capabilities beyond presets.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with applied style and composition adjustments, reflecting the desired aesthetic changes.
    - Python dtype: `str`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The IPAdapter instance used for the adjustments, encapsulating the specific configurations and modifications made.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterStyleComposition(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        normal_presets = ipa_cls.normal_presets
        weight_types = ipa_cls.weight_types
        return {
            "required": {
                "model": ("MODEL",),
                "image_style": ("IMAGE",),
                "preset": (normal_presets,),
                "weight_style": ("FLOAT", {"default": 1.0, "min": -1, "max": 5, "step": 0.05}),
                "weight_composition": ("FLOAT", {"default": 1.0, "min": -1, "max": 5, "step": 0.05}),
                "expand_style": ("BOOLEAN", {"default": False}),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"], {"default": "average"}),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],),
                "cache_mode": (["insightface only", "clip_vision only", "ipadapter only", "all", "none"],
                               {"default": "insightface only"},),
            },
            "optional": {
                "image_composition": ("IMAGE",),
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
                "optional_ipadapter": ("IPADAPTER",),
            }
        }

    CATEGORY = "EasyUse/Adapter"

    RETURN_TYPES = ("MODEL", "IPADAPTER",)
    RETURN_NAMES = ("model", "ipadapter",)
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, model, preset, weight_style, weight_composition, expand_style, combine_embeds, start_at, end_at, embeds_scaling, cache_mode, image_style=None , image_composition=None, image_negative=None, clip_vision=None, attn_mask=None, optional_ipadapter=None):
        model, ipadapter = self.load_model(model, preset, 0, 'CPU', clip_vision=None, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)

        if "IPAdapterAdvanced" not in ALL_NODE_CLASS_MAPPINGS:
            self.error()
        cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterAdvanced"]

        model, image = cls().apply_ipadapter(model, ipadapter, start_at=start_at, end_at=end_at, weight_style=weight_style, weight_composition=weight_composition, weight_type='linear', combine_embeds=combine_embeds, weight_faceidv2=weight_composition, image_style=image_style, image_composition=image_composition, image_negative=image_negative, expand_style=expand_style, clip_vision=clip_vision, attn_mask=attn_mask, insightface=None, embeds_scaling=embeds_scaling)
        return (model, ipadapter)

```
