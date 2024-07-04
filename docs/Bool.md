
# Documentation
- Class name: Bool
- Category: Logic
- Output node: False

Bool节点设计用于简单地传递布尔值，允许基于其输入应用逻辑运算或条件。

# Input types
## Required
- value
    - 表示节点的布尔输入，直接决定输出。它作为进一步操作的基本逻辑单元。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- BOOLEAN
    - 输出与输入相同的布尔值，有助于工作流中的逻辑决策。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Bool:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("BOOLEAN", {"default": False})},
        }

    RETURN_TYPES = ("BOOLEAN",)

    RETURN_NAMES = ("BOOLEAN",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
