# Documentation
- Class name: showAnything
- Category: EasyUse/Logic
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

showAnything节点类作为一个多功能接口，用于记录和处理多样化的输入数据，便于在工作流中管理和可视化各种类型的信息。

# Input types
## Optional
- anything
    - ‘anything’参数是使节点能够适应各种输入数据的关键元素，确保在多样化的处理场景中具有灵活性和适应性。
    - Comfy dtype: COMBO[*]
    - Python dtype: Union[str, int, float, list, dict, None]
- unique_id
    - ‘unique_id’参数对于将输入值与特定工作流节点关联至关重要，允许在工作流结构内进行有针对性的数据操作和跟踪。
    - Comfy dtype: str
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含节点操作可能必需的额外信息，根据工作流的上下文影响节点的处理和输出。
    - Comfy dtype: list
    - Python dtype: List[Dict[str, Any]]

# Output types
- ui
    - ‘ui’输出参数是节点结果的结构化表示，专注于在用户界面内提供清晰、简洁的可视化处理数据。
    - Comfy dtype: dict
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class showAnything:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'anything': (AlwaysEqualProxy('*'), {})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    INPUT_IS_LIST = True
    OUTPUT_NODE = True
    FUNCTION = 'log_input'
    CATEGORY = 'EasyUse/Logic'

    def log_input(self, unique_id=None, extra_pnginfo=None, **kwargs):
        values = []
        if 'anything' in kwargs:
            for val in kwargs['anything']:
                try:
                    if type(val) is str:
                        values.append(val)
                    else:
                        val = json.dumps(val)
                        values.append(str(val))
                except Exception:
                    values.append(str(val))
                    pass
        if unique_id and extra_pnginfo and ('workflow' in extra_pnginfo[0]):
            workflow = extra_pnginfo[0]['workflow']
            node = next((x for x in workflow['nodes'] if str(x['id']) == unique_id[0]), None)
            if node:
                node['widgets_values'] = [values]
        return {'ui': {'text': values}}
```