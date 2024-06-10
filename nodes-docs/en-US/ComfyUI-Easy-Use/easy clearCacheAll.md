---
tags:
- Cache
---

# Clear Cache All
## Documentation
- Class name: `easy clearCacheAll`
- Category: `EasyUse/Logic`
- Output node: `True`

The `clearCacheAll` node is designed to clear the entire cache, disregarding any specific keys or conditions. It serves as a utility for resetting or refreshing the cache state within the system, ensuring that all cached data is removed to prevent stale or outdated information from being used.
## Input types
### Required
- **`anything`**
    - This parameter acts as a placeholder and does not influence the operation of clearing the cache. It symbolizes that the function can be triggered without any specific input related to cache content.
    - Comfy dtype: `*`
    - Python dtype: `Any`
### Optional
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class clearCacheAll:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "anything": (AlwaysEqualProxy("*"), {}),
        }, "optional": {},
            "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO",}
        }

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "empty_cache"
    CATEGORY = "EasyUse/Logic"

    def empty_cache(self, anything, unique_id=None, extra_pnginfo=None):
        remove_cache('*')
        return ()

```
