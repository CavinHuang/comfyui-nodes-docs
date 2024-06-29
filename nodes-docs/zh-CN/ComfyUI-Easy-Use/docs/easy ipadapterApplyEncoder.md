# Documentation
- Class name: ipadapterApplyEncoder
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

ipadapterApplyEncoder节点旨在为模型内的编码目的高效处理和适配图像数据。它便于整合多种图像输入和预设，应用选定的编码方法生成嵌入向量，可用于进一步分析或模型训练。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了编码过程的核心。它是将处理输入图像并根据选定的预设和编码方法生成嵌入向量的机器学习模型。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- image1
    - 图像输入对于节点执行其编码功能至关重要。它提供了模型将处理的原始数据，以提取有意义的特征并生成嵌入向量。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- preset
    - 预设参数通过确定要使用的模型的特定设置和参数来影响编码过程。它根据预定义的配置调整节点的操作，以实现期望的结果。
    - Comfy dtype: COMBO
    - Python dtype: str
- num_embeds
    - 嵌入数量参数很重要，因为它决定了要生成的图像嵌入向量的数量。这直接影响编码过程的复杂性和深度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- combine_method
    - 合并方法参数决定如何聚合各个嵌入向量。通过应用诸如连接、加法或平均等操作，它可以显著改变结果嵌入向量。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- model
    - 输出模型是输入模型的更新版本，现在配备了处理过的嵌入向量。它为后续操作或可用作下游任务的基础。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- ipadapter
    - ipadapter输出是节点操作的编码部分，封装了处理过的嵌入向量。它是一个重要的中间结果，可以进一步分析或用于系统的其他部分。
    - Comfy dtype: IPADAPTER
    - Python dtype: comfy_ipadapter.ipadapter.IPADAPTER
- pos_embed
    - 正向嵌入代表了与期望结果一致的输入图像的编码特征。它们在指导模型的学习过程和改进其预测方面发挥着重要作用。
    - Comfy dtype: EMBEDS
    - Python dtype: List[torch.Tensor]
- neg_embed
    - 负向嵌入对应于不符合期望标准的输入图像。它们帮助模型区分相关和无关的特征，提高其做出准确判断的能力。
    - Comfy dtype: EMBEDS
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ipadapterApplyEncoder(ipadapter):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        normal_presets = ipa_cls.normal_presets
        max_embeds_num = 3
        inputs = {'required': {'model': ('MODEL',), 'image1': ('IMAGE',), 'preset': (normal_presets,), 'num_embeds': ('INT', {'default': 2, 'min': 1, 'max': max_embeds_num})}, 'optional': {}}
        for i in range(1, max_embeds_num + 1):
            if i > 1:
                inputs['optional'][f'image{i}'] = ('IMAGE',)
        for i in range(1, max_embeds_num + 1):
            inputs['optional'][f'mask{i}'] = ('MASK',)
            inputs['optional'][f'weight{i}'] = ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})
        inputs['optional']['combine_method'] = (['concat', 'add', 'subtract', 'average', 'norm average', 'max', 'min'],)
        inputs['optional']['optional_ipadapter'] = ('IPADAPTER',)
        inputs['optional']['pos_embeds'] = ('EMBEDS',)
        inputs['optional']['neg_embeds'] = ('EMBEDS',)
        return inputs
    RETURN_TYPES = ('MODEL', 'IPADAPTER', 'EMBEDS', 'EMBEDS')
    RETURN_NAMES = ('model', 'ipadapter', 'pos_embed', 'neg_embed')
    CATEGORY = 'EasyUse/Adapter'
    FUNCTION = 'apply'

    def batch(self, embeds, method):
        if method == 'concat' and len(embeds) == 1:
            return (embeds[0],)
        embeds = [embed for embed in embeds if embed is not None]
        embeds = torch.cat(embeds, dim=0)
        if method == 'add':
            embeds = torch.sum(embeds, dim=0).unsqueeze(0)
        elif method == 'subtract':
            embeds = embeds[0] - torch.mean(embeds[1:], dim=0)
            embeds = embeds.unsqueeze(0)
        elif method == 'average':
            embeds = torch.mean(embeds, dim=0).unsqueeze(0)
        elif method == 'norm average':
            embeds = torch.mean(embeds / torch.norm(embeds, dim=0, keepdim=True), dim=0).unsqueeze(0)
        elif method == 'max':
            embeds = torch.max(embeds, dim=0).values.unsqueeze(0)
        elif method == 'min':
            embeds = torch.min(embeds, dim=0).values.unsqueeze(0)
        return embeds

    def apply(self, **kwargs):
        model = kwargs['model']
        preset = kwargs['preset']
        if 'optional_ipadapter' in kwargs:
            ipadapter = kwargs['optional_ipadapter']
        else:
            (model, ipadapter) = self.load_model(model, preset, 0, 'CPU', clip_vision=None, optional_ipadapter=None, cache_mode='none')
        if 'IPAdapterEncoder' not in ALL_NODE_CLASS_MAPPINGS:
            self.error()
        encoder_cls = ALL_NODE_CLASS_MAPPINGS['IPAdapterEncoder']
        pos_embeds = kwargs['pos_embeds'] if 'pos_embeds' in kwargs else []
        neg_embeds = kwargs['neg_embeds'] if 'neg_embeds' in kwargs else []
        for i in range(1, kwargs['num_embeds'] + 1):
            if f'image{i}' not in kwargs:
                raise Exception(f'image{i} is required')
            kwargs[f'mask{i}'] = kwargs[f'mask{i}'] if f'mask{i}' in kwargs else None
            kwargs[f'weight{i}'] = kwargs[f'weight{i}'] if f'weight{i}' in kwargs else 1.0
            (pos, neg) = encoder_cls().encode(ipadapter, kwargs[f'image{i}'], kwargs[f'weight{i}'], kwargs[f'mask{i}'], clip_vision=None)
            pos_embeds.append(pos)
            neg_embeds.append(neg)
        pos_embeds = self.batch(pos_embeds, kwargs['combine_method'])
        neg_embeds = self.batch(neg_embeds, kwargs['combine_method'])
        return (model, ipadapter, pos_embeds, neg_embeds)
```