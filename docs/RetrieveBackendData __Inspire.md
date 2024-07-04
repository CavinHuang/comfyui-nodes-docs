
# Documentation
- Class name: RetrieveBackendData __Inspire
- Category: InspirePack/Backend
- Output node: False

此节点旨在根据指定的键从后端缓存中检索数据。它抽象了访问缓存数据的复杂性，提供了一种简单直接的方式来获取先前存储的信息。

# Input types
## Required
- key
    - "key"参数对于从缓存中识别要检索的特定数据至关重要。它作为唯一标识符，使节点能够定位并返回相应的数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- data
    - "data"输出参数代表从缓存中检索到的信息。根据存储数据的性质，它可以是单个项目或项目列表。
    - Comfy dtype: *
    - Python dtype: Union[List[Any], Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RetrieveBackendData:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("STRING", {"multiline": False, "placeholder": "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"}),
            }
        }

    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("data",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    @staticmethod
    def doit(key):
        global cache

        v = cache.get(key)

        if v is None:
            print(f"[RetrieveBackendData] '{key}' is unregistered key.")
            return (None,)

        is_list, data = v[1]

        if is_list:
            return (data,)
        else:
            return ([data],)

    @staticmethod
    def IS_CHANGED(key):
        return cache_weak_hash(key)

```
