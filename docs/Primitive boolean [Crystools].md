
# Documentation
- Class name: Primitive boolean [Crystools]
- Category: crystools 🪛/Primitive
- Output node: False

该节点在Crystools框架中表示一个原始布尔数据类型，允许对布尔值进行操作和处理。

# Input types
## Required
- boolean
    - 布尔输入参数允许用户提供一个布尔值，这对节点的操作至关重要，因为它决定了要处理或操作的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- boolean
    - 输出是一个布尔值，反映了经过节点处理或操作后的输入布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CBoolean:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)

    FUNCTION = "execute"

    def execute(self, boolean=True):
        return (boolean,)

```
