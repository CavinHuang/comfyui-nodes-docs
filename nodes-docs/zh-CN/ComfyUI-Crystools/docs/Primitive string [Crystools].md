
# Documentation
- Class name: Primitive string [Crystools]
- Category: crystools 🪛/Primitive
- Output node: False

本节点旨在处理和加工原始字符串数据。它提供了一个简洁的接口，用于接收字符串输入，执行必要的操作，然后输出经过修改或未经修改的字符串。

# Input types
## Required
- string
    - 节点的字符串输入。它代表了节点将要处理的主要数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 节点的输出，是一个可能已经被节点处理或修改过的字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CText:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": STRING,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, string=""):
        return (string,)

```
