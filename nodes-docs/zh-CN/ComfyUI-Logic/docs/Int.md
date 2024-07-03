
# Documentation
- Class name: Int
- Category: Logic
- Output node: False

Int节点旨在处理整数值，允许在逻辑或计算环境中对这些值进行操作或评估。

# Input types
## Required
- value
    - 定义要由节点处理或操作的整数值。它作为节点执行操作或评估的主要输入。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- INT
    - 输出经过处理或评估的整数值，反映节点执行的任何操作或操作结果。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Int:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("INT", {"default": 0})},
        }

    RETURN_TYPES = ("INT",)

    RETURN_NAMES = ("INT",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
