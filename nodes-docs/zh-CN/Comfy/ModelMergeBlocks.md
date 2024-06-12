# Documentation
- Class name: ModelMergeBlocks
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelMergeBlocks节点的'merge'函数旨在将两个不同的模型融合为一个统一的结构。它通过克隆第一个模型，然后根据指定的比例应用第二个模型的关键补丁来实现这一点。这个过程允许创建一个结合了两个原始模型优势的混合模型，增强了其整体的预测能力。

# Input types
## Required
- model1
    - 参数'model1'是要被克隆并作为合并过程基础的第一个模型。它是一个关键组件，因为它决定了生成的混合模型的初始结构。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 参数'model2'代表将从中提取关键补丁并应用到克隆模型的第二个模型。这些补丁对于将第二个模型的特征融入合并后的模型至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- input
    - 参数'input'是一个浮点值，用作合并过程中的默认比例。它决定了第二个模型补丁对最终模型的影响，并且可以调整以微调合并结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- middle
    - 参数'middle'是另一个浮点值，可用于指定合并过程中某些补丁的不同比例。它提供了对模型如何合并的额外控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- out
    - 参数'out'是一个浮点值，用于定义合并过程的输出比例。它用于平衡原始模型对最终混合模型的贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 输出'merged_model'是合并过程的结果，将输入模型的特征结合成单一、紧密的结构。它代表了节点功能的顶点，提供了一个具有增强能力集的新模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class ModelMergeBlocks:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model1': ('MODEL',), 'model2': ('MODEL',), 'input': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'middle': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'out': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'merge'
    CATEGORY = 'advanced/model_merging'

    def merge(self, model1, model2, **kwargs):
        m = model1.clone()
        kp = model2.get_key_patches('diffusion_model.')
        default_ratio = next(iter(kwargs.values()))
        for k in kp:
            ratio = default_ratio
            k_unet = k[len('diffusion_model.'):]
            last_arg_size = 0
            for arg in kwargs:
                if k_unet.startswith(arg) and last_arg_size < len(arg):
                    ratio = kwargs[arg]
                    last_arg_size = len(arg)
            m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)
        return (m,)
```