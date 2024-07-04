
# Documentation
- Class name: SaltScheduleSplit
- Category: SALT/Scheduling
- Output node: False

SaltScheduleSplit节点旨在根据指定索引将给定的日程列表分成两部分。这一功能对于将日程分割成可管理的部分以便进行进一步处理或分析至关重要。

# Input types
## Required
- schedule_list
    - 需要被分割的日程项目列表。这个参数至关重要，因为它定义了将被分成两部分的项目序列。
    - Comfy dtype: LIST
    - Python dtype: List[Any]
- split_index
    - 日程列表被分割的索引位置。这个参数决定了分割点，影响列表如何被分段。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- schedule_list_a
    - 日程列表的第一部分，包含分割索引之前的项目。
    - Comfy dtype: LIST
    - Python dtype: List[Any]
- schedule_list_b
    - 日程列表的第二部分，包含从分割索引开始及之后的项目。
    - Comfy dtype: LIST
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleSplit:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "split_index": ("INT", {"min": 0}),
            },
        }

    RETURN_TYPES = ("LIST", "LIST")
    RETURN_NAMES = ("schedule_list_a", "schedule_list_b")
    FUNCTION = "split"
    CATEGORY = "SALT/Scheduling"

    def split(self, schedule_list, split_index):
        if split_index >= len(schedule_list) or split_index < 0:
            raise ValueError("Schedule split_index must be within the range of the schedule_list.")
        first_part = schedule_list[:split_index]
        second_part = schedule_list[split_index:]
        return (first_part, second_part)

```
