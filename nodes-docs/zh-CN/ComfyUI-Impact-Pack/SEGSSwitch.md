# Documentation
- Class name: GeneralSwitch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GeneralSwitch节点旨在根据选择的索引管理和路由数据。它根据提供的索引选择一个输入，并从工作流的节点信息中检索相应的标签。该节点在工作流中的决策过程中起着关键作用，允许执行条件路径。

# Input types
## Required
- select
    - 参数'select'对于确定节点将处理哪个输入至关重要。它指示节点用于识别工作流中进一步操作的正确输入的选择索引。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- sel_mode
    - 参数'sel_mode'允许用户指定选择应基于提示还是执行上下文。这可以影响节点如何解释和响应输入，影响工作流的整体行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- input1
    - 参数'input1'作为可选输入提供给节点。它的作用是提供额外的灵活性，处理各种类型的数据，增强节点在不同工作流场景中的适应性。
    - Comfy dtype: ANY
    - Python dtype: Any
- unique_id
    - 参数'unique_id'用于在内部标识工作流中的特定节点。它在节点引用自己的输入和配置设置的能力中起着至关重要的作用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - 参数'extra_pnginfo'包含有关工作流中节点视觉表示的额外信息。它有助于自定义节点的外观并提供相关上下文信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- selected_value
    - 输出'selected_value'代表基于输入索引选择的数据。它是节点操作的关键组成部分，因为它决定了将传递给后续处理的数据。
    - Comfy dtype: ANY
    - Python dtype: Any
- selected_label
    - 输出'selected_label'提供与所选输入关联的标签。这对于提供有关正在处理的数据的上下文或额外信息非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- selected_index
    - 输出'selected_index'指示用于选择输入的索引。它可以作为在工作流中跟踪选择的参考。
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