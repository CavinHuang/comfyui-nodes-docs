# Documentation
- Class name: TomePatchModel
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

TomePatchModel 类旨在通过应用补丁技术来修改和增强给定模型的功能。这个名为 'patch' 的方法允许定制模型的注意力机制，可能在不显著改变底层架构的情况下提高其在特定任务上的性能。

# Input types
## Required
- model
    - 'model' 参数至关重要，因为它代表了将要被补丁化的机器学习模型。补丁化过程定制了模型的行为，使其更适合预期的应用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ratio
    - 'ratio' 参数决定了模型注意力机制被补丁化的比例。它对于控制修改的范围以及在性能和计算效率之间平衡至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - 输出 'modified_model' 是对输入模型应用补丁化过程的结果。它很重要，因为它代表了准备部署或进一步训练的增强模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class TomePatchModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ratio': ('FLOAT', {'default': 0.3, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, ratio):
        self.u = None

        def tomesd_m(q, k, v, extra_options):
            (m, self.u) = get_functions(q, ratio, extra_options['original_shape'])
            return (m(q), k, v)

        def tomesd_u(n, extra_options):
            return self.u(n)
        m = model.clone()
        m.set_model_attn1_patch(tomesd_m)
        m.set_model_attn1_output_patch(tomesd_u)
        return (m,)
```