---
tags:
- BackendCache
- Cache
---

# Remove Backend Data [NumberKey] (Inspire)
## Documentation
- Class name: `RemoveBackendDataNumberKey __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

This node is designed to remove specific data entries from a backend cache based on a numerical key. It supports the functionality to selectively clear cached data, enhancing data management and optimization within the backend infrastructure.
## Input types
### Required
- **`key`**
    - Specifies the numerical key associated with the data to be removed from the cache. This key is used to identify and delete the corresponding cache entry, if it exists.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`signal_opt`**
    - An optional signal that can be passed through and returned by the node, allowing for additional control flow or data passing without affecting the cache operation.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Any]`
## Output types
- **`signal`**
    - Comfy dtype: `*`
    - Returns the optional signal passed to the node, facilitating the chaining of operations or the passing of control data through the node workflow.
    - Python dtype: `Optional[Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveBackendDataNumberKey(RemoveBackendData):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
            "optional": {
                "signal_opt": (any_typ,),
            }
        }

    @staticmethod
    def doit(key, signal_opt=None):
        global cache

        if key in cache:
            del cache[key]
        else:
            print(f"[Inspire Pack] RemoveBackendDataNumberKey: invalid data key {key}")

        return (signal_opt,)

```
