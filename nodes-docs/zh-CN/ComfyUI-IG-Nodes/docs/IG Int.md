
# Documentation
- Class name: IG Int
- Category: 🐓 IG Nodes/Primitives
- Output node: False

IG Int节点旨在封装和处理节点式编程环境中的整数值。它允许指定一个整数值，为在可视化编程环境中处理整数提供了一种直接的方式。

# Input types
## Required
- value
    - 指定要由节点使用或操作的整数值。这个参数是节点操作的核心，作为决定节点输出的主要输入。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出由输入参数指定的整数值，有效地将该值传递通过节点。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_Int:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": -sys.maxsize, "max": sys.maxsize, "step": 1}),
            },
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value):
        return (value,)

```
