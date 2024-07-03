
# Documentation
- Class name: CacheBackendData __Inspire
- Category: InspirePack/Backend
- Output node: True

CacheBackendData节点旨在将任意数据与唯一键和描述性标签一起缓存到后端存储系统中。此功能通过允许用户基于唯一标识符和描述性标签存储和访问数据，支持高效的数据检索和管理。

# Input types
## Required
- key
    - key参数作为被缓存数据的唯一标识符。它对于之后检索缓存数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- tag
    - tag参数为缓存的数据提供简短描述，有助于数据的识别和检索。
    - Comfy dtype: STRING
    - Python dtype: str
- data
    - data参数是实际要缓存的数据。它可以是任何类型，使得这个节点在应用上非常灵活。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- data opt
    - 返回被缓存的数据，允许立即验证或进行进一步处理。
    - Comfy dtype: *
    - Python dtype: Tuple[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CacheBackendData:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("STRING", {"multiline": False, "placeholder": "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"}),
                "tag": ("STRING", {"multiline": False, "placeholder": "Tag: short description"}),
                "data": (any_typ,),
            }
        }

    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("data opt",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    OUTPUT_NODE = True

    def doit(self, key, tag, data):
        global cache

        if key == '*':
            print(f"[Inspire Pack] CacheBackendData: '*' is reserved key. Cannot use that key")

        update_cache(key, tag, (False, data))
        return (data,)

```
