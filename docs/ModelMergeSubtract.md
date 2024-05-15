# Documentation
- Class name: ModelSubtract
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelSubtract节点的'merge'方法旨在通过减去一个模型的关键补丁并使用指定的乘数来结合两个模型。它执行一个复杂的操作，整合了两个模型的特点，允许对它们的贡献进行细微的调整。

# Input types
## Required
- model1
    - 参数'model1'是将从中减去补丁的主要模型。它在合并过程中起着关键作用，因为它构成了生成模型的基本结构。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 参数'model2'提供了将从model1减去的关键补丁。它对于确定将集成到最终模型中的特定差异至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- multiplier
    - 参数'multiplier'调整从model1减去的补丁的强度。它很重要，因为它允许微调model2对合并模型的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 输出'merged_model'代表了模型合并过程的结果。它封装了两个输入模型的组合特征，提供了一个具有调整后特性的新模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class ModelSubtract:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model1': ('MODEL',), 'model2': ('MODEL',), 'multiplier': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, model1, model2, multiplier):
        m = model1.clone()
        kp = model2.get_key_patches('diffusion_model.')
        for k in kp:
            m.add_patches({k: kp[k]}, -multiplier, multiplier)
        return (m,)
```