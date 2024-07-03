
# Documentation
- Class name: SaltSchedule2ExecSchedule
- Category: SALT/Scheduling
- Output node: False

这个节点旨在将一个列表转换为迭代执行列表，从而将调度数据转换成适合顺序处理的格式。

# Input types
## Required
- list_input
    - 代表需要被转换为迭代执行列表的输入列表，是转换过程的主要数据结构。
    - Comfy dtype: LIST
    - Python dtype: List

# Output types
- float
    - 输出由输入列表派生的浮点数列表，表示转换后的调度数据。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltSchedule2ExecSchedule:
    """
        Converts a list to a list output (iterative execution list)
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "list_input": ("LIST", {}), 
            },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "convert"
    CATEGORY = "SALT/Scheduling"

    def convert(self, list_input):
        return (list_input, )

```
