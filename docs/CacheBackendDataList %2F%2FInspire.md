# Documentation
- Class name: CacheBackendDataList
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点管理后端系统中数据的检索和存储，便于高效的数据访问和组织。

# Input types
## Required
- key
    - key参数对于在缓存中识别特定的数据条目至关重要。它作为一个唯一标识符，允许节点准确检索或存储相关数据。
    - Comfy dtype: STRING
    - Python dtype: str
- tag
    - tag参数提供了一种对缓存中的数据进行分类和描述的手段。它有助于数据的组织和过滤，提高了系统的整体效率。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- data
    - data参数代表实际要存储或从缓存中检索的内容。这是一个多功能字段，可以根据用例包含各种类型的信息。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- data
    - 输出数据代表从缓存中检索到的信息。它是节点操作的主要结果，展示了节点在管理和提供存储数据访问方面的有效性。
    - Comfy dtype: ANY
    - Python dtype: Any
- opt
    - opt参数，作为输出的一部分，可能包含与检索数据相关的额外选项或元数据。它补充了主要的数据输出，提供了进一步的上下文或实用工具。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CacheBackendDataList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('STRING', {'multiline': False, 'placeholder': "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"}), 'tag': ('STRING', {'multiline': False, 'placeholder': 'Tag: short description'}), 'data': (any_typ,)}}
    INPUT_IS_LIST = True
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('data opt',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache
        if key == '*':
            print(f"[Inspire Pack] CacheBackendDataList: '*' is reserved key. Cannot use that key")
        cache[key[0]] = (tag[0], (True, data))
        return (data,)
```