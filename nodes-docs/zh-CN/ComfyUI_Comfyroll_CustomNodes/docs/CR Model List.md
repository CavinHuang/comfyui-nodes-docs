# Documentation
- Class name: CR_ModelList
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModelList节点旨在管理和编译模型列表，每个模型都与一个检查点文件和一个别名相关联。它便于组织和检索模型检查点，以便进一步处理或动画任务。该节点通过使用户能够指定多个检查点及其相应的别名，从而在模型管理中发挥关键作用，提高了工作流程的效率。

# Input types
## Required
- ckpt_name1
    - ckpt_name1参数对于识别与模型相关联的第一个检查点文件至关重要。它是节点操作的关键组成部分，因为它直接影响列表中模型检查点的选择和组织。
    - Comfy dtype: STRING
    - Python dtype: str
- alias1
    - alias1作为第一个检查点的替代名称或标识符，允许在模型列表中更容易地引用和管理。它通过为检查点提供用户友好的命名约定，增强了节点的功能。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- ckpt_name2
    - ckpt_name2参数是可选的，可以用来指定模型列表中的第二个检查点文件。它通过允许在模型管理过程中包含额外的检查点，扩展了节点的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- alias2
    - alias2是一个可选参数，它为第二个检查点提供替代名称，通过为检查点提供可定制的命名选项，增强了节点的灵活性和用户友好性。
    - Comfy dtype: STRING
    - Python dtype: str
- model_list
    - model_list参数是可选的，允许用户输入一个预先存在的模型列表。这个参数通过使外部模型列表能够集成到节点的操作中，增强了节点的适应性。
    - Comfy dtype: MODEL_LIST
    - Python dtype: List[Tuple[str, str]]

# Output types
- MODEL_LIST
    - MODEL_LIST输出参数代表了编译后的模型列表，包括与之相关的检查点和别名。它是一个重要的输出，因为它涵盖了节点组织和管理模型检查点的主要功能。
    - Comfy dtype: MODEL_LIST
    - Python dtype: List[Tuple[str, str]]
- show_text
    - show_text输出参数提供了模型列表的文本表示，这对于显示或记录目的非常有用。它反映了节点生成模型检查点的人类可读摘要的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModelList:

    @classmethod
    def INPUT_TYPES(cls):
        checkpoint_files = ['None'] + folder_paths.get_filename_list('checkpoints')
        return {'required': {'ckpt_name1': (checkpoint_files,), 'alias1': ('STRING', {'multiline': False, 'default': ''}), 'ckpt_name2': (checkpoint_files,), 'alias2': ('STRING', {'multiline': False, 'default': ''}), 'ckpt_name3': (checkpoint_files,), 'alias3': ('STRING', {'multiline': False, 'default': ''}), 'ckpt_name4': (checkpoint_files,), 'alias4': ('STRING', {'multiline': False, 'default': ''}), 'ckpt_name5': (checkpoint_files,), 'alias5': ('STRING', {'multiline': False, 'default': ''})}, 'optional': {'model_list': ('MODEL_LIST',)}}
    RETURN_TYPES = ('MODEL_LIST', 'STRING')
    RETURN_NAMES = ('MODEL_LIST', 'show_text')
    FUNCTION = 'model_list'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def model_list(self, ckpt_name1, alias1, ckpt_name2, alias2, ckpt_name3, alias3, ckpt_name4, alias4, ckpt_name5, alias5, model_list=None):
        models = list()
        model_text = list()
        if model_list is not None:
            models.extend([l for l in model_list if l[0] != None])
            model_text += '\n'.join(map(str, model_list)) + '\n'
        if ckpt_name1 != 'None':
            model1_tup = [(alias1, ckpt_name1)]
            (models.extend(model1_tup),)
            model_text += '\n'.join(map(str, model1_tup)) + '\n'
        if ckpt_name2 != 'None':
            model2_tup = [(alias2, ckpt_name2)]
            (models.extend(model2_tup),)
            model_text += '\n'.join(map(str, model2_tup)) + '\n'
        if ckpt_name3 != 'None':
            model3_tup = [(alias3, ckpt_name3)]
            (models.extend(model3_tup),)
            model_text += '\n'.join(map(str, model3_tup)) + '\n'
        if ckpt_name4 != 'None':
            model4_tup = [(alias4, ckpt_name4)]
            (models.extend(model4_tup),)
            model_text += '\n'.join(map(str, model4_tup)) + '\n'
        if ckpt_name5 != 'None':
            model5_tup = [(alias5, ckpt_name5)]
            (models.extend(model5_tup),)
            model_text += '\n'.join(map(str, model5_tup)) + '\n'
        show_text = ''.join(model_text)
        return (models, show_text)
```