# Documentation
- Class name: RemoveBackendDataNumberKey
- Category: DataProcessing
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在从后端缓存中删除与特定数字键关联的数据条目，确保数据完整性并优化存储空间。

# Input types
## Required
- key
    - ‘key’参数对于识别要从缓存中删除的确切数据条目至关重要。它作为目标数据的唯一标识符。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- signal_opt
    - ‘signal_opt’参数在删除过程中提供了灵活性，允许为操作指定额外的选项。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- signal_opt
    - ‘signal_opt’输出反映了作为输入提供的任何额外选项或信号，保持操作上下文的完整性。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveBackendDataNumberKey(RemoveBackendData):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'optional': {'signal_opt': (any_typ,)}}

    def doit(self, key, signal_opt=None):
        global cache
        if key in cache:
            del cache[key]
        else:
            print(f'[Inspire Pack] RemoveBackendDataNumberKey: invalid data key {key}')
        return (signal_opt,)
```