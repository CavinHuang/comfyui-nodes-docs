# Documentation
- Class name: AdvancedCLIPTextEncodeSDXL
- Category: conditioning/advanced
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb

AdvancedCLIPTextEncodeSDXL节点旨在将文本输入处理和编码成可用于高级条件任务的形式。它利用SDXLClipModel的能力生成嵌入，这些嵌入捕获了文本的语义信息。此节点特别适用于需要对文本内容有细微理解的应用，例如自然语言处理或基于内容的过滤系统。

# Input types
## Required
- text_l
    - 'text_l'参数是一个字符串，表示要编码的主要文本。这是一个关键的输入，因为文本的语义丰富度直接影响生成的嵌入的质量，这对于节点的下游任务至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_g
    - 'text_g'参数作为节点的次要文本输入。它与'text_l'一起使用，以提供更全面的编码，同时考虑额外的文本上下文。这个参数对于从更广泛的文本细微差别中受益的应用至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 'clip'参数是SDXLClipModel的一个实例，用于执行文本编码。这是一个强制性输入，因为模型是基于提供的文本输入生成嵌入的核心组件。
    - Comfy dtype: CLIP
    - Python dtype: SDXLClipModel
## Optional
- token_normalization
    - 'token_normalization'参数决定了在将标记嵌入聚合到最终嵌入之前，如何对它们进行归一化。它提供了不同的策略，这些策略可以影响生成的嵌入的分布和重要性，从而影响节点在下游任务中的性能。
    - Comfy dtype: COMBO[none, mean, length, length+mean]
    - Python dtype: str
- weight_interpretation
    - 'weight_interpretation'参数定义了在编码过程中解释与文本标记相关联的权重的方法。它可以显著改变对文本不同部分的强调，这对于需要特别关注文本元素的应用来说很重要。
    - Comfy dtype: COMBO[comfy, A1111, compel, comfy++, down_weight]
    - Python dtype: str
- balance
    - 'balance'参数在编码过程中调整文本的一般和特定方面的平衡。它是一个浮点值，允许微调编码，以更好地适应当前应用的要求。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONDITIONING
    - AdvancedCLIPTextEncodeSDXL节点的输出是一个包含编码嵌入的'CONDITIONING'对象。这个输出很重要，因为它构成了高级条件任务的基础，允许进行更复杂和上下文感知的处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class AdvancedCLIPTextEncodeSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_l': ('STRING', {'multiline': True}), 'text_g': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++', 'down_weight'],), 'balance': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/advanced'

    def encode(self, clip, text_l, text_g, token_normalization, weight_interpretation, balance, affect_pooled='disable'):
        (embeddings_final, pooled) = advanced_encode_XL(clip, text_l, text_g, token_normalization, weight_interpretation, w_max=1.0, clip_balance=balance, apply_to_pooled=affect_pooled == 'enable')
        return ([[embeddings_final, {'pooled_output': pooled}]],)
```