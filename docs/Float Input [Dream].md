
# Documentation
- Class name: Float Input [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False

Float Input节点旨在接受浮点数作为输入，为用户提供一个简单的界面来输入小数值。它是用户界面中的一个基础元素，特别适用于需要精确测量或调整的配置场景。

# Input types
## Required
- value
    - 表示用户输入的浮点数。这是节点操作的主要值，作为节点工作流中进一步处理或计算的基础。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - Comfy dtype: FLOAT
    - 输出与输入相同的浮点数，实际上充当了该值的传递通道。
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputFloat:
    NODE_NAME = "Float Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.0}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("FLOAT",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
