# Documentation
- Class name: CacheBackendData
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

此类节点管理后端缓存系统中数据的存储和检索，便于高效的数据访问和工作流过程的优化。

# Input types
## Required
- key
    - key参数对于在缓存中唯一标识数据至关重要。它用于索引和检索相关数据，确保访问和处理正确的信息。
    - Comfy dtype: STRING
    - Python dtype: str
- tag
    - tag参数作为数据的描述性标签，有助于数据分类和快速引用。它增强了缓存内的组织，并支持高效的数据管理。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- data
    - data参数代表要缓存的实际内容。它是节点操作的基础，因为它保存了将被存储和稍后访问的值。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- data opt
    - 输出提供原始输入的数据，确保整个过程中数据流得到维持。它确认数据已成功存储，可供将来使用。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CacheBackendData:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('STRING', {'multiline': False, 'placeholder': "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"}), 'tag': ('STRING', {'multiline': False, 'placeholder': 'Tag: short description'}), 'data': (any_typ,)}}
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('data opt',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache
        if key == '*':
            print(f"[Inspire Pack] CacheBackendData: '*' is reserved key. Cannot use that key")
        cache[key] = (tag, (False, data))
        return (data,)
```