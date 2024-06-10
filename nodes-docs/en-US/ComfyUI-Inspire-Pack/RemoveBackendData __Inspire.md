---
tags:
- BackendCache
- Cache
---

# Remove Backend Data (Inspire)
## Documentation
- Class name: `RemoveBackendData __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

The `RemoveBackendData` node in the Inspire Pack is designed to selectively clear data from a backend cache. It allows for the removal of specific entries based on a provided key or the clearance of the entire cache with a special key. This functionality supports dynamic data management within backend processes, enabling efficient data updates and deletions.
## Input types
### Required
- **`key`**
    - The `key` parameter specifies the identifier for the data to be removed from the cache. Using '*' as the key clears all data from the cache, allowing for bulk deletion or reset operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`signal_opt`**
    - An optional signal parameter that can be passed through and returned by the node, facilitating the chaining of operations or the passing of control signals without affecting the cache operation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`signal`**
    - Comfy dtype: `*`
    - Returns the optional signal parameter passed to the node, allowing it to be used in subsequent operations or logic flows.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveBackendData:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("STRING", {"multiline": False, "placeholder": "Input data key ('*' = clear all)"}),
            },
            "optional": {
                "signal_opt": (any_typ,),
            }
        }

    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("signal",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    OUTPUT_NODE = True

    @staticmethod
    def doit(key, signal_opt=None):
        global cache

        if key == '*':
            cache = TaggedCache(cache_settings)
        elif key in cache:
            del cache[key]
        else:
            print(f"[Inspire Pack] RemoveBackendData: invalid data key {key}")

        return (signal_opt,)

```
