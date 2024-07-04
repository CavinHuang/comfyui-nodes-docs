
# Documentation
- Class name: RemoveBackendDataNumberKey __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

该节点旨在根据数值键从后端缓存中移除特定的数据条目。它支持有选择地清除缓存数据的功能，以增强后端基础设施中的数据管理和优化。

# Input types
## Required
- key
    - 指定与要从缓存中移除的数据相关联的数值键。该键用于识别并删除相应的缓存条目（如果存在）。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- signal_opt
    - 一个可选的信号，可以通过节点传递并返回，允许额外的控制流或数据传递，而不影响缓存操作。
    - Comfy dtype: *
    - Python dtype: Optional[Any]

# Output types
- signal
    - 返回传递给节点的可选信号，便于操作链接或通过节点工作流传递控制数据。
    - Comfy dtype: *
    - Python dtype: Optional[Any]


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
