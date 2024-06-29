# Documentation
- Class name: ModelMergeSimple
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelMergeSimple节点旨在将两个不同的模型无缝地集成到一个单一、统一的单元中。它通过将一个模型的关键补丁与另一个模型合并来实现这一点，允许基于指定比例进行平衡组合。这个节点特别适用于需要融合模型以增强性能或功能的高级应用中。

# Input types
## Required
- model1
    - 'model1'参数代表将要与另一个模型合并的主模型。它是合并过程中的关键元素，因为它构成了最终组合模型的基础。节点的执行和结果很大程度上受到'model1'的特性和结构的影响。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 'model2'参数是次要模型，它提供要与'model1'合并的补丁。它的作用很重要，因为它提供了将被整合到最终模型中的差异化元素，从而影响整体的功能性和性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ratio
    - 'ratio'参数决定了'model2'对合并模型的影响。它是一个浮点值，范围从0.0到1.0，其中1.0表示'model2'有完全的影响。这个参数对于控制合并过程中两个模型之间的平衡至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 'merged_model'输出代表了基于指定的'ratio'合并'model1'和'model2'的结果。它封装了两个模型的组合功能和特性，提供了一个统一的模型，用于进一步的使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class ModelMergeSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model1': ('MODEL',), 'model2': ('MODEL',), 'ratio': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, model1, model2, ratio):
        m = model1.clone()
        kp = model2.get_key_patches('diffusion_model.')
        for k in kp:
            m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)
        return (m,)
```