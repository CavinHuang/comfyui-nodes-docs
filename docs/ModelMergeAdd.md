# Documentation
- Class name: ModelAdd
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelAdd节点的'merge'方法旨在将两个不同的模型合并为一个单一的、统一的模型。它通过克隆一个模型，然后将第二个模型的关键补丁集成进来，确保生成的模型体现了两个原始模型的特征。这一过程对于需要融合模型功能的高级应用至关重要。

# Input types
## Required
- model1
    - 'model1'参数是将要被克隆并作为合并过程基础的第一个模型。它是基本组成部分，因为它决定了最终合并模型的初始结构和属性。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher or a similar type representing a model structure
- model2
    - 'model2'参数代表将从中提取关键补丁并应用到'model1'的第二个模型。这些补丁有助于通过额外的功能和能力增强合并后的模型。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher or a similar type representing a model structure

# Output types
- merged_model
    - 'merge'方法的输出是一个从输入模型合并而成的单一模型。该模型现在封装了两个原始模型的结合优势和功能。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher or a similar type representing the merged model structure

# Usage tips
- Infra type: CPU

# Source code
```
class ModelAdd:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model1': ('MODEL',), 'model2': ('MODEL',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, model1, model2):
        m = model1.clone()
        kp = model2.get_key_patches('diffusion_model.')
        for k in kp:
            m.add_patches({k: kp[k]}, 1.0, 1.0)
        return (m,)
```