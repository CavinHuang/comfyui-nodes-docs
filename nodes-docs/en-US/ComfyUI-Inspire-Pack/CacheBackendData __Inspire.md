---
tags:
- BackendCache
- Cache
---

# Cache Backend Data (Inspire)
## Documentation
- Class name: `CacheBackendData __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

The CacheBackendData node is designed to cache arbitrary data along with a unique key and a descriptive tag in a backend storage system. This functionality supports efficient data retrieval and management by allowing users to store and access data based on unique identifiers and descriptive tags.
## Input types
### Required
- **`key`**
    - The 'key' parameter serves as a unique identifier for the data being cached. It is crucial for retrieving the cached data at a later time.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`tag`**
    - The 'tag' parameter provides a short description for the cached data, aiding in its identification and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`data`**
    - The 'data' parameter is the actual data to be cached. It can be of any type, making this node versatile in its application.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`data opt`**
    - Comfy dtype: `*`
    - Returns the data that was cached, allowing for immediate verification or further processing.
    - Python dtype: `Tuple[Any]`
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
