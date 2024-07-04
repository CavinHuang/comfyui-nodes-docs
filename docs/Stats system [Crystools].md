
# Documentation
- Class name: Stats system [Crystools]
- Category: crystools 🪛/Utils
- Output node: False

该节点旨在收集和记录系统统计信息，提供有关系统硬件资源当前状态的洞察，如CPU使用率、内存利用率等。它作为一个诊断工具，用于监控和调试系统性能。

# Input types
## Required
- latent
    - 'latent'输入充当一个直通参数，允许节点在返回系统统计信息的同时保持其不变。这个特性在集成系统监控而不中断管道中的数据流时非常有用。
    - Comfy dtype: LATENT
    - Python dtype: tuple

# Output types
- latent
    - 'latent'输出参数返回原始的'latent'输入，允许节点无缝集成到数据处理管道中，而不改变数据流。
    - Comfy dtype: LATENT
    - Python dtype: tuple
- ui
    - 'ui'输出参数提供一个用户界面元素，显示记录的系统统计信息，提供了一种方便的方式来可视化系统的当前状态。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CUtilsStatSystem:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": ("LATENT",),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.UTILS.value
    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)

    FUNCTION = "execute"

    def execute(self, latent):
        log = "Samples Passthrough:\n"
        for stat in get_system_stats():
            log += stat + "\n"

        logger.debug(log)

        return {"ui": {"text": [log]}, "result": (latent,)}

```
