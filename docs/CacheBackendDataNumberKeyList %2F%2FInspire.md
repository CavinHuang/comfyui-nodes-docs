# Documentation
- Class name: CacheBackendDataNumberKeyList
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

CacheBackendDataNumberKeyList节点旨在高效管理和存储后端系统中与数值键关联的数据。它作为缓存机制的关键组件，确保能够快速访问频繁使用的数据，而无需进行冗余的检索过程。

# Input types
## Required
- key
    - “key”参数是用于引用和访问缓存中存储的数据的数值标识符。它在节点的操作中起着关键作用，因为它直接影响数据检索的效率和准确性。
    - Comfy dtype: INT
    - Python dtype: int
- tag
    - “tag”参数是一个字符串，为与键关联的数据提供简短的描述或标签。它有助于组织和识别缓存的数据，增强节点的整体功能。
    - Comfy dtype: STRING
    - Python dtype: str
- data
    - “data”参数表示要缓存的实际数据。它对节点的操作至关重要，因为它是将被存储并在请求时检索的主要内容。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- data opt
    - “data opt”输出提供缓存中请求的数据，确保节点实现其高效数据检索和存储的目的。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CacheBackendDataNumberKeyList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tag': ('STRING', {'multiline': False, 'placeholder': 'Tag: short description'}), 'data': (any_typ,)}}
    INPUT_IS_LIST = True
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('data opt',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache
        cache[key[0]] = (tag[0], (True, data))
        return (data,)
```