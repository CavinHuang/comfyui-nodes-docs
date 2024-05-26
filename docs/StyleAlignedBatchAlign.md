# Documentation
- Class name: StyleAlignedBatchAlign
- Category: style_aligned
- Output node: False
- Repo Ref: https://github.com/brianfitzgerald/style_aligned_comfy

StyleAlignedBatchAlign类旨在通过跨批次对齐模型的风格特征来修改给定模型，增强模型处理和生成风格对齐输出的能力。该节点专注于风格元素的概念整合，确保模型的注意力和归一化层针对风格一致性进行优化。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将要修改以跨批次对齐风格特征的基础架构。它是决定StyleAlignedBatchAlign节点后续行为和功能的主要输入。
    - Comfy dtype: ModelPatcher
    - Python dtype: comfy.model_patcher.ModelPatcher
- share_norm
    - share_norm参数对于确定模型内部的归一化层应该如何共享或修改至关重要。它影响模型内风格特征对齐的效率和效果。
    - Comfy dtype: str
    - Python dtype: str
- share_attn
    - share_attn参数指定了哪些注意力机制应该被共享或修改以实现风格对齐。它在模型的整体风格处理能力中扮演着重要角色。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- scale
    - scale参数调整应用于注意力和归一化层的风格对齐程度。它微妙地影响模型生成跨批次风格一致的输出的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 输出模型是StyleAlignedBatchAlign节点操作的结果，代表了输入模型的修改版本，该版本针对风格对齐处理进行了优化。它是节点在模型架构内集成和对齐风格特征努力的结晶。
    - Comfy dtype: ModelPatcher
    - Python dtype: comfy.model_patcher.ModelPatcher

# Usage tips
- Infra type: CPU

# Source code
```
class StyleAlignedBatchAlign:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'share_norm': (SHARE_NORM_OPTIONS,), 'share_attn': (SHARE_ATTN_OPTIONS,), 'scale': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.0, 'step': 0.1})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'style_aligned'

    def patch(self, model: ModelPatcher, share_norm: str, share_attn: str, scale: float):
        m = model.clone()
        share_group_norm = share_norm in ['group', 'both']
        share_layer_norm = share_norm in ['layer', 'both']
        register_shared_norm(model, share_group_norm, share_layer_norm)
        args = StyleAlignedArgs(share_attn)
        m.set_model_attn1_patch(SharedAttentionProcessor(args, scale))
        return (m,)
```