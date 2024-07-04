
# Documentation
- Class name: RemoveBackendData __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

RemoveBackendData节点是InspirePack的一个组件,设计用于有选择地清除后端缓存中的数据。它允许根据提供的键来删除特定条目,或者使用特殊键来清除整个缓存。这一功能支持后端进程中的动态数据管理,实现高效的数据更新和删除操作。

# Input types
## Required
- key
    - key参数指定要从缓存中删除的数据的标识符。使用'*'作为键可以清除缓存中的所有数据,从而允许批量删除或重置操作。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- signal_opt
    - 一个可选的信号参数,可以被节点传递和返回,便于操作的链接或控制信号的传递,而不影响缓存操作。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- signal
    - 返回传递给节点的可选信号参数,允许它在后续操作或逻辑流程中使用。
    - Comfy dtype: *
    - Python dtype: Any


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
