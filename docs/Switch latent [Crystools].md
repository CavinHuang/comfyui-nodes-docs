
# Documentation
- Class name: Switch latent [Crystools]
- Category: crystools 🪛/Switch
- Output node: False

CSwitchBooleanLatent节点提供了一种基于布尔条件在两种潜在表示之间进行切换的机制。它抽象了决策过程，允许动态选择潜在数据流。

# Input types
## Required
- on_true
    - 如果布尔条件为真时要返回的潜在表示。它在基于条件确定输出方面起着关键作用。
    - Comfy dtype: LATENT
    - Python dtype: tuple
- on_false
    - 如果布尔条件为假时要返回的潜在表示。此参数确保有一个替代输出可用，从而增强了节点的灵活性。
    - Comfy dtype: LATENT
    - Python dtype: tuple
- boolean
    - 决定返回哪个潜在表示（on_true 或 on_false）的布尔条件。它是节点决策过程的核心。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent
    - 基于布尔条件选择的潜在表示。它体现了节点条件选择的核心功能。
    - Comfy dtype: LATENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanLatent:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("LATENT",),
                "on_false": ("LATENT",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Latent switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
