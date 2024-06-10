# Documentation
- Class name: CR_LoRAStack
- Category: Comfyroll/LoRA
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoRAStack节点旨在管理和组合多个LoRA（低秩适应）层到一个单一的栈中。它允许用户切换每个LoRA层的包含，设置模型权重，并剪辑权重以微调每个层对最终输出的贡献。该节点的功能集中在堆叠LoRA层以增强模型性能，而不会显著增加计算成本。

# Input types
## Required
- switch_1
    - 开关参数决定是否将第一个LoRA层包含在栈中。它对控制最终LoRA栈的组成至关重要。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name_1
    - lora_name_1参数指定了可能包含在栈中的第一个LoRA层的名称。它在识别堆叠过程中的特定LoRA层中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- model_weight_1
    - model_weight_1参数调整第一个LoRA层对最终输出的影响。对于微调每个层的贡献至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_1
    - clip_weight_1参数用于剪辑或限制第一个LoRA层的权重，防止其过度支配最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_2
    - 第二个LoRA层的开关参数决定其是否包含在栈中。它在决定LoRA栈的最终结构中起着关键作用。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name_2
    - lora_name_2参数指明要考虑加入栈的第二个LoRA层的名称。它是识别堆叠LoRA层的一个关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- model_weight_2
    - model_weight_2参数修改第二个LoRA层对最终结果的影响。它对于校准该层的贡献是不可或缺的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_2
    - clip_weight_2参数负责剪辑第二个LoRA层的权重，以保持最终输出的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- switch_3
    - 第三个LoRA层的开关参数控制其在栈中的存在。它是LoRA栈形成中的一个关键元素。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- lora_name_3
    - lora_name_3参数识别可能包含在栈中的第三个LoRA层。它对于LoRA层的选择过程至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- model_weight_3
    - model_weight_3参数影响第三个LoRA层对最终结果的影响。对于调整该层的影响至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_weight_3
    - clip_weight_3参数剪辑第三个LoRA层的权重，以确保它不会对最终栈的输出产生不成比例的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- lora_stack
    - lora_stack参数允许使用现有层预填充LoRA栈。它适用于从先前状态继续工作。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- LORA_STACK
    - LORA_STACK输出是一个元组列表，表示堆叠的LoRA层及其相应的权重和剪辑值。这是节点操作的主要结果。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]
- show_help
    - show_help输出提供了一个URL链接到文档，以获取有关节点使用的更多帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoRAStack:

    @classmethod
    def INPUT_TYPES(cls):
        loras = ['None'] + folder_paths.get_filename_list('loras')
        return {'required': {'switch_1': (['Off', 'On'],), 'lora_name_1': (loras,), 'model_weight_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'switch_2': (['Off', 'On'],), 'lora_name_2': (loras,), 'model_weight_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'switch_3': (['Off', 'On'],), 'lora_name_3': (loras,), 'model_weight_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_weight_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'lora_stack': ('LORA_STACK',)}}
    RETURN_TYPES = ('LORA_STACK', 'STRING')
    RETURN_NAMES = ('LORA_STACK', 'show_help')
    FUNCTION = 'lora_stacker'
    CATEGORY = icons.get('Comfyroll/LoRA')

    def lora_stacker(self, lora_name_1, model_weight_1, clip_weight_1, switch_1, lora_name_2, model_weight_2, clip_weight_2, switch_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, lora_stack=None):
        lora_list = list()
        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != 'None'])
        if lora_name_1 != 'None' and switch_1 == 'On':
            (lora_list.extend([(lora_name_1, model_weight_1, clip_weight_1)]),)
        if lora_name_2 != 'None' and switch_2 == 'On':
            (lora_list.extend([(lora_name_2, model_weight_2, clip_weight_2)]),)
        if lora_name_3 != 'None' and switch_3 == 'On':
            (lora_list.extend([(lora_name_3, model_weight_3, clip_weight_3)]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-lora-stack'
        return (lora_list, show_help)
```