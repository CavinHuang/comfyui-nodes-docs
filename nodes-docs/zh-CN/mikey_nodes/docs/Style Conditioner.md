# Documentation
- Class name: StyleConditioner
- Category: Mikey/Conditioning
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

StyleConditioner节点旨在管理和应用风格条件到生成过程中。它允许集成正面和负面的风格提示，使得生成的内容可以微调以符合所需的风格属性。该节点在引导生成过程朝向特定的美学或艺术方向中发挥关键作用。

# Input types
## Required
- style
    - ‘style’参数对于确定生成过程的风格方向至关重要。它影响着选择正面和负面提示，这些提示将塑造输出结果。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - ‘strength’参数调整风格对生成过程影响的强度。它在控制风格特征在输出中反映的程度时非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive_cond_base
    - ‘positive_cond_base’参数代表将与新的正面提示结合的基本正面条件元素，以细化生成的风格。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- negative_cond_base
    - ‘negative_cond_base’参数表示在生成过程中用来平衡风格影响的基本负面条件元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- positive_cond_refiner
    - ‘positive_cond_refiner’参数用于在生成过程中进一步细化风格的正面方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- negative_cond_refiner
    - ‘negative_cond_refiner’参数用于确保在最终输出中最小化风格的负面方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- base_clip
    - ‘base_clip’参数对于将基本的正面和负面提示编码成可以由生成模型处理的形式至关重要。
    - Comfy dtype: CLIP
    - Python dtype: Clip
- refiner_clip
    - ‘refiner_clip’参数用于编码经过精炼的正面和负面提示，以进一步增强风格对生成的影响。
    - Comfy dtype: CLIP
    - Python dtype: Clip
- use_seed
    - ‘use_seed’参数决定是否基于提供的种子选择特定的风格，为风格选择过程增加了一层控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - ‘seed’参数与‘use_seed’标志一起使用，当使用种子时，用于指定风格选择的起始点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- base_pos_cond
    - ‘base_pos_cond’输出代表了更新后的基本正面条件，反映了集成的风格特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- base_neg_cond
    - ‘base_neg_cond’输出表示更新后的基本负面条件，有助于从生成中排除不需要的风格元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- refiner_pos_cond
    - ‘refiner_pos_cond’输出是经过精炼的正面条件元素，进一步塑造了生成内容的风格。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- refiner_neg_cond
    - ‘refiner_neg_cond’输出是经过精炼的负面条件元素，确保在生成中排除负面风格方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: Conditioning
- style_str
    - ‘style_str’输出提供了应用风格的文本表示，提供了风格对生成影响的描述性总结。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StyleConditioner:

    @classmethod
    def INPUT_TYPES(s):
        (s.styles, s.pos_style, s.neg_style) = read_styles()
        return {'required': {'style': (s.styles,), 'strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.1}), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'positive_cond_refiner': ('CONDITIONING',), 'negative_cond_refiner': ('CONDITIONING',), 'base_clip': ('CLIP',), 'refiner_clip': ('CLIP',), 'use_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('base_pos_cond', 'base_neg_cond', 'refiner_pos_cond', 'refiner_neg_cond', 'style_str')
    FUNCTION = 'add_style'
    CATEGORY = 'Mikey/Conditioning'

    def add_style(self, style, strength, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, base_clip, refiner_clip, use_seed, seed):
        if use_seed == 'true' and len(self.styles) > 0:
            offset = seed % len(self.styles)
            style = self.styles[offset]
        pos_prompt = self.pos_style[style]
        neg_prompt = self.neg_style[style]
        pos_prompt = pos_prompt.replace('{prompt}', '')
        neg_prompt = neg_prompt.replace('{prompt}', '')
        if style == 'none':
            return (positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, style)
        positive_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, pos_prompt, pos_prompt)[0]
        negative_cond_base_new = CLIPTextEncodeSDXL.encode(self, base_clip, 1024, 1024, 0, 0, 1024, 1024, neg_prompt, neg_prompt)[0]
        positive_cond_refiner_new = CLIPTextEncodeSDXLRefiner.encode(self, refiner_clip, 6, 4096, 4096, pos_prompt)[0]
        negative_cond_refiner_new = CLIPTextEncodeSDXLRefiner.encode(self, refiner_clip, 2.5, 4096, 4096, neg_prompt)[0]
        positive_cond_base = ConditioningAverage.addWeighted(self, positive_cond_base_new, positive_cond_base, strength)[0]
        negative_cond_base = ConditioningAverage.addWeighted(self, negative_cond_base_new, negative_cond_base, strength)[0]
        positive_cond_refiner = ConditioningAverage.addWeighted(self, positive_cond_refiner_new, positive_cond_refiner, strength)[0]
        negative_cond_refiner = ConditioningAverage.addWeighted(self, negative_cond_refiner_new, negative_cond_refiner, strength)[0]
        return (positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, style)
```