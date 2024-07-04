
# Documentation
- Class name: Switch any [Crystools]
- Category: crystools 🪛/Switch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

本节点提供了一种基于布尔条件在两个值之间进行切换的机制。它抽象了条件逻辑，提供了一种简洁明了的方式来选择两种可能的结果。

# Input types
## Required
- on_true
    - 如果布尔条件评估为真时返回的值。它在基于条件确定节点输出方面起着关键作用。
    - Comfy dtype: *
    - Python dtype: any
- on_false
    - 如果布尔条件评估为假时返回的值。该参数确保了有一个替代结果可用，使切换操作完整。
    - Comfy dtype: *
    - Python dtype: any
- boolean
    - 决定返回哪个值（'on_true' 或 'on_false'）的布尔条件。它是切换功能的核心，实现了动态决策。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- *
    - 输出取决于布尔条件的评估结果，可能是 'on_true' 或 'on_false' 中的任意一个。
    - Comfy dtype: *
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": (any, {}),
                "on_false": (any, {}),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = (any,)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Any switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
