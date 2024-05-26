# Documentation
- Class name: CacheBackendDataNumberKey
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在缓存系统中管理和存储数据，使用唯一的数值键进行识别和检索。它在维护后端基础设施中数据流的效率和组织方面发挥着至关重要的作用。

# Input types
## Required
- key
    - ‘key’参数对于节点的运行至关重要，因为它在缓存中唯一标识数据。它是影响节点准确存储和检索信息能力的关键组成部分。
    - Comfy dtype: INT
    - Python dtype: int
- data
    - ‘data’参数代表要缓存的实际内容。它是节点处理和存储的主要输入，确保信息随时可用。
    - Comfy dtype: ANY
    - Python dtype: Any
## Optional
- tag
    - ‘tag’参数作为数据的描述符，提供了一个简短的描述，可用于对缓存信息进行分类或筛选。它通过提供一种更有效地组织和访问数据的方式，增强了节点的功能。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- data opt
    - 输出‘data opt’表示在缓存过程中返回的原始数据以及可能发生的任何附加信息或修改。这确保用户收到预期的完整数据集。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CacheBackendDataNumberKey:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tag': ('STRING', {'multiline': False, 'placeholder': 'Tag: short description'}), 'data': (any_typ,)}}
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('data opt',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache
        cache[key] = (tag, (False, data))
        return (data,)
```