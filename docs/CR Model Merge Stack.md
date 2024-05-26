# Documentation
- Class name: CR_ModelMergeStack
- Category: Comfyroll/Model Merge
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModelMergeStack节点旨在将多个模型检查点合并为一个统一的栈。它允许用户切换包含每个检查点，并调整模型和剪辑组件的贡献比例，为基于特定需求合并不同模型提供了灵活的方法。

# Input types
## Required
- switch_1
    - switch_1参数决定是否将第一个检查点包含在模型栈中。它在节点的操作中起着关键作用，通过启用或禁用特定检查点的集成来发挥作用。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- ckpt_name1
    - ckpt_name1参数指定要潜在包含在模型栈中的第一个检查点文件的名称。这对于识别要合并的特定模型至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- model_ratio1
    - model_ratio1参数调整第一个检查点的模型组件在合并栈中的贡献权重。它对于微调每个模型在最终输出中的影响很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_ratio1
    - clip_ratio1参数设置第一个检查点的剪辑组件的贡献权重。它对于平衡剪辑指导在合并模型栈中的整体影响很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_2
    - switch_2参数控制第二个检查点是否包含在模型栈中。与switch_1类似，它对于选择哪些检查点被集成到最终栈中至关重要。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- ckpt_name2
    - ckpt_name2参数识别可能包含在模型栈中的第二个检查点文件。它是确定要合并的模型的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- model_ratio2
    - model_ratio2参数修改第二个检查点的模型组件在栈中的权重。它影响该模型的特征在合并输出中的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_ratio2
    - clip_ratio2参数定义第二个检查点的剪辑组件的权重，影响剪辑指导在合并的模型栈中被考虑的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_3
    - switch_3参数决定是否将第三个检查点包含在模型栈中。它是控制最终栈组成的另一个关键开关。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- ckpt_name3
    - ckpt_name3参数指定可能是模型栈一部分的第三个检查点文件。将特定模型包含在合并过程中至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- model_ratio3
    - model_ratio3参数调整第三个检查点的模型组件在合并栈中的影响。它对模型贡献的总体平衡很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_ratio3
    - clip_ratio3参数设置第三个检查点的剪辑组件在栈中的影响水平。它对合并模型栈中剪辑指导的最终混合很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- model_stack
    - 可选的model_stack参数允许用户提供一个要合并的初始模型列表。它对于在现有模型栈的基础上构建很有用。
    - Comfy dtype: MODEL_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- MODEL_STACK
    - MODEL_STACK输出包含具有各自比率的合并模型检查点列表。它是节点操作的主要结果，代表了合并的模型栈。
    - Comfy dtype: MODEL_STACK
    - Python dtype: List[Tuple[str, float, float]]
- show_help
    - show_help输出提供了一个指向文档的URL链接，以获取更多帮助。它将用户引导到外部资源，以获取有关节点功能更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModelMergeStack:

    @classmethod
    def INPUT_TYPES(cls):
        checkpoint_files = ['None'] + folder_paths.get_filename_list('checkpoints')
        return {'required': {'switch_1': (['Off', 'On'],), 'ckpt_name1': (checkpoint_files,), 'model_ratio1': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01}), 'clip_ratio1': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01}), 'switch_2': (['Off', 'On'],), 'ckpt_name2': (checkpoint_files,), 'model_ratio2': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01}), 'clip_ratio2': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01}), 'switch_3': (['Off', 'On'],), 'ckpt_name3': (checkpoint_files,), 'model_ratio3': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01}), 'clip_ratio3': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01})}, 'optional': {'model_stack': ('MODEL_STACK',)}}
    RETURN_TYPES = ('MODEL_STACK', 'STRING')
    RETURN_NAMES = ('MODEL_STACK', 'show_help')
    FUNCTION = 'list_checkpoints'
    CATEGORY = icons.get('Comfyroll/Model Merge')

    def list_checkpoints(self, switch_1, ckpt_name1, model_ratio1, clip_ratio1, switch_2, ckpt_name2, model_ratio2, clip_ratio2, switch_3, ckpt_name3, model_ratio3, clip_ratio3, model_stack=None):
        model_list = list()
        if model_stack is not None:
            model_list.extend([l for l in model_stack if l[0] != 'None'])
        if ckpt_name1 != 'None' and switch_1 == 'On':
            (model_list.extend([(ckpt_name1, model_ratio1, clip_ratio1)]),)
        if ckpt_name2 != 'None' and switch_2 == 'On':
            (model_list.extend([(ckpt_name2, model_ratio2, clip_ratio2)]),)
        if ckpt_name3 != 'None' and switch_3 == 'On':
            (model_list.extend([(ckpt_name3, model_ratio3, clip_ratio3)]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Model-Merge-Nodes#cr-model-stack'
        return (model_list, show_help)
```