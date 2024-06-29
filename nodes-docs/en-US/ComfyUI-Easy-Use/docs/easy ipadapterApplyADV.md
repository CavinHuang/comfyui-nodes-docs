---
tags:
- IPAdapter
---

# Easy Apply IPAdapter (Advanced)
## Documentation
- Class name: `easy ipadapterApplyADV`
- Category: `EasyUse/Adapter`
- Output node: `False`

This node specializes in applying advanced IPAdapter configurations to models, enhancing their capabilities with custom image processing and adaptation strategies. It leverages IPAdapter to modify and fine-tune model behaviors based on specific image attributes, presets, and adaptation parameters, aiming to achieve optimal integration and performance for specialized tasks.
## Input types
### Required
- **`model`**
    - The model to which the IPAdapter will be applied, serving as the base for further adaptations.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The image to be processed or adapted by the IPAdapter, acting as a key input for the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`preset`**
    - A predefined configuration or set of parameters that dictate how the IPAdapter should modify the model, tailoring its behavior to specific needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_strength`**
    - Specifies the strength of the LoRA model adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`provider`**
    - Defines the computation provider for the operation, such as CPU or GPU.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - The weight factor for the adaptation process, influencing how the IPAdapter modifies the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_faceidv2`**
    - Specific weight adjustment for FaceID v2 features within the adaptation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Specifies the type of weighting method used in the adaptation process, such as linear or non-linear.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`combine_embeds`**
    - Describes how multiple embeddings are combined during the adaptation process, e.g., concatenation or averaging.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Defines the starting point of the adaptation effect on the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Specifies the end point of the adaptation effect on the model, allowing for precise control over the adaptation range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`embeds_scaling`**
    - Defines how embeddings are scaled or adjusted during the adaptation, influencing the final output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cache_mode`**
    - Determines the caching strategy for the adaptation process, affecting performance and resource utilization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_tiled`**
    - Indicates whether a tiled adaptation approach should be used, affecting the processing of large images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`use_batch`**
    - Indicates whether batch processing is utilized for efficiency in handling multiple images or data points.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`sharpening`**
    - Specifies the level of sharpening applied to the adapted images, enhancing clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`image_negative`**
    - An optional negative image input for the adaptation process, used to negate certain features or effects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`attn_mask`**
    - An optional attention mask to focus or ignore specific parts of the image during adaptation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`clip_vision`**
    - Optional CLIP vision model input to guide the adaptation process based on visual concepts.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.nn.Module`
- **`optional_ipadapter`**
    - An optional IPAdapter instance to be used in conjunction with the primary adaptation process.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `CustomIPAdapterType`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after applying the IPAdapter, showcasing enhanced or altered capabilities.
    - Python dtype: `torch.nn.Module`
- **`images`**
    - Comfy dtype: `IMAGE`
    - The images resulting from the adaptation process, potentially modified or enhanced.
    - Python dtype: `List[PIL.Image]`
- **`masks`**
    - Comfy dtype: `MASK`
    - The masks generated during the adaptation process, used for focusing or excluding specific image areas.
    - Python dtype: `List[Optional[PIL.Image]]`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The IPAdapter instance used for the adaptation, encapsulating the specific configurations applied.
    - Python dtype: `CustomIPAdapterType`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApplyAdvanced(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        presets = ipa_cls.presets
        weight_types = ipa_cls.weight_types
        return {
            "required": {
                "model": ("MODEL",),
                "image": ("IMAGE",),
                "preset": (presets,),
                "lora_strength": ("FLOAT", {"default": 0.6, "min": 0, "max": 1, "step": 0.01}),
                "provider": (["CPU", "CUDA", "ROCM", "DirectML", "OpenVINO", "CoreML"],),
                "weight": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "weight_faceidv2": ("FLOAT", {"default": 1.0, "min": -1, "max": 5.0, "step": 0.05 }),
                "weight_type": (weight_types,),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],),
                "cache_mode": (["insightface only", "clip_vision only","ipadapter only", "all", "none"], {"default": "insightface only"},),
                "use_tiled": ("BOOLEAN", {"default": False},),
                "use_batch": ("BOOLEAN", {"default": False},),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05}),
            },

            "optional": {
                "image_negative": ("IMAGE",),
                "attn_mask": ("MASK",),
                "clip_vision": ("CLIP_VISION",),
                "optional_ipadapter": ("IPADAPTER",),
            }
        }

    RETURN_TYPES = ("MODEL", "IMAGE", "MASK", "IPADAPTER",)
    RETURN_NAMES = ("model", "images", "masks", "ipadapter", )
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, model, image, preset, lora_strength, provider, weight, weight_faceidv2, weight_type, combine_embeds, start_at, end_at, embeds_scaling, cache_mode, use_tiled, use_batch, sharpening, weight_style=1.0, weight_composition=1.0, image_style=None, image_composition=None, expand_style=False, image_negative=None, clip_vision=None, attn_mask=None, optional_ipadapter=None):
        images, masks = image, [None]
        model, ipadapter = self.load_model(model, preset, lora_strength, provider, clip_vision=clip_vision, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)
        if use_tiled:
            if use_batch:
                if "IPAdapterTiledBatch" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterTiledBatch"]
            else:
                if "IPAdapterTiled" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterTiled"]
            model, images, masks = cls().apply_tiled(model, ipadapter, image=image, weight=weight, weight_type=weight_type, start_at=start_at, end_at=end_at, sharpening=sharpening, combine_embeds=combine_embeds, image_negative=image_negative, attn_mask=attn_mask, clip_vision=clip_vision, embeds_scaling=embeds_scaling)
        else:
            if use_batch:
                if "IPAdapterBatch" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterBatch"]
            else:
                if "IPAdapterAdvanced" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterAdvanced"]
            model, images = cls().apply_ipadapter(model, ipadapter, weight=weight, weight_type=weight_type, start_at=start_at, end_at=end_at, combine_embeds=combine_embeds, weight_faceidv2=weight_faceidv2, image=image, image_negative=image_negative, weight_style=1.0, weight_composition=1.0, image_style=image_style, image_composition=image_composition, expand_style=expand_style, clip_vision=clip_vision, attn_mask=attn_mask, insightface=None, embeds_scaling=embeds_scaling)
        if images is None:
            images = image
        return (model, images, masks, ipadapter)

```
