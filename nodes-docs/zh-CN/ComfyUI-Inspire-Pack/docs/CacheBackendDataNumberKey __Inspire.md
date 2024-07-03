
# Documentation
- Class name: CacheBackendDataNumberKey __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

该节点旨在使用数字键在Inspire Pack后端缓存数据。它允许存储和检索与唯一整数键和描述性标签相关联的数据，从而在自定义工作流中实现高效的数据管理和访问。

# Input types
## Required
- key
    - key参数是一个整数，用于唯一标识要缓存的数据。它作为存储和检索数据的主要标识符。
    - Comfy dtype: INT
    - Python dtype: int
- tag
    - tag参数是一个字符串，为缓存的数据提供简短描述或标签，有助于数据的识别和分类。
    - Comfy dtype: STRING
    - Python dtype: str
- data
    - data参数表示要缓存的实际数据。它可以是任何类型，允许多样化的数据存储选项。
    - Comfy dtype: *
    - Python dtype: object

# Output types
- data opt
    - 此输出返回与输入进行缓存的相同数据，允许立即验证或进一步处理。
    - Comfy dtype: *
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CacheBackendDataNumberKey:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
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

        update_cache(key, tag, (False, data))
        return (data,)

```
