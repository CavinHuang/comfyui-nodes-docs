
# Documentation
- Class name: SaltScheduleListExponentialFade
- Category: SALT/Scheduling/Filter
- Output node: False

本节点用于对调度列表应用指数衰减效果。根据指定的衰减类型和强度，它可以增强或减弱列表中的值，从而创建动态过渡效果。

# Input types
## Required
- schedule_list
    - 用于应用指数衰减效果的值列表，作为动态过渡的基础。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- fade_type
    - 指定要应用的衰减效果类型：'in'表示渐增，'out'表示渐减，'in-and-out'表示两者的组合。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength
    - 决定衰减效果的强度，数值越高，衰减效果越明显。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- start_index
    - 开始应用衰减效果的列表索引，允许在列表内进行部分衰减。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- schedule_list
    - 应用指数衰减效果后的修改后调度列表，展示动态过渡效果。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleListExponentialFade:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "fade_type": (["in", "out", "in-and-out"],),
                "strength": ("FLOAT", {"min": 0.01, "max": 10.0, "default": 1.0}),
            },
            "optional": {
                "start_index": ("INT", {"min": 0, "default": 0}),
            }
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "exponential_fade"
    CATEGORY = "SALT/Scheduling/Filter"

    def exponential_fade(self, schedule_list, fade_type, strength, start_index=0):
        length = len(schedule_list)
        faded_schedule = []
        
        for i in range(length):
            if i < start_index:
                faded_schedule.append(schedule_list[i])
                continue

            if fade_type in ["in", "out"]:
                t = (i - start_index) / max(1, (length - 1 - start_index))
                if fade_type == "in":
                    value = t ** strength
                else:
                    value = ((1 - t) ** strength)
            elif fade_type == "in-and-out":
                midpoint = (length - start_index) // 2 + start_index
                if i <= midpoint:
                    t = (i - start_index) / max(1, (midpoint - start_index))
                    value = t ** strength
                else:
                    t = (i - midpoint) / max(1, (length - 1 - midpoint))
                    value = ((1 - t) ** strength)

            faded_schedule.append(value)
        
        faded_schedule = [original * fade for original, fade in zip(schedule_list, faded_schedule)]

        return (faded_schedule, )

```
