# Documentation
- Class name: StyleConditionerBaseOnly
- Category: Mikey/Conditioning
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

StyleConditionerBaseOnly节点的'add_style'方法旨在将用户定义的样式集成到调节过程中。它通过结合正面和负面提示与基础调节元素，允许应用风格偏好。该方法智能地管理这些样式的整合，根据指定的强度因子调整它们的影响，并支持使用种子进行样式选择。这个节点在启用生成过程中的风格控制中起着至关重要的作用，而本身并不直接处理生成。

# Input types
## Required
- style
    - “style”参数在确定调节过程的风格方向中起着关键作用。它决定了将用于指导生成的特定正面和负面提示。风格的选择对结果输出有深远的影响，使其成为节点操作中的一个重要元素。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - “strength”参数控制应用于调节过程的风格影响的强度。它是一个浮点数，用于调整样式影响的权重，允许在输出中微调风格元素。这个参数对于实现风格控制和基础调节元素之间期望的平衡至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive_cond_base
    - “positive_cond_base”参数代表将受到样式影响的基础正面调节元素。它是节点操作中的一个关键组件，因为它构成了应用风格调整的基础。该参数对于建立生成过程的初始正面上下文至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- negative_cond_base
    - “negative_cond_base”参数是将受到样式影响的基础负面调节元素。它在塑造输出中起着重要作用，通过提供正面调节的平衡来形成对比。这个参数对于确保生成的内容符合所需的风格约束，同时避免不希望的元素至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- base_clip
    - “base_clip”参数是作为调节过程视觉基础的参考图像或剪辑。它对于提供风格将被应用的稳定视觉上下文至关重要。这个参数对于确保在特定的视觉框架中进行风格调整至关重要。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
## Optional
- use_seed
    - “use_seed”参数决定是否应该使用种子值从可用选项中选择样式。当设置为'true'时，它为样式选择过程引入了随机性元素，这对于多样化输出可能是有益的。这个参数对于增加生成过程的可变性很重要。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
- seed
    - “seed”参数与“use_seed”参数结合使用，用于控制样式选择中的随机性。它为随机数生成器提供了一个特定的参考点，确保了可重复的选择过程。当涉及随机性时，这个参数对于在节点的多次运行中保持一致性非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- base_pos_cond
    - “base_pos_cond”输出代表了应用样式后更新的正面调节元素。它是节点操作中的一个关键组件，因为它将风格调整带入生成过程的后续阶段。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- base_neg_cond
    - “base_neg_cond”输出是在应用样式后更新的负面调节元素。它在确保生成的内容符合风格约束并避免不希望的元素方面起着重要作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- style_str
    - “style_str”输出提供了已应用样式的文本表示。它作为调节过程中做出的风格选择的记录，对于跟踪和记录生成参数可能是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StyleConditionerBaseOnly:

    @classmethod
    def INPUT_TYPES(s):
        (s.styles, s.pos_style, s.neg_style) = read_styles()
        return {'required': {'style': (s.styles,), 'strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'base_clip': ('CLIP',), 'use_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('base_pos_cond', 'base_neg_cond', 'style_str')
    FUNCTION = 'add_style'
    CATEGORY = 'Mikey/Conditioning'

    def add_style(self, style, strength, positive_cond_base, negative_cond_base, base_clip, use_seed, seed):
        if use_seed == 'true' and len(self.styles) > 0:
            offset = seed % len(self.styles)
            style = self.styles[offset]
        pos_prompt = self.pos_style[style]
        neg_prompt = self.neg_style[style]
        pos_prompt = pos_prompt.replace('{prompt}', '')
        neg_prompt = neg_prompt.replace('{prompt}', '')
        if style == 'none':
            return (positive_cond_base, negative_cond_base, style)
        positive_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, pos_prompt, pos_prompt)[0]
        negative_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, neg_prompt, neg_prompt)[0]
        positive_cond_base = ConditioningAverage.addWeighted(self, positive_cond_base_new, positive_cond_base, strength)[0]
        negative_cond_base = ConditioningAverage.addWeighted(self, negative_cond_base_new, negative_cond_base, strength)[0]
        return (positive_cond_base, negative_cond_base, style)
```