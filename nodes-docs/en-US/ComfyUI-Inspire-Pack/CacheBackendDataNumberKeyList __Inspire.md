---
tags:
- BackendCache
- Cache
---

# Cache Backend Data List [NumberKey] (Inspire)
## Documentation
- Class name: `CacheBackendDataNumberKeyList __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

This node is designed to update a cache with data associated with a numeric key and a tag, supporting batch operations. It facilitates the storage and retrieval of backend data in a structured manner, allowing for efficient data management within the InspirePack backend framework.
## Input types
### Required
- **`key`**
    - The numeric key associated with the data to be cached. It serves as a unique identifier for the data within the cache.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tag`**
    - A short description or identifier for the data being cached. The tag helps in categorizing or describing the nature of the data for easier retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`data`**
    - The actual data to be cached. This parameter allows for the storage of any type of data, making the node versatile in its application.
    - Comfy dtype: `*`
    - Python dtype: `any`
## Output types
- **`data opt`**
    - Comfy dtype: `*`
    - Returns the data that was passed in for caching, facilitating a confirmation of what data was processed.
    - Python dtype: `any`
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
