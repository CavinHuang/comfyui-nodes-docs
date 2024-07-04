
# Documentation
- Class name: SaltListClamp
- Category: SALT/Scheduling/Filter
- Output node: False

SaltListClamp节点旨在调整给定列表中的值,确保它们落在指定的最小值和最大值范围内。这个被称为"钳制"的过程对于维护数据的完整性至关重要,可以防止值超出预定的界限。

# Input types
## Required
- schedule_list
    - 需要进行钳制的值列表。这个参数对于定义将要进行钳制处理的数据范围至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- min_value
    - 钳制后列表中允许的最小值。这个参数为钳制操作设定了下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 钳制后列表中允许的最大值。这个参数为钳制操作确立了上限。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- schedule_list
    - 钳制后的结果列表,其中所有值都被调整到指定的最小值和最大值范围内。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltListClamp:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "min_value": ("FLOAT", {"step": 0.01}),
                "max_value": ("FLOAT", {"step": 0.01})
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "clamp_values"
    CATEGORY = "SALT/Scheduling/Filter"

    def clamp_values(self, schedule_list, min_value, max_value):
        if min_value > max_value:
            raise ValueError("Schedules min_value cannot be greater than max_value.")

        clamped_list = [max(min(x, max_value), min_value) for x in schedule_list]

        return (clamped_list, )

```
