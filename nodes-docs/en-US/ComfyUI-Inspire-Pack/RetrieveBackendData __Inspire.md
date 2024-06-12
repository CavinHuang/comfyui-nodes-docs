---
tags:
- BackendCache
- Cache
---

# Retrieve Backend Data (Inspire)
## Documentation
- Class name: `RetrieveBackendData __Inspire`
- Category: `InspirePack/Backend`
- Output node: `False`

This node is designed to retrieve data from a backend cache based on a specified key. It abstracts the complexity of accessing cached data, providing a straightforward way to retrieve previously stored information.
## Input types
### Required
- **`key`**
    - The 'key' parameter is essential for identifying the specific piece of data to be retrieved from the cache. It serves as a unique identifier, enabling the node to locate and return the corresponding data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`data`**
    - Comfy dtype: `*`
    - The 'data' output parameter represents the piece of information retrieved from the cache. It can be a single item or a list of items, depending on the nature of the stored data.
    - Python dtype: `Union[List[Any], Any]`
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
