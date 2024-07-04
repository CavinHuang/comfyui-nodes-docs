
# Documentation
- Class name: SaltListLinearInterpolation
- Category: SALT/Scheduling/Filter
- Output node: False

SaltListLinearInterpolation节点设计用于在两个调度值列表之间进行线性插值，基于指定的插值因子。这个节点对于在调度中创建不同状态或值之间的平滑过渡至关重要，它能够生成融合了输入调度特征的中间状态。

# Input types
## Required
- schedule_list_a
    - 第一个用于插值的调度值列表。它作为插值过程的起始点。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- schedule_list_b
    - 第二个用于插值的调度值列表。它作为插值过程的目标终点。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- interpolation_factor
    - 一个介于0.0和1.0之间的浮点值，用于确定插值输出中每个输入列表的权重。因子为0.0时得到第一个列表，为1.0时得到第二个列表。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- schedule_list
    - 插值后的调度值列表结果，根据插值因子混合输入列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltListLinearInterpolation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list_a": ("LIST", ),
                "schedule_list_b": ("LIST", ),
                "interpolation_factor": ("FLOAT", {"min": 0.0, "max": 1.0}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "lerp"
    CATEGORY = "SALT/Scheduling/Filter"

    def lerp(self, schedule_list_a, schedule_list_b, interpolation_factor):
        if len(schedule_list_a) != len(schedule_list_b):
            raise ValueError("Schedule lists must have the same length.")
        
        interpolated_list = []
        
        for a, b in zip(schedule_list_a, schedule_list_b):
            interpolated_value = (1 - interpolation_factor) * a + interpolation_factor * b
            interpolated_list.append(interpolated_value)

        return (interpolated_list, )

```
