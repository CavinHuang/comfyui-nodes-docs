# Documentation
- Class name: LoraLoaderModelOnly
- Category: Model Loading
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoraLoaderModelOnly节点旨在高效地加载并集成Lora模型到现有的模型架构中。它通过应用Lora调整来增强基础模型的能力，允许进行专门的修改而无需重新加载完整模型。

# Input types
## Required
- model
    - 'model'参数非常关键，因为它代表了将要整合Lora调整的基础模型。它对节点的执行至关重要，因为它决定了将要修改的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- lora_name
    - 'lora_name'参数指定要加载的Lora文件的名称。它对于识别需要应用于基础模型的正确Lora模型至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- strength_model
    - 'strength_model'参数允许用户控制应用于模型的Lora调整的强度。它在微调模型性能中扮演着重要角色。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 'model'输出代表了带有集成Lora调整的修改后的模型。它是节点功能的成果，提供了一个通过指定的Lora修改增强的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LoraLoaderModelOnly(LoraLoader):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'lora_name': (folder_paths.get_filename_list('loras'),), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -20.0, 'max': 20.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_lora_model_only'

    def load_lora_model_only(self, model, lora_name, strength_model):
        return (self.load_lora(model, None, lora_name, strength_model, 0)[0],)
```