
# Documentation
- Class name: IG Float
- Category: 🐓 IG Nodes/Primitives
- Output node: False

IG Float节点旨在处理指定范围内的浮点数，为各种计算任务提供精确的数值输入。它作为需要小数值的操作中的基础构建块，有助于进行精确计算和数据操作。

# Input types
## Required
- value
    - 指定要处理的浮点数。该参数对于定义节点将要处理的数值输入至关重要，直接影响基于给定值的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 返回处理后的浮点数，与输入值相同。该输出对于进一步的数值计算或作为其他需要小数值的节点的输入至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_Float:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0, "min": -sys.float_info.max, "max": sys.float_info.max, "step": FLOAT_STEP}),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value):
        return (value,)

```
