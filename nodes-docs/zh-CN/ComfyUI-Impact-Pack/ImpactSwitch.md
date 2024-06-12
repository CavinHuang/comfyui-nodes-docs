# Documentation
- Class name: GeneralSwitch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GeneralSwitch节点旨在通过选择特定索引的输入来管理工作流中的数据流。它通过评估提供的索引并确定相应的输入进行处理来操作。该节点在系统中的决策过程中发挥关键作用，确保正确的数据被引导到后续操作中。

# Input types
## Required
- select
    - 'select'参数至关重要，因为它决定了将由节点处理的输入。它作为决策因素，允许节点从可用选项中识别并选择适当的输入。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- sel_mode
    - 'sel_mode'参数用于确定选择是基于提示还是执行上下文。它在节点解释和对选择标准做出反应的方式上提供了灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- input1
    - 'input1'参数是一个可选输入，可以提供给节点。它允许处理的数据类型更加灵活，增强了节点在各种工作流中的适应性。
    - Comfy dtype: ANY
    - Python dtype: Any
- unique_id
    - 'unique_id'参数是一个隐藏字段，有助于在工作流中识别特定节点。它对于内部跟踪很重要，并确保节点的操作与其在工作流中的位置正确关联。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - 'extra_pnginfo'参数包含与节点操作相关的额外信息，如工作流详细信息。它在内部用于促进节点与更广泛系统的交互。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- selected_value
    - 'selected_value'输出代表了节点根据提供的索引选择的数据。这是一个关键的输出，因为它决定了数据流向工作流中后续节点的过程。
    - Comfy dtype: ANY
    - Python dtype: Any
- selected_label
    - 'selected_label'输出提供了与选定输入关联的标签。这对于调试和提供节点决策过程的上下文非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- selected_index
    - 'selected_index'输出指示用于选择输入的索引。它作为节点所做的决定的记录，对于审计和跟踪目的可能很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GeneralSwitch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'select': ('INT', {'default': 1, 'min': 1, 'max': 999999, 'step': 1}), 'sel_mode': ('BOOLEAN', {'default': True, 'label_on': 'select_on_prompt', 'label_off': 'select_on_execution', 'forceInput': False})}, 'optional': {'input1': (any_typ,)}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = (any_typ, 'STRING', 'INT')
    RETURN_NAMES = ('selected_value', 'selected_label', 'selected_index')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, *args, **kwargs):
        selected_index = int(kwargs['select'])
        input_name = f'input{selected_index}'
        selected_label = input_name
        node_id = kwargs['unique_id']
        nodelist = kwargs['extra_pnginfo']['workflow']['nodes']
        for node in nodelist:
            if str(node['id']) == node_id:
                inputs = node['inputs']
                for slot in inputs:
                    if slot['name'] == input_name and 'label' in slot:
                        selected_label = slot['label']
                break
        if input_name in kwargs:
            return (kwargs[input_name], selected_label, selected_index)
        else:
            print(f'ImpactSwitch: invalid select index (ignored)')
            return (None, '', selected_index)
```