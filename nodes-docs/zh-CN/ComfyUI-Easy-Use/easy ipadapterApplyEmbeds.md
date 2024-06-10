# Documentation
- Class name: ipadapterApplyEmbeds
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点便于将位置嵌入应用到模型中，增强模型处理输入数据中的空间信息的能力。它旨在通过整合额外的上下文线索来提升模型的性能，从而为输入数据提供更细致的表示。

# Input types
## Required
- model
    - 模型参数是必不可少的，因为它是节点修改的核心组件。它代表了将要应用位置嵌入的机器学习模型，这对节点的运作和模型随后的性能至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数对于节点至关重要，因为它提供了模型与位置嵌入之间的必要接口。它确保嵌入被正确应用并集成到模型的架构中，影响节点的整体功能和输出。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPAdapter
- pos_embed
    - pos_embed参数对节点的功能至关重要，它代表了将要应用到模型的位置嵌入。这些嵌入提供了模型理解和处理输入数据所需的空间信息。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- weight
    - 权重参数影响模型中位置嵌入的重视程度。它是决定嵌入将如何影响模型输出的重要因子，因此，也影响了节点产生的结果质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数决定了应用于位置嵌入的权重类型，这对塑造模型对输入数据的响应具有重要意义。它影响了节点在修改模型行为方面的整体适应性和有效性。
    - Comfy dtype: COMBO[weight_types]
    - Python dtype: str
- start_at
    - start_at参数指定了位置嵌入应用的起始点，这对节点的运作至关重要。它决定了模型开始结合空间信息的初始上下文，影响了数据的整体解释和处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数定义了位置嵌入应用的终点，对节点的功能起着关键作用。它设置了模型将空间信息整合到何种程度的界限，从而影响了模型对输入数据理解的全面性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数调整嵌入的缩放比例，这对控制位置信息对模型的影响至关重要。它直接影响节点平衡嵌入与其他特征的贡献的能力，确保输入数据的最佳表示。
    - Comfy dtype: COMBO[ ['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']]
    - Python dtype: str
## Optional
- attn_mask
    - 当提供attn_mask参数时，它帮助节点通过忽略无关信息来专注于输入数据的某些部分。这增强了模型专注于数据最重要方面的能力，从而产生更准确和相关的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- model
    - 模型输出代表了应用了位置嵌入的修改后的机器学习模型。它是节点的主要结果，展示了模型在处理空间信息方面的增强能力，并提供了对输入数据更详细的理解。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter输出是促进位置嵌入应用到模型的中间组件。它作为嵌入成功集成的证明，确保模型现在能够更好地处理空间信息。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPAdapter

# Usage tips
- Infra type: CPU

# Source code
```
class ipadapterApplyEmbeds(ipadapter):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        weight_types = ipa_cls.weight_types
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'pos_embed': ('EMBEDS',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (weight_types,), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'neg_embed': ('EMBEDS',), 'attn_mask': ('MASK',)}}
    RETURN_TYPES = ('MODEL', 'IPADAPTER')
    RETURN_NAMES = ('model', 'ipadapter')
    CATEGORY = 'EasyUse/Adapter'
    FUNCTION = 'apply'

    def apply(self, model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, embeds_scaling, attn_mask=None, neg_embed=None):
        if 'IPAdapterEmbeds' not in ALL_NODE_CLASS_MAPPINGS:
            self.error()
        cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterEmbeds']
        (model,) = cls().apply_ipadapter(model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, neg_embed=neg_embed, attn_mask=attn_mask, clip_vision=None, embeds_scaling=embeds_scaling)
        return (model, ipadapter)
```