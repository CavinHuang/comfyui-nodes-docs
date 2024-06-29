---
tags:
- Cache
---

# Clear Cache Key
## Documentation
- Class name: `easy clearCacheKey`
- Category: `EasyUse/Logic`
- Output node: `True`

This node provides a mechanism to selectively clear specific entries from a cache based on a given key. It aims to manage and optimize cache usage by allowing the removal of outdated or unnecessary cache entries, thereby ensuring that the cache remains efficient and relevant.
## Input types
### Required
- **`anything`**
    - A placeholder parameter that does not affect the operation of the node but is required for the node's execution.
    - Comfy dtype: `*`
    - Python dtype: `str`
- **`cache_key`**
    - Specifies the key of the cache entry to be removed. This key identifies the specific cache entry targeted for deletion, playing a crucial role in managing cache content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class clearCacheKey:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "anything": (AlwaysEqualProxy("*"), {}),
            "cache_key": ("STRING", {"default": "*"}),
        }, "optional": {},
            "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO",}
        }

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "empty_cache"
    CATEGORY = "EasyUse/Logic"

    def empty_cache(self, anything, cache_name, unique_id=None, extra_pnginfo=None):
        remove_cache(cache_name)
        return ()

```
