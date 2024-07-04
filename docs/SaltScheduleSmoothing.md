
# Documentation
- Class name: SaltScheduleSmoothing
- Category: SALT/Scheduling/Filter
- Output node: False

SaltScheduleSmoothing节点旨在对调度列表应用平滑过滤器，使用指定的平滑因子来混合连续的值。这个过程的目标是在调度中的点之间创建更加渐进的过渡，从而提高整个序列的平滑度。

# Input types
## Required
- schedule_list
    - schedule_list是要进行平滑处理的值序列。它作为平滑操作的主要数据来源，直接影响最终调度的平滑度。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- smoothing_factor
    - smoothing_factor决定了应用于调度列表的平滑程度。较高的因子会导致点之间的过渡更加平滑，直接影响输出的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- schedule_list
    - 输出是输入调度列表的平滑版本，通过平滑处理使点之间的过渡更加渐进。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleSmoothing:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "smoothing_factor": ("FLOAT", {"min": 0.0, "max": 1.0, "default": 0.5}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "smooth"
    CATEGORY = "SALT/Scheduling/Filter"

    def smooth(self, schedule_list, smoothing_factor):
        smoothed_schedule = schedule_list[:]
        for i in range(1, len(schedule_list)):
            smoothed_schedule[i] = smoothed_schedule[i-1] * (1 - smoothing_factor) + schedule_list[i] * smoothing_factor
        return (smoothed_schedule, )

```
