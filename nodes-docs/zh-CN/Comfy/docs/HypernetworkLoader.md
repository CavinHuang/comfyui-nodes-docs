# Documentation
- Class name: HypernetworkLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

HypernetworkLoader 类旨在方便地加载和集成超网络到现有的神经网络模型中。它通过应用基于提供的强度参数动态生成的超网络补丁来增强模型的能力。

# Input types
## Required
- model
    - 模型参数是必需的，因为它代表了将通过超网络进行增强的神经网络。它是将被修改以包含超网络功能的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- hypernetwork_name
    - hypernetwork_name 参数指定要加载的超网络的名称。它是一个关键的输入，因为它决定了将应用于模型的哪个超网络补丁。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- strength
    - 强度参数决定了超网络对模型的影响。它是一个可选输入，允许微调超网络效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是已经通过超网络补丁增强的原始神经网络模型。它现在配备了利用超网络提供的额外能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class HypernetworkLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'hypernetwork_name': (folder_paths.get_filename_list('hypernetworks'),), 'strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_hypernetwork'
    CATEGORY = 'loaders'

    def load_hypernetwork(self, model, hypernetwork_name, strength):
        hypernetwork_path = folder_paths.get_full_path('hypernetworks', hypernetwork_name)
        model_hypernetwork = model.clone()
        patch = load_hypernetwork_patch(hypernetwork_path, strength)
        if patch is not None:
            model_hypernetwork.set_model_attn1_patch(patch)
            model_hypernetwork.set_model_attn2_patch(patch)
        return (model_hypernetwork,)
```