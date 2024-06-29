---
tags:
- BackendCache
- Cache
---

# Cache Backend Data List (Inspire)
## Documentation
- Class name: `CacheBackendDataList __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

The CacheBackendDataList node is designed to cache lists of data in a backend storage system, allowing for efficient retrieval and management of data collections. It supports caching data with a unique key and tag, facilitating organized storage and easy access to grouped data items.
## Input types
### Required
- **`key`**
    - The 'key' parameter is used to uniquely identify the list of data being cached. It serves as a primary identifier for storing and retrieving the data from the cache.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`tag`**
    - The 'tag' parameter provides a short description or label for the cached data, aiding in its categorization and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`data`**
    - The 'data' parameter represents the actual list of data items to be cached. It is crucial for the operation as it contains the content that will be stored in the backend.
    - Comfy dtype: `*`
    - Python dtype: `Tuple[bool, Any]`
## Output types
- **`data opt`**
    - Comfy dtype: `*`
    - Returns the list of data that was cached, confirming the successful storage of the provided data.
    - Python dtype: `Tuple[Any]`
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
