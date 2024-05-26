# Documentation
- Class name: ipadapterApply
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

ipadapterApply节点旨在简化将各种图像处理适配器应用于输入图像的过程，使用模型和预设配置来实现期望的转换。它强调适应性和易用性，为用户使用不同的设置并实现最佳结果提供了结构化的接口，而无需深入了解复杂的模型特定细节。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将用于对输入图像应用转换的基础图像处理模型。它是节点功能的基础，直接影响输出的质量和性质。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- image
    - 图像输入是节点处理的对象。其内容和格式对于确定模型如何解释和转换它至关重要，最终塑造最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- preset
    - 预设参数决定了要应用的具体转换预设，指导模型根据选定的风格或效果处理图像。这是实现目标视觉效果的关键因素。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- lora_strength
    - lora_strength参数调整风格转移过程的强度，允许微调视觉输出以符合用户的偏好。它在图像转换的艺术方面发挥着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型代表了在选择的预设和其他参数应用后修改的图像处理模型。它是节点处理的结晶，并作为进一步图像转换或分析的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tiles
    - tiles输出提供了处理后图像的分段视图，允许详细检查并可能用于进一步的图像操作。它是输出的额外层，增强了节点在图像分析和编辑中的实用性。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image or torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class ipadapterApply(ipadapter):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        presets = cls().presets
        return {'required': {'model': ('MODEL',), 'image': ('IMAGE',), 'preset': (presets,), 'lora_strength': ('FLOAT', {'default': 0.6, 'min': 0, 'max': 1, 'step': 0.01}), 'provider': (['CPU', 'CUDA', 'ROCM', 'DirectML', 'OpenVINO', 'CoreML'],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_faceidv2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5.0, 'step': 0.05}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'cache_mode': (['insightface only', 'clip_vision only', 'all', 'none'], {'default': 'insightface only'}), 'use_tiled': ('BOOLEAN', {'default': False})}, 'optional': {'attn_mask': ('MASK',), 'optional_ipadapter': ('IPADAPTER',)}}
    RETURN_TYPES = ('MODEL', 'IMAGE', 'MASK', 'IPADAPTER')
    RETURN_NAMES = ('model', 'tiles', 'masks', 'ipadapter')
    CATEGORY = 'EasyUse/Adapter'
    FUNCTION = 'apply'

    def apply(self, model, image, preset, lora_strength, provider, weight, weight_faceidv2, start_at, end_at, cache_mode, use_tiled, attn_mask=None, optional_ipadapter=None):
        (tiles, masks) = (image, [None])
        (model, ipadapter) = self.load_model(model, preset, lora_strength, provider, clip_vision=None, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)
        if use_tiled and preset not in self.faceid_presets:
            if 'IPAdapterTiled' not in ALL_NODE_CLASS_MAPPINGS:
                self.error()
            cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterTiled']
            (model, tiles, masks) = cls().apply_tiled(model, ipadapter, image, weight, 'linear', start_at, end_at, sharpening=0.0, combine_embeds='concat', image_negative=None, attn_mask=attn_mask, clip_vision=None, embeds_scaling='V only')
        elif preset in ['FACEID PLUS V2', 'FACEID PORTRAIT (style transfer)']:
            if 'IPAdapterAdvanced' not in ALL_NODE_CLASS_MAPPINGS:
                self.error()
            cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterAdvanced']
            (model,) = cls().apply_ipadapter(model, ipadapter, start_at=start_at, end_at=end_at, weight=weight, weight_type='linear', combine_embeds='concat', weight_faceidv2=weight_faceidv2, image=image, image_negative=None, clip_vision=None, attn_mask=attn_mask, insightface=None, embeds_scaling='V only')
        else:
            if 'IPAdapter' not in ALL_NODE_CLASS_MAPPINGS:
                self.error()
            cls = ALL_NODE_CLASS_MAPPINGS['IPAdapter']
            (model,) = cls().apply_ipadapter(model, ipadapter, image, weight, start_at, end_at, attn_mask)
        return (model, tiles, masks, ipadapter)
```