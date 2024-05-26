# Documentation
- Class name: RemoveBackendData
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在管理和清除存储在后端缓存中的数据，确保系统内高效的内存使用和数据组织。

# Input types
## Required
- key
    - ‘key’参数对于识别后端缓存中的具体数据至关重要。它决定了哪些数据被指定删除，通配符‘*’用于清除整个缓存。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- signal_opt
    - ‘signal_opt’参数是一个可选输入，可用于提供额外的指令或信号给节点，增强其在各种场景中的适应性和灵活性。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- signal
    - ‘signal’输出表示数据删除操作的结果，可能是状态指示或对‘signal_opt’输入的响应，确保节点与系统之间的有效通信。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveBackendData:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('STRING', {'multiline': False, 'placeholder': "Input data key ('*' = clear all)"})}, 'optional': {'signal_opt': (any_typ,)}}
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    def doit(self, key, signal_opt=None):
        global cache
        if key == '*':
            cache = {}
        elif key in cache:
            del cache[key]
        else:
            print(f'[Inspire Pack] RemoveBackendData: invalid data key {key}')
        return (signal_opt,)
```