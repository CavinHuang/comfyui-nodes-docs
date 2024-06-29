# Documentation
- Class name: GeneralSwitch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GeneralSwitch节点旨在根据选择索引管理数据流。它通过评估提供的选项索引来确定活动输入，然后将相应的输入路由到输出。该节点在工作流中的决策过程中发挥关键作用，允许基于用户定义的标准进行条件分支。

# Input types
## Required
- select
    - “select”参数对于确定将由节点处理的输入至关重要。它指定应视为活动的输入的索引。节点的功能在很大程度上依赖于此参数来执行其决策任务。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- sel_mode
    - “sel_mode”参数决定选择是基于提示还是执行上下文进行的。这可以影响节点如何解释选择，进而影响节点的执行流程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- input1
    - “input1”参数作为可选输入提供给节点。其作用是提供节点数据处理能力的额外灵活性，允许对各种输入场景进行更多样化的处理。
    - Comfy dtype: ANY
    - Python dtype: Any
- unique_id
    - “unique_id”参数用于在工作流内标识节点。它在节点能够引用其在更大系统中自己的位置和上下文的能力中起着至关重要的作用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - “extra_pnginfo”参数包含节点正常运行可能需要的额外信息。它为节点提供了可以增强其操作能力的特定上下文的详细信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- selected_value
    - “selected_value”输出代表了节点根据提供的选项索引选择的输入值。它是一个关键的输出，因为它携带了将被进一步处理或在工作流下游使用的数据处理。
    - Comfy dtype: ANY
    - Python dtype: Any
- selected_label
    - “selected_label”输出提供了与选定输入相关联的标签。这对于为选定数据提供人类可读的标识符非常有用，增强了节点输出的可解释性。
    - Comfy dtype: STRING
    - Python dtype: str
- selected_index
    - “selected_index”输出表明了被选择输入的索引。它作为记录节点决策过程的记录，并可在工作流中用于跟踪或记录目的。
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