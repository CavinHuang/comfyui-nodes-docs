---
tags:
- IPAdapter
---

# Easy Apply IPAdapter
## Documentation
- Class name: `easy ipadapterApply`
- Category: `EasyUse/Adapter`
- Output node: `False`

The 'easy ipadapterApply' node is designed to seamlessly integrate and apply IPAdapter models to a given input model, enhancing its capabilities with additional features or adjustments specific to the IPAdapter's functionality. This process involves loading and caching IPAdapter models, potentially alongside other models like LoRA or InsightFace, depending on the configuration, to augment the original model's performance or features.
## Input types
### Required
- **`model`**
    - The base model to which the IPAdapter will be applied, serving as the foundation for the enhancement process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The image data to which the IPAdapter adjustments will be applied, serving as input for the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`preset`**
    - A preset configuration that determines how the IPAdapter is applied, influencing the adaptation process and the resulting model enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_strength`**
    - Specifies the strength of the LoRA model adjustments, if applicable, to the adaptation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`provider`**
    - The computing provider for the IPAdapter application, affecting performance and compatibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight`**
    - A weight parameter influencing the adaptation process by the IPAdapter.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_faceidv2`**
    - A specific weight parameter for FaceID v2 adjustments within the IPAdapter application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Defines the starting point of the adaptation process within the model, influencing the scope of adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Defines the ending point of the adaptation process within the model, setting the limit for adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cache_mode`**
    - Specifies the caching strategy for the IPAdapter and potentially other models, optimizing performance and resource utilization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_tiled`**
    - A boolean flag indicating whether the adaptation process should use a tiled approach for processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`attn_mask`**
    - An optional attention mask for more focused or restricted adaptation by the IPAdapter.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`optional_ipadapter`**
    - An optional IPAdapter model that can be provided to override the default IPAdapter selection, allowing for more customized adaptations.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `IPAdapter`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model, after the application of the IPAdapter, showcasing improved or additional features.
    - Python dtype: `torch.nn.Module`
- **`images`**
    - Comfy dtype: `IMAGE`
    - The images resulting from the adaptation process, potentially modified or enhanced.
    - Python dtype: `List[torch.Tensor]`
- **`masks`**
    - Comfy dtype: `MASK`
    - The masks generated or used during the adaptation process, providing additional control or focus.
    - Python dtype: `List[torch.Tensor]`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The IPAdapter model that was applied to the base model, detailing the specific enhancements made.
    - Python dtype: `IPAdapter`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApply(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        presets = cls().presets
        return {
            "required": {
                "model": ("MODEL",),
                "image": ("IMAGE",),
                "preset": (presets,),
                "lora_strength": ("FLOAT", {"default": 0.6, "min": 0, "max": 1, "step": 0.01}),
                "provider": (["CPU", "CUDA", "ROCM", "DirectML", "OpenVINO", "CoreML"],),
                "weight": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "weight_faceidv2": ("FLOAT", { "default": 1.0, "min": -1, "max": 5.0, "step": 0.05 }),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "cache_mode": (["insightface only", "clip_vision only", "ipadapter only", "all", "none"], {"default": "insightface only"},),
                "use_tiled": ("BOOLEAN", {"default": False},),
            },

            "optional": {
                "attn_mask": ("MASK",),
                "optional_ipadapter": ("IPADAPTER",),
            }
        }

    RETURN_TYPES = ("MODEL", "IMAGE", "MASK", "IPADAPTER",)
    RETURN_NAMES = ("model", "images", "masks", "ipadapter", )
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, model, image, preset, lora_strength, provider, weight, weight_faceidv2, start_at, end_at, cache_mode, use_tiled, attn_mask=None, optional_ipadapter=None):
        images, masks = image, [None]
        model, ipadapter = self.load_model(model, preset, lora_strength, provider, clip_vision=None, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)
        if use_tiled and preset not in self.faceid_presets:
            if "IPAdapterTiled" not in ALL_NODE_CLASS_MAPPINGS:
                self.error()
            cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterTiled"]
            model, images, masks = cls().apply_tiled(model, ipadapter, image, weight, "linear", start_at, end_at, sharpening=0.0, combine_embeds="concat", image_negative=None, attn_mask=attn_mask, clip_vision=None, embeds_scaling='V only')
        else:
            if preset in ['FACEID PLUS V2', 'FACEID PORTRAIT (style transfer)']:
                if "IPAdapterAdvanced" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterAdvanced"]
                model, images = cls().apply_ipadapter(model, ipadapter, start_at=start_at, end_at=end_at, weight=weight, weight_type="linear", combine_embeds="concat", weight_faceidv2=weight_faceidv2, image=image, image_negative=None, clip_vision=None, attn_mask=attn_mask, insightface=None, embeds_scaling='V only')
            else:
                if "IPAdapter" not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS["IPAdapter"]
                model, images = cls().apply_ipadapter(model, ipadapter, image, weight, start_at, end_at, weight_type='standard', attn_mask=attn_mask)
        if images is None:
            images = image
        return (model, images, masks, ipadapter,)

```
