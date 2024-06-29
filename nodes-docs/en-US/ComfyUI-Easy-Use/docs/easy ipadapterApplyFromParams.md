---
tags:
- IPAdapter
---

# Easy Apply IPAdapter (From Params)
## Documentation
- Class name: `easy ipadapterApplyFromParams`
- Category: `EasyUse/Adapter`
- Output node: `False`

This node facilitates the application of IPAdapter parameters to a model, streamlining the process of integrating and customizing image processing adaptations. It abstracts the complexity of applying various IPAdapter configurations, making it easier for users to enhance their models with advanced image manipulation capabilities.
## Input types
### Required
- **`model`**
    - The model to which the IPAdapter parameters will be applied. It serves as the base for further image processing enhancements.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`preset`**
    - Specifies the preset configuration for the IPAdapter application, influencing the adaptation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ipadapter_params`**
    - A collection of parameters and configurations for the IPAdapter, detailing how image processing should be adapted.
    - Comfy dtype: `IPADAPTER_PARAMS`
    - Python dtype: `dict`
- **`combine_embeds`**
    - Determines how embeddings are combined during the adaptation process, affecting the final image output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`embeds_scaling`**
    - Defines how embeddings are scaled, impacting the adaptation's influence on the image processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cache_mode`**
    - Controls the caching behavior during the adaptation process, optimizing performance and resource usage.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`optional_ipadapter`**
    - An optional IPAdapter instance that can be applied in addition to the primary adapter, for layered adaptations.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `Optional[torch.nn.Module]`
- **`image_negative`**
    - Optional negative image embeddings to be applied, offering a way to negate certain attributes in the model's output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model with applied IPAdapter parameters, ready for further processing or utilization.
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The IPAdapter instance after application to the model, reflecting the updated configurations and parameters.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApplyFromParams(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        normal_presets = ipa_cls.normal_presets
        return {
            "required": {
                "model": ("MODEL",),
                "preset": (normal_presets,),
                "ipadapter_params": ("IPADAPTER_PARAMS",),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average", "max", "min"],),
                "embeds_scaling": (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],),
                "cache_mode": (["insightface only", "clip_vision only", "ipadapter only", "all", "none"],
                               {"default": "insightface only"},{"default":"none"}),
            },

            "optional": {
                "optional_ipadapter": ("IPADAPTER",),
                "image_negative": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("MODEL", "IPADAPTER",)
    RETURN_NAMES = ("model", "ipadapter", )
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, model, preset, ipadapter_params, combine_embeds, embeds_scaling, cache_mode, optional_ipadapter=None, image_negative=None,):
        model, ipadapter = self.load_model(model, preset, 0, 'CPU', clip_vision=None, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)
        if "IPAdapterFromParams" not in ALL_NODE_CLASS_MAPPINGS:
            self.error()
        cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterFromParams"]
        model, image = cls().apply_ipadapter(model, ipadapter, clip_vision=None, combine_embeds=combine_embeds, embeds_scaling=embeds_scaling, image_negative=image_negative, ipadapter_params=ipadapter_params)

        return (model, ipadapter)

```
