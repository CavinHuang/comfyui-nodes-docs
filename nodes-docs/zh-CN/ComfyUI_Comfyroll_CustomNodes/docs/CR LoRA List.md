# Documentation
- Class name: CR_LoRAList
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoRAList节点旨在管理和编译LoRA（低秩适应）配置列表。它允许用户指定多个LoRA设置，每个设置都有别名、模型强度和剪辑强度，然后将它们组合成一个单一的列表。该节点在通过LoRA技术定制和增强模型行为中发挥着关键作用。

# Input types
## Required
- lora_name1
    - 参数'lora_name1'对于指定第一个LoRA配置至关重要。它决定了要使用的LoRA文件，并且显著影响节点的定制能力。
    - Comfy dtype: STRING
    - Python dtype: str
- model_strength_1
    - 参数'model_strength_1'调整第一个LoRA配置对模型的影响，允许对模型行为进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength_1
    - 参数'clip_strength_1'控制第一个LoRA配置的剪辑强度，这对于在训练期间保持模型的稳定性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- alias1
    - 参数'alias1'为第一个LoRA配置提供用户定义的名称，增强了LoRA列表中的可读性和可管理性。
    - Comfy dtype: STRING
    - Python dtype: str
- lora_name2
    - 参数'lora_name2'类似于'lora_name1'，指定要包含在列表中的第二个LoRA配置，提供更多的定制选项。
    - Comfy dtype: STRING
    - Python dtype: str
- alias2
    - 参数'alias2'为第二个LoRA配置分配别名，以便在编译的列表中更容易引用和管理。
    - Comfy dtype: STRING
    - Python dtype: str
- model_strength_2
    - 参数'model_strength_2'用于调整第二个LoRA配置的影响，使用户能够控制模型的适应性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength_2
    - 参数'clip_strength_2'设置第二个LoRA配置的剪辑强度，在模型训练稳定性中发挥作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_name3
    - 参数'lora_name3'定义了要考虑列入列表的第三个LoRA配置，进一步扩大了定制范围。
    - Comfy dtype: STRING
    - Python dtype: str
- alias3
    - 参数'alias3'允许用户为第三个LoRA配置分配自定义名称，以便于在列表中更好地识别和组织。
    - Comfy dtype: STRING
    - Python dtype: str
- model_strength_3
    - 参数'model_strength_3'修改第三个LoRA配置的效果，允许对模型性能进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_strength_3
    - 参数'clip_strength_3'确定第三个LoRA配置的剪辑强度，这对于模型的稳健训练过程至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_list
    - 参数'lora_list'是可选的，允许用户提供一个现有的LoRA配置列表，由节点追加或修改。
    - Comfy dtype: LORA_LIST
    - Python dtype: List[Tuple[str, str, float, float]]

# Output types
- LORA_LIST
    - 'LORA_LIST'输出包含编译后的LoRA配置列表，可以直接用于后续的模型操作。
    - Comfy dtype: LORA_LIST
    - Python dtype: List[Tuple[str, str, float, float]]
- show_text
    - 'show_text'输出提供LoRA列表的文本表示，这对于显示或记录目的非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoRAList:

    @classmethod
    def INPUT_TYPES(cls):
        lora_files = ['None'] + folder_paths.get_filename_list('loras')
        return {'required': {'lora_name1': (lora_files,), 'alias1': ('STRING', {'multiline': False, 'default': ''}), 'model_strength_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_strength_1': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_name2': (lora_files,), 'alias2': ('STRING', {'multiline': False, 'default': ''}), 'model_strength_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_strength_2': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_name3': (lora_files,), 'alias3': ('STRING', {'multiline': False, 'default': ''}), 'model_strength_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'clip_strength_3': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'lora_list': ('lora_LIST',)}}
    RETURN_TYPES = ('LORA_LIST', 'STRING')
    RETURN_NAMES = ('LORA_LIST', 'show_text')
    FUNCTION = 'lora_list'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def lora_list(self, lora_name1, model_strength_1, clip_strength_1, alias1, lora_name2, model_strength_2, clip_strength_2, alias2, lora_name3, model_strength_3, clip_strength_3, alias3, lora_list=None):
        loras = list()
        lora_text = list()
        if lora_list is not None:
            loras.extend([l for l in lora_list if l[0] != None])
            lora_text += '\n'.join(map(str, lora_list)) + '\n'
        if lora_name1 != 'None':
            lora1_tup = [(alias1, lora_name1, model_strength_1, clip_strength_1)]
            (loras.extend(lora1_tup),)
            lora_text += '\n'.join(map(str, lora1_tup)) + '\n'
        if lora_name2 != 'None':
            lora2_tup = [(alias2, lora_name2, model_strength_2, clip_strength_2)]
            (loras.extend(lora2_tup),)
            lora_text += '\n'.join(map(str, lora2_tup)) + '\n'
        if lora_name3 != 'None':
            lora3_tup = [(alias3, lora_name3, model_strength_3, clip_strength_3)]
            (loras.extend(lora3_tup),)
            lora_text += '\n'.join(map(str, lora3_tup)) + '\n'
        show_text = ''.join(lora_text)
        return (loras, show_text)
```