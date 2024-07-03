
# Documentation
- Class name: Switch string [Crystools]
- Category: crystools 🪛/Switch
- Output node: False

此节点提供了一种基于布尔条件在两个字符串值之间进行切换的机制。它将条件逻辑抽象为一个简单的接口，在处理二元决策时能够让代码更加简洁易读。

# Input types
## Required
- on_true
    - 如果布尔条件评估为True时返回的字符串值。它在基于条件确定输出结果中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- on_false
    - 如果布尔条件评估为False时返回的字符串值。它作为备选输出，确保无论条件结果如何都能返回一个值。
    - Comfy dtype: STRING
    - Python dtype: str
- boolean
    - 决定返回哪个字符串值（'on_true'或'on_false'）的布尔条件。它是节点执行的关键因素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- string
    - 输出是根据布尔条件评估结果选择的两个输入字符串之一。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": STRING,
                "on_false": STRING,
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("String switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
