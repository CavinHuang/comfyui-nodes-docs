
# Documentation
- Class name: SaltCyclicalSchedule
- Category: SALT/Scheduling/Filter
- Output node: False

SaltCyclicalSchedule节点旨在生成给定调度列表中的周期性模式。它允许重复调度的特定段落，可选择性地纳入乒乓效果以实现镜像重复，从而增强调度的动态范围和可变性。

# Input types
## Required
- schedule_list
    - 要处理以实现周期性重复的调度项目列表。它作为生成周期模式的基础序列，决定了输出的整体结构和内容。
    - Comfy dtype: LIST
    - Python dtype: List[Any]
- start_index
    - 指定要重复的调度列表段落的起始索引，标记周期模式的开始。
    - Comfy dtype: INT
    - Python dtype: int
- end_index
    - 定义要重复的调度列表段落的结束索引，标记周期模式的结束。
    - Comfy dtype: INT
    - Python dtype: int
- repetitions
    - 确定指定段落重复的次数，直接影响周期调度的长度和重复率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- ping_pong
    - 启用时，将段落的镜像重复添加到循环中，创建一个来回的模式，增强调度的复杂性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- schedule_list
    - 应用周期模式生成后的结果列表，包括重复的段落，以及启用时的镜像重复。
    - Comfy dtype: LIST
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltCyclicalSchedule:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "start_index": ("INT", {"min": 0}),
                "end_index": ("INT", {"min": 0}),
                "repetitions": ("INT", {"min": 1}),
            },
            "optional": {
                "ping_pong": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "generate_cyclical"
    CATEGORY = "SALT/Scheduling/Filter"

    def generate_cyclical(self, schedule_list, start_index, end_index, repetitions, ping_pong=False):
        if end_index < start_index:
            raise ValueError("Schedule end_index must be greater than or equal to start_index.")
        
        if end_index >= len(schedule_list):
            raise ValueError("Schedule end_index must be within the range of the schedule_list.")
        
        loop_segment = schedule_list[start_index:end_index + 1]
        
        cyclical_schedule = []
        for _ in range(repetitions):
            cyclical_schedule.extend(loop_segment)
            if ping_pong:
                cyclical_schedule.extend(loop_segment[-2:0:-1])
        
        return (cyclical_schedule,)

```
