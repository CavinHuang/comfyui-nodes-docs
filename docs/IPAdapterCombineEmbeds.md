# Documentation
- Class name: IPAdapterCombineEmbeds
- Category: ipadapter/embeds
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterCombineEmbeds节点旨在通过多种指定方法智能地组合多个嵌入输入，例如连接、加法、减法、平均、归一化平均、最大值或最小值操作。它在机器学习模型中处理和整合不同嵌入数据到统一格式中发挥关键作用，增强了嵌入操作的灵活性和适应性。

# Input types
## Required
- embed1
    - embed1是节点操作必需的主要嵌入输入。它为后续组合方法提供了基础，对节点的执行和最终输出至关重要。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- method
    - method参数决定了嵌入是如何组合的。它至关重要，因为它决定应用于嵌入输入的数学运算，显著影响节点的功能和输出的性质。
    - Comfy dtype: ['concat', 'add', 'subtract', 'average', 'norm average', 'max', 'min']
    - Python dtype: str
## Optional
- embed2
    - embed2是可选的额外嵌入输入，可以被包括以进行更复杂的嵌入组合。它的包含丰富了节点处理的嵌入数据的多样性。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- embed3
    - embed3是另一个可选的嵌入输入，可用于进一步多样化嵌入组合过程。它为节点的操作提供了额外的复杂性层。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- embed4
    - embed4作为可选的嵌入输入，可以用来扩展嵌入组合的范围。它为节点处理嵌入数据的能力增加了深度。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- embed5
    - embed5是提供给节点用于嵌入组合的最后一个可选嵌入输入。它代表了可以引入到节点嵌入处理中的最高复杂性水平。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor

# Output types
- combined_embeds
    - combined_embeds输出代表了将指定方法应用于输入嵌入的结果。它包含了节点目的的精髓，提供了输入数据的合成形式，可以用于进一步的分析或模型训练。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterCombineEmbeds:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'embed1': ('EMBEDS',), 'method': (['concat', 'add', 'subtract', 'average', 'norm average', 'max', 'min'],)}, 'optional': {'embed2': ('EMBEDS',), 'embed3': ('EMBEDS',), 'embed4': ('EMBEDS',), 'embed5': ('EMBEDS',)}}
    RETURN_TYPES = ('EMBEDS',)
    FUNCTION = 'batch'
    CATEGORY = 'ipadapter/embeds'

    def batch(self, embed1, method, embed2=None, embed3=None, embed4=None, embed5=None):
        if method == 'concat' and embed2 is None and (embed3 is None) and (embed4 is None) and (embed5 is None):
            return (embed1,)
        embeds = [embed1, embed2, embed3, embed4, embed5]
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
        return (embeds,)
```