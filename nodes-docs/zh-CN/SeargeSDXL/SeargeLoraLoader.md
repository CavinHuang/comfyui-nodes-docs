# Documentation
- Class name: SeargeLoraLoader
- Category: Searge/_deprecated_/Files
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点便于加载和整合LORA（低秩适应）模型，这对于微调预训练模型以适应特定任务或数据集至关重要。它使用户能够通过调整LORA层和CLIP模型的影响来增强模型性能，从而为给定的数据集实现定制化的表示。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了LORA适应性调整的基础。它决定了在进行任何微调之前模型的初始理解和能力。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - clip参数对于整个过程至关重要，它代表了将与LORA模型结合使用的CLIP模型组件，以产生协同效应，增强最终模型的整体表示和适应性。
    - Comfy dtype: CLIP
    - Python dtype: Any
- lora_name
    - lora_name参数指定了LORA层的身份，这对于区分各种LORA配置并在适应性过程中使用正确的层至关重要。
    - Comfy dtype: LORA_NAME
    - Python dtype: str
- strength_model
    - strength_model参数调整LORA层对整体模型的影响，允许对模型的表示进行微调，以更好地适应目标数据集的特定特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - strength_clip参数调节CLIP模型组件的影响，确保CLIP和LORA模型的结合针对期望的结果进行了优化。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 输出模型代表了LORA和CLIP整合的成果，提供了一个增强和适应性的表示，准备好进行进一步的处理或评估。
    - Comfy dtype: MODEL
    - Python dtype: Any
- CLIP
    - 输出中的CLIP组件标志着与LORA模型的成功整合，确保模型具备了理解和基于目标数据集生成内容所需的能力。
    - Comfy dtype: CLIP
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeLoraLoader:

    def __init__(self):
        self.lora_loader = nodes.LoraLoader()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'lora_name': ('LORA_NAME',), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL', 'CLIP')
    FUNCTION = 'load_lora'
    CATEGORY = 'Searge/_deprecated_/Files'

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        return self.lora_loader.load_lora(model, clip, lora_name, strength_model, strength_clip)
```