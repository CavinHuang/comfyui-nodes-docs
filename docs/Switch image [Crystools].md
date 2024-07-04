
# Documentation
- Class name: Switch image [Crystools]
- Category: crystools 🪛/Switch
- Output node: False
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

'Switch image [Crystools]'节点允许基于布尔值在两个图像输入之间进行条件选择。它作为图像处理流程中的控制流机制，能够实现动态路径选择，从而促进条件图像操作或路由。

# Input types
## Required
- on_true
    - 指定当布尔条件评估为真时要选择的图像。它在基于条件确定输出方面起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- on_false
    - 指定当布尔条件评估为假时要选择的图像。这个输入确保可以选择替代图像，为条件图像处理提供了灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- boolean
    - 决定选择哪一个图像（'on_true'或'on_false'）作为输出的布尔条件。这个参数是节点条件逻辑的核心。
    - Comfy dtype: BOOLEAN
    - Python dtype: BOOLEAN

# Output types
- image
    - 基于布尔条件评估选择的输出图像。这允许在处理流程中进行动态图像选择。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanImage:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("IMAGE",),
                "on_false": ("IMAGE",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Image switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
