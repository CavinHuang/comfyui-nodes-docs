
# Documentation
- Class name: easy ipadapterStyleComposition
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy ipadapterStyleComposition节点通过IPAdapter简化了对图像进行风格和构图调整的过程。它将复杂的处理流程抽象为更易用的界面，使用户能够通过预设或自定义设置来修改图像的美学特征和构图。

# Input types
## Required
- model
    - 将应用IPAdapter风格和构图调整的模型，作为修改的基础。
    - Comfy dtype: MODEL
    - Python dtype: str
- image_style
    - 指定用于风格迁移或构图调整的风格图像，为所需的美学效果提供视觉参考。
    - Comfy dtype: IMAGE
    - Python dtype: str
- preset
    - 预定义的配置，为风格和构图调整设置基准，简化用户的选择过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight_style
    - 决定应用于图像的风格调整强度，允许对美学效果进行细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_composition
    - 控制构图调整的程度，使用户能够微调元素的混合或排列方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- expand_style
    - 布尔标志，指示是否在图像中更广泛或限制性地应用风格调整。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- combine_embeds
    - 定义组合多个嵌入或调整的方法，如连接或平均，以实现所需效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- start_at
    - 指定开始应用调整的起点，允许对图像中的特定区域进行有针对性的修改。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 定义调整应用的终点，实现对效果区域的精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - 调整嵌入的缩放以影响风格和构图调整的强度和影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cache_mode
    - 设置节点的缓存策略，根据选择的模式优化性能和资源使用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- image_composition
    - 可选。用于构图调整的图像，提供额外的混合或排列层。
    - Comfy dtype: IMAGE
    - Python dtype: str
- image_negative
    - 可选。代表不希望出现的美学元素的图像，引导调整过程避开这些特征。
    - Comfy dtype: IMAGE
    - Python dtype: str
- attn_mask
    - 可选。突出图像中特定区域以进行集中调整的掩码，提高应用的精确度。
    - Comfy dtype: MASK
    - Python dtype: str
- clip_vision
    - 可选。整合CLIP模型的视觉嵌入以指导风格和构图调整，丰富上下文理解。
    - Comfy dtype: CLIP_VISION
    - Python dtype: str
- optional_ipadapter
    - 可选。指定用于高级自定义和控制调整过程的IPAdapter，提供超越预设的扩展功能。
    - Comfy dtype: IPADAPTER
    - Python dtype: str

# Output types
- model
    - 应用了风格和构图调整的修改后模型，反映所需的美学变化。
    - Comfy dtype: MODEL
    - Python dtype: str
- ipadapter
    - 用于调整的IPAdapter实例，封装了特定的配置和所做的修改。
    - Comfy dtype: IPADAPTER
    - Python dtype: str


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
