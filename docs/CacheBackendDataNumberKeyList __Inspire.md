
# Documentation
- Class name: CacheBackendDataNumberKeyList __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

本节点用于更新缓存中与数字键和标签相关联的数据，支持批量操作。它促进了后端数据在结构化方式下的存储和检索，允许在InspirePack后端框架内进行高效的数据管理。

# Input types
## Required
- key
    - 与要缓存的数据相关联的数字键。它作为缓存中数据的唯一标识符。
    - Comfy dtype: INT
    - Python dtype: int
- tag
    - 对正在缓存的数据的简短描述或标识符。标签有助于对数据进行分类或描述其性质，便于检索。
    - Comfy dtype: STRING
    - Python dtype: str
- data
    - 要缓存的实际数据。此参数允许存储任何类型的数据，使节点在应用中具有多样性。
    - Comfy dtype: *
    - Python dtype: any

# Output types
- data opt
    - 返回传入缓存的数据，有助于确认已处理的数据。
    - Comfy dtype: *
    - Python dtype: any


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CacheBackendDataNumberKeyList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
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
        update_cache(key[0], tag[0], (True, data))
        return (data,)

```
