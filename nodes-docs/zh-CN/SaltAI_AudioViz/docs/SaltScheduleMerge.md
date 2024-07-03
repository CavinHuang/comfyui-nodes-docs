
# Documentation
- Class name: SaltScheduleMerge
- Category: SALT/Scheduling/Filter
- Output node: False

SaltScheduleMerge 节点的设计目的是将两个调度列表合并成一个单一列表，具体实现是将第二个列表附加到第一个列表的末尾。这一功能对于需要合并顺序调度任务以实现流程化处理的场景至关重要。

# Input types
## Required
- schedule_list_a
    - 表示要合并的第一个调度列表。它作为新的组合调度列表的初始部分。
    - Comfy dtype: LIST
    - Python dtype: List[Any]
- schedule_list_b
    - 表示要合并的第二个调度列表。它被附加到第一个列表的末尾，完成组合调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[Any]

# Output types
- schedule_list
    - 通过将第二个列表附加到第一个列表后得到的组合调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleMerge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list_a": ("LIST", ),
                "schedule_list_b": ("LIST", ),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "append"
    CATEGORY = "SALT/Scheduling/Filter"

    def append(self, schedule_list_a, schedule_list_b):
        appended_list = schedule_list_a + schedule_list_b
        return (appended_list, )

```
