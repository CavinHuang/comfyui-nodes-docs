# Documentation
- Class name: WLSH_CLIP_Positive_Negative
- Category: WLSH Nodes/conditioning
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在处理文本输入并生成可用于进一步分析或比较的编码表示。它在工作流中扮演关键角色，为基于文本的特征提取提供了基础。

# Input types
## Required
- clip
    - clip参数对节点的运行至关重要，它提供了编码文本的机制。它是将原始文本转换为结构化格式的核心组件。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- positive_text
    - 这个参数是一个与编码过程正面相关的文本输入。它很重要，因为它为编码设置了上下文，影响了最终的表示。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_text
    - 与positive_text类似，这个参数为编码过程引入了一个负面上下文。它对于创建编码表示中的对比非常关键，这对于某些类型的分析是有益的。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 正面输出代表正面文本的编码形式，作为系统内比较或进一步处理的参考。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负面输出是负面文本的编码表示，与正面输出相比较，可以提供对编码过程差异和细微差别的洞察。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_CLIP_Positive_Negative:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'positive_text': ('STRING', {'default': f'', 'multiline': True}), 'negative_text': ('STRING', {'default': f'', 'multiline': True})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('positive', 'negative')
    FUNCTION = 'encode'
    CATEGORY = 'WLSH Nodes/conditioning'

    def encode(self, clip, positive_text, negative_text):
        return ([[clip.encode(positive_text), {}]], [[clip.encode(negative_text), {}]])
```