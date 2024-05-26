# Documentation
- Class name: LLLiteLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

LLLiteLoader节点旨在便于轻量级模型的集成，通过加入额外的模型功能来增强系统的整体处理能力。

# Input types
## Required
- model
    - 模型参数至关重要，它定义了节点将使用和修改的基础架构，显著影响节点的输出和行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model_name
    - 该参数对于从列表中选择适当的模型至关重要，根据所选模型的特性和预期应用引导节点的处理。
    - Comfy dtype: COMBO
    - Python dtype: str
- cond_image
    - cond_image参数很重要，因为它提供了模型适应其输出到特定条件所需的上下文信息，影响最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
## Optional
- strength
    - strength参数调整模型对条件的适应强度，可用于微调节点的输出以满足不同要求。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - steps参数定义了模型将经历的迭代次数，这直接影响节点处理的复杂性和准确性。
    - Comfy dtype: INT
    - Python dtype: int
- start_percent
    - 该参数设置了模型适应过程的起点，影响初始条件和节点执行的进展。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - end_percent参数确定了模型适应的终点，影响节点操作的最终状态和结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是节点处理的结果，包含了适应的特性和条件，准备好在后续任务中使用。
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

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'lllite' in file]
        return {'required': {'model': ('MODEL',), 'model_name': (get_file_list(folder_paths.get_filename_list('controlnet')),), 'cond_image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'steps': ('INT', {'default': 0, 'min': 0, 'max': 200, 'step': 1}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.1}), 'end_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.1})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_lllite'
    CATEGORY = 'EasyUse/Loaders'

    def load_lllite(self, model, model_name, cond_image, strength, steps, start_percent, end_percent):
        model_path = os.path.join(folder_paths.get_full_path('controlnet', model_name))
        model_lllite = model.clone()
        patch = load_control_net_lllite_patch(model_path, cond_image, strength, steps, start_percent, end_percent)
        if patch is not None:
            model_lllite.set_model_attn1_patch(patch)
            model_lllite.set_model_attn2_patch(patch)
        return (model_lllite,)
```