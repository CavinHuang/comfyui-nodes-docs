# Documentation
- Class name: LoraLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoraLoader节点旨在管理加载和应用LoRA（低秩适应）修改到模型中。它高效地处理将LoRA调整集成到模型和clip组件中，允许以最小的计算开销微调模型行为。该节点抽象了LoRA应用的复杂性，为模型增强提供了一个简化的接口。

# Input types
## Required
- model
    - model参数至关重要，因为它代表了将通过LoRA技术进行修改的基础模型。它的重要性在于它是增强的主要对象，直接影响节点的执行和模型功能的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数指定了CLIP架构的条件阶段模型，该模型也可能受到LoRA修改的影响。它的作用很重要，因为它决定了文本信息与视觉模型是如何联合处理的。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_name
    - lora_name参数标识要加载的特定LoRA配置。它至关重要，因为它决定了将应用于模型的修改集，从而塑造节点的功能和模型的适应行为。
    - Comfy dtype: folder_paths.get_filename_list('loras')
    - Python dtype: str
## Optional
- strength_model
    - strength_model参数调整应用于模型的LoRA修改的强度。它在微调模型行为中起着关键作用，提供了原始模型和适应后模型能力之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - strength_clip参数允许调整LoRA修改对CLIP模型的影响。它很重要，因为它控制了文本信息处理受LoRA技术影响的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model_lora
    - model_lora输出代表了应用了LoRA修改的模型。它很重要，因为它是节点操作的直接结果，包含了模型增强后的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip_lora
    - clip_lora输出表示集成了LoRA调整的CLIP模型。它的重要性在于展示通过LoRA技术文本信息处理是如何被适应的。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LoraLoader:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'lora_name': (folder_paths.get_filename_list('loras'),), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -20.0, 'max': 20.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -20.0, 'max': 20.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL', 'CLIP')
    FUNCTION = 'load_lora'
    CATEGORY = 'loaders'

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)
        lora_path = folder_paths.get_full_path('loras', lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                temp = self.loaded_lora
                self.loaded_lora = None
                del temp
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)
        (model_lora, clip_lora) = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora)
```