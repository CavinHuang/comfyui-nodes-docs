
# Documentation
- Class name: easy ipadapterApplyFromParams
- Category: EasyUse/Adapter
- Output node: False

该节点能够方便地将IPAdapter参数应用到模型中，简化了集成和定制图像处理适配的过程。它抽象了应用各种IPAdapter配置的复杂性，使用户能够更轻松地用高级图像处理能力增强他们的模型。

# Input types
## Required
- model
    - 将要应用IPAdapter参数的模型。它作为进一步图像处理增强的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- preset
    - 指定IPAdapter应用的预设配置，影响适配过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ipadapter_params
    - IPAdapter的参数和配置集合，详细说明了如何调整图像处理。
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: dict
- combine_embeds
    - 决定在适配过程中如何组合嵌入，影响最终的图像输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- embeds_scaling
    - 定义如何缩放嵌入，影响适配对图像处理的作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cache_mode
    - 控制适配过程中的缓存行为，优化性能和资源使用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- optional_ipadapter
    - 可选的IPAdapter实例，可以在主适配器之外额外应用，用于分层适配。
    - Comfy dtype: IPADAPTER
    - Python dtype: Optional[torch.nn.Module]
- image_negative
    - 可选的负面图像嵌入，提供了一种在模型输出中消除某些属性的方法。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]

# Output types
- model
    - 应用了IPAdapter参数的增强模型，可以进行进一步处理或使用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - 应用到模型后的IPAdapter实例，反映了更新后的配置和参数。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.nn.Module


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
