# Documentation
- Class name: LLLiteLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/kohya-ss/ControlNet-LLLite-ComfyUI.git

LLLiteLoader 类旨在高效加载和处理模型，使得能够将控制机制集成到模型架构中。它抽象了模型加载和调节的复杂性，专注于无缝适应模型到特定的条件和要求。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将要被调节和修改的基础架构。它是LLLiteLoader功能起点，决定了将要处理的模型类型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model_name
    - 模型名称参数对于识别要加载的特定模型文件至关重要。它指导LLLiteLoader在文件系统中找到正确的模型，确保选择了正确的模型进行处理。
    - Comfy dtype: STRING
    - Python dtype: str
- cond_image
    - cond_image 参数作为调节输入，影响模型的行为和输出。它是模型适应过程中的关键组成部分，允许基于视觉上下文进行微调。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - strength 参数调整调节效应对模型的强度。它在确定调节输入对模型最终输出影响程度方面发挥重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - steps 参数定义了调节过程中使用的间隔数。它对模型的进展和调节效应在整个过程中的分布很重要。
    - Comfy dtype: INT
    - Python dtype: int
- start_percent
    - start_percent 参数指定了调节间隔的开始，决定了模型开始适应调节输入的时间。它是控制模型响应时间的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - end_percent 参数标记了调节间隔的结束，定义了模型适应调节输入的结束时间。它是确定模型响应持续时间的关键。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是LLLiteLoader处理的结果，包含了调节输入和调整。它代表了模型经过整个调节过程后的最终状态，准备用于进一步的使用或评估。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LLLiteLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'model_name': (get_file_list(os.path.join(CURRENT_DIR, 'models')),), 'cond_image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'steps': ('INT', {'default': 0, 'min': 0, 'max': 200, 'step': 1}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.1}), 'end_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.1})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_lllite'
    CATEGORY = 'loaders'

    def load_lllite(self, model, model_name, cond_image, strength, steps, start_percent, end_percent):
        model_path = os.path.join(CURRENT_DIR, os.path.join(CURRENT_DIR, 'models', model_name))
        model_lllite = model.clone()
        patch = load_control_net_lllite_patch(model_path, cond_image, strength, steps, start_percent, end_percent)
        if patch is not None:
            model_lllite.set_model_attn1_patch(patch)
            model_lllite.set_model_attn2_patch(patch)
        return (model_lllite,)
```