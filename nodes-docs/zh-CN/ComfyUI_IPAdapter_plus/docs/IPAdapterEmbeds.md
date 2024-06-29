# Documentation
- Class name: IPAdapterEmbeds
- Category: ipadapter/embeds
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterEmbeds节点旨在将IPAdapter修改集成并应用于给定模型。它通过利用IPAdapter的能力，定制模型的嵌入空间，允许对模型行为进行微调，以适应特定的输入特征。该节点抽象了嵌入操作的复杂性，为模型增强提供了一个简化的接口。

# Input types
## Required
- model
    - 模型参数是必需的，因为它代表了将由IPAdapter进行适配的基础模型。它是主要的输入参数，决定了结果适配模型的结构和行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数指定了将用于修改模型的适配器。它是一个关键组件，可以定制模型的嵌入能力。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]
- pos_embed
    - pos_embed参数提供了用于指导适配过程的正向嵌入输入。它在塑造适配模型对特定特征的响应中起着重要作用。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- weight
    - 权重参数决定了IPAdapter修改对模型的影响。它是控制适配程度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数定义了权重在模型的不同层中应用的方式。它对于将适配的重点指向模型的特定区域很重要。
    - Comfy dtype: WEIGHT_TYPES
    - Python dtype: str
- start_at
    - start_at参数建立了适配过程的起始点。它对于定义模型开始适配的初始条件至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记了适配过程的终点。它对于指定适配结束时的条件是必不可少的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数决定了嵌入在模型内的缩放或组合方式。这是一个关键设置，可以显著影响适配模型的性能。
    - Comfy dtype: COMBO['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']
    - Python dtype: str
## Optional
- neg_embed
    - neg_embed参数提供了负向嵌入输入，可以在适配期间用于平衡正向嵌入。它有助于细化模型对所需特征的关注。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- attn_mask
    - attn_mask参数用于在适配期间对注意力机制应用掩码，这对于控制模型内部信息流很重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- clip_vision
    - clip_vision参数指定了CLIP Vision模型，该模型可以与IPAdapter结合使用，以增强特征提取。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module

# Output types
- model
    - 输出模型是输入模型的适配版本，根据IPAdapterEmbeds节点提供的规格进行修改。它代表了适配过程的成果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterEmbeds:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'pos_embed': ('EMBEDS',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'neg_embed': ('EMBEDS',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_ipadapter'
    CATEGORY = 'ipadapter/embeds'

    def apply_ipadapter(self, model, ipadapter, pos_embed, weight, weight_type, start_at, end_at, neg_embed=None, attn_mask=None, clip_vision=None, embeds_scaling='V only'):
        ipa_args = {'pos_embed': pos_embed, 'neg_embed': neg_embed, 'weight': weight, 'weight_type': weight_type, 'start_at': start_at, 'end_at': end_at, 'attn_mask': attn_mask, 'embeds_scaling': embeds_scaling}
        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision
        if clip_vision is None and neg_embed is None:
            raise Exception('Missing CLIPVision model.')
        del ipadapter
        return (ipadapter_execute(model.clone(), ipadapter_model, clip_vision, **ipa_args),)
```