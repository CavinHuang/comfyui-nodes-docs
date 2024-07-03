
# Documentation
- Class name: Switch conditioning [Crystools]
- Category: crystools 🪛/Switch
- Output node: False
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

这个节点提供了一种基于布尔值在两个条件输入之间切换的机制，有效地允许将条件逻辑应用于条件数据的流动。

# Input types
## Required
- on_true
    - 当布尔值为真时使用的条件。它决定了条件满足时的数据流向。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- on_false
    - 当布尔值为假时使用的条件。它作为条件不满足时的替代数据流。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- boolean
    - 一个布尔值，用于确定应该使用哪个条件（on_true 或 on_false）。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- conditioning
    - 由布尔输入值决定的选定条件输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanConditioning:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("CONDITIONING",),
                "on_false": ("CONDITIONING",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Conditioning switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
