# Documentation
- Class name: CreateCkptNames
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点促进了机器学习项目中检查点名称的组织和管理，使用户能够处理和筛选检查点名称列表，以进行进一步的分析或恢复。

# Input types
## Required
- ckpt_names
    - 输入参数是检查点名称的字符串，对于节点识别和处理检查点至关重要。它通过确定被过滤和组织的内容来影响节点的操作。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ckpt_names
    - 输出是处理过的检查点名称列表，对于进一步的操作如加载特定检查点或分析其分布具有重要意义。
    - Comfy dtype: LIST[STRING]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class CreateCkptNames:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'ckpt_names': ('STRING', {'multiline': True, 'default': '\n'.join(folder_paths.get_filename_list('checkpoints')), 'dynamicPrompts': False})}}
    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ('ckpt_names',)
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'

    def run(self, ckpt_names):
        ckpt_names = ckpt_names.split('\n')
        ckpt_names = [name for name in ckpt_names if name.strip()]
        return (ckpt_names,)
```