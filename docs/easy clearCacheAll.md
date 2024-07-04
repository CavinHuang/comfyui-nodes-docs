
# Documentation
- Class name: easy clearCacheAll
- Category: EasyUse/Logic
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

clearCacheAll节点旨在清除整个缓存,不考虑任何特定的键或条件。它作为一个实用工具,用于重置或刷新系统内的缓存状态,确保所有缓存数据被移除,以防止使用陈旧或过时的信息。

# Input types
## Required
- anything
    - 该参数充当占位符,不影响清除缓存的操作。它象征着该功能可以在没有任何与缓存内容相关的特定输入的情况下被触发。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
该节点没有输出类型。


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
