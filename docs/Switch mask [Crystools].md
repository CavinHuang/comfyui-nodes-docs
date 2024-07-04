
# Documentation
- Class name: Switch mask [Crystools]
- Category: crystools 🪛/Switch
- Output node: False

"Switch mask [Crystools]"节点允许基于布尔值在两个遮罩输入之间进行条件选择。它作为一个控制结构,根据提供的布尔条件动态选择数据流中的两条路径之一。

# Input types
## Required
- on_true
    - 如果布尔条件为真时返回的遮罩。它在根据条件确定输出方面起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- on_false
    - 如果布尔条件为假时返回的遮罩。此输入根据布尔条件为数据流提供了另一条路径。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- boolean
    - 决定返回哪个遮罩(on_true或on_false)的布尔条件。它充当选择输出路径的开关。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- mask
    - 由布尔条件决定的选定遮罩输出。它表示on_true和on_false输入之间的条件选择。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("MASK",),
                "on_false": ("MASK",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Mask switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
