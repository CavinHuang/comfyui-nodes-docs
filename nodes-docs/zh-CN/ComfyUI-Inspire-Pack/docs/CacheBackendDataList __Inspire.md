
# Documentation
- Class name: CacheBackendDataList __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

CacheBackendDataList节点旨在后端存储系统中缓存数据列表，从而实现数据集合的高效检索和管理。它支持使用唯一的键和标签来缓存数据，便于组织存储并轻松访问分组的数据项。

# Input types
## Required
- key
    - key参数用于唯一标识被缓存的数据列表。它作为存储和检索缓存数据的主要标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- tag
    - tag参数为缓存的数据提供了一个简短的描述或标签，有助于数据的分类和检索。
    - Comfy dtype: STRING
    - Python dtype: str
- data
    - data参数代表要缓存的实际数据项列表。它对操作至关重要，因为它包含了将存储在后端的内容。
    - Comfy dtype: *
    - Python dtype: Tuple[bool, Any]

# Output types
- data opt
    - 返回被缓存的数据列表，确认提供的数据已成功存储。
    - Comfy dtype: *
    - Python dtype: Tuple[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CacheBackendDataList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("STRING", {"multiline": False, "placeholder": "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"}),
                "tag": ("STRING", {"multiline": False, "placeholder": "Tag: short description"}),
                "data": (any_typ,),
            }
        }

    INPUT_IS_LIST = True

    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("data opt",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache

        if key == '*':
            print(f"[Inspire Pack] CacheBackendDataList: '*' is reserved key. Cannot use that key")

        update_cache(key[0], tag[0], (True, data))
        return (data,)

```
