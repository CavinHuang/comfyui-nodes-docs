# Documentation
- Class name: ipadapterApplyAdvanced
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点促进了图像处理模型的高级应用，使用户能够无缝集成各种预设、权重和其他参数来完善和定制转换过程。它强调适应性和控制性，为用户实现复杂的图像操作提供了一个高级接口，而无需深入研究底层算法的细节。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了图像处理框架的核心。它决定了将在输入图像上执行的转换和分析类型，显著影响最终输出的质量和特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- image
    - 图像参数是节点操作的主要输入。其内容和格式在决定模型如何处理和转换它方面至关重要，最终塑造图像操作的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- preset
    - 预设参数允许用户选择预定义的设置，根据特定用例调整模型的行为。它通过提供优化的配置简化了过程，确保节点针对预期目的有效运行。
    - Comfy dtype: COMBO
    - Python dtype: str
- lora_strength
    - lora_strength参数微调模型对输入图像的适应性，允许进行细微调整，以提高最终输出的保真度和一致性。它在实现模型泛化和定制之间的平衡中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型代表节点处理后输入模型的增强或改进版本。它包含了图像操作的结果，体现了节点在实现期望转换方面的有效性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tiles
    - tiles输出由输入图像的分段部分组成，每部分都经过应用模型和参数的处理。它提供了在粒度级别上的图像操作的详细视图，展示了节点处理复杂转换的能力。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image or torch.Tensor]
- masks
    - masks输出是一系列与处理过的tiles相对应的二进制矩阵。它在隔离和突出显示经过转换的图像特定区域方面发挥着重要作用，展示了节点在编辑过程中的精确度和控制力。
    - Comfy dtype: MASK
    - Python dtype: List[PIL.Image or torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class ipadapterApplyAdvanced(ipadapter):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        presets = ipa_cls.presets
        weight_types = ipa_cls.weight_types
        return {'required': {'model': ('MODEL',), 'image': ('IMAGE',), 'preset': (presets,), 'lora_strength': ('FLOAT', {'default': 0.6, 'min': 0, 'max': 1, 'step': 0.01}), 'provider': (['CPU', 'CUDA', 'ROCM', 'DirectML', 'OpenVINO', 'CoreML'],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_faceidv2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5.0, 'step': 0.05}), 'weight_type': (weight_types,), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],), 'cache_mode': (['insightface only', 'clip_vision only', 'all', 'none'], {'default': 'insightface only'}), 'use_tiled': ('BOOLEAN', {'default': False}), 'use_batch': ('BOOLEAN', {'default': False}), 'sharpening': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',), 'optional_ipadapter': ('IPADAPTER',)}}
    RETURN_TYPES = ('MODEL', 'IMAGE', 'MASK', 'IPADAPTER')
    RETURN_NAMES = ('model', 'tiles', 'masks', 'ipadapter')
    CATEGORY = 'EasyUse/Adapter'
    FUNCTION = 'apply'

    def apply(self, model, image, preset, lora_strength, provider, weight, weight_faceidv2, weight_type, combine_embeds, start_at, end_at, embeds_scaling, cache_mode, use_tiled, use_batch, sharpening, image_negative=None, clip_vision=None, attn_mask=None, optional_ipadapter=None):
        (tiles, masks) = (image, [None])
        (model, ipadapter) = self.load_model(model, preset, lora_strength, provider, clip_vision=clip_vision, optional_ipadapter=optional_ipadapter, cache_mode=cache_mode)
        if use_tiled:
            if use_batch:
                if 'IPAdapterTiledBatch' not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterTiledBatch']
            else:
                if 'IPAdapterTiled' not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterTiled']
            (model, tiles, masks) = cls().apply_tiled(model, ipadapter, image, weight, weight_type, start_at, end_at, sharpening=sharpening, combine_embeds=combine_embeds, image_negative=image_negative, attn_mask=attn_mask, clip_vision=clip_vision, embeds_scaling=embeds_scaling)
        else:
            if use_batch:
                if 'IPAdapterBatch' not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterBatch']
            else:
                if 'IPAdapterAdvanced' not in ALL_NODE_CLASS_MAPPINGS:
                    self.error()
                cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterAdvanced']
            (model,) = cls().apply_ipadapter(model, ipadapter, weight=weight, weight_type=weight_type, start_at=start_at, end_at=end_at, combine_embeds=combine_embeds, weight_faceidv2=weight_faceidv2, image=image, image_negative=image_negative, clip_vision=clip_vision, attn_mask=attn_mask, insightface=None, embeds_scaling=embeds_scaling)
        return (model, tiles, masks, ipadapter)
```