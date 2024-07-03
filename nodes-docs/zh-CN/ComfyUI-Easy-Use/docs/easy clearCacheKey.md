
# Documentation
- Class name: easy clearCacheKey
- Category: EasyUse/Logic
- Output node: True

该节点提供了一种根据给定键选择性清除缓存特定条目的机制。它旨在通过允许删除过时或不必要的缓存条目来管理和优化缓存使用，从而确保缓存保持高效和相关性。

# Input types
## Required
- anything
    - 这是一个占位参数，不影响节点的操作，但对节点的执行是必需的。
    - Comfy dtype: *
    - Python dtype: str
- cache_key
    - 指定要删除的缓存条目的键。这个键用于识别目标删除的特定缓存条目，在管理缓存内容中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型


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
