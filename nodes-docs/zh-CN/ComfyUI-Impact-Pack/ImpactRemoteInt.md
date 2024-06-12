# Documentation
- Class name: ImpactRemoteInt
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点作为ImpactPack逻辑套件中的测试工具，旨在通过定义的接口评估和展示远程交互的功能。

# Input types
## Required
- node_id
    - node_id参数对于在系统中唯一标识节点至关重要，它使得目标通信和处理成为可能。
    - Comfy dtype: INT
    - Python dtype: int
- widget_name
    - widget_name参数指定了要交互的小部件名称，将节点的操作指向正确的接口。
    - Comfy dtype: STRING
    - Python dtype: str
- value
    - value参数保存在远程交互期间要处理或传输的数据，是节点功能的核心。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactRemoteInt:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'node_id': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'widget_name': ('STRING', {'multiline': False}), 'value': ('INT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}
```