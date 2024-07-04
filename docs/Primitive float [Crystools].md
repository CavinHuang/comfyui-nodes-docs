
# Documentation
- Class name: Primitive float [Crystools]
- Category: crystools 🪛/Primitive
- Output node: False

这个节点为处理浮点数提供了一个简单的接口，允许用户输入和接收浮点数。它旨在促进Crystools生态系统中需要浮点精度的操作。

# Input types
## Required
- float
    - 表示待处理的浮点数。对于需要小数精度的操作来说，这是至关重要的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 处理后的浮点数，与输入保持一致直接返回。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CFloat:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": FLOAT,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)

    FUNCTION = "execute"

    def execute(self, float=True):
        return (float,)

```
