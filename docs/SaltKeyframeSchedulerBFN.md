
# Documentation
- Class name: `SaltKeyframeSchedulerBFN`
- Category: `SALT/Scheduling`
- Output node: `False`

该节点旨在通过可自定义的缓动函数来安排关键帧动画。它允许通过指定关键帧、缓动模式和可选参数来精确控制动画的时间和顺序，从而实现对动画进程的精细调整。

# Input types
## Required
- keyframe_schedule
    - 定义动画的关键帧序列。它是调度过程的核心，决定了动画帧的时间和数值。
    - Comfy dtype: STRING
    - Python dtype: str
- easing_mode
    - 指定关键帧之间应用的缓动函数，影响动画的节奏和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list

## Optional
- end_frame
    - 确定动画的最后一帧，允许限制动画的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- ndigits
    - 设置计算出的关键帧值的精度，影响动画的平滑度和准确性。
    - Comfy dtype: INT
    - Python dtype: int
- a
    - 自定义变量'a'，为定义动画提供额外的灵活性，支持复杂的调度场景。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- b
    - 自定义变量'b'，为定义动画提供额外的灵活性，支持复杂的调度场景。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- c
    - 自定义变量'c'，扩展动画调度的灵活性和复杂性。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- d
    - 自定义变量'd'，通过额外的自定义选项进一步增强调度功能。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- e
    - 自定义变量'e'，为复杂的动画调度添加另一层自定义。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- f
    - 自定义变量'f'，允许对动画的调度进行更详细的控制。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- g
    - 自定义变量'g'，为调度动画提供深度定制的可能性。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool
- h
    - 自定义变量'h'，完善了用于详细动画调度的广泛自定义选项集。
    - Comfy dtype: *
    - Python dtype: list | int | float | bool

# Output types
- schedule_list
    - 计算得出的关键帧值调度列表，可直接用于对象或场景的动画制作。
    - Comfy dtype: LIST
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltKeyframeSchedulerBFN:
    @classmethod
    def INPUT_TYPES(cls):
        easing_funcs = list(easing_functions.keys())
        easing_funcs.insert(0, "None")
        return {
            "required": {
                "keyframe_schedule": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "easing_mode": (easing_funcs, )
            },
            "optional": {
                "end_frame": ("INT", {"min": 0}),
                "ndigits": ("INT", {"min": 1, "max": 12, "default": 5}),
                "a": (WILDCARD, {}),
                "b": (WILDCARD, {}),
                "c": (WILDCARD, {}),
                "d": (WILDCARD, {}),
                "e": (WILDCARD, {}),
                "f": (WILDCARD, {}),
                "g": (WILDCARD, {}),
                "h": (WILDCARD, {}),
            }
        }

    RETURN_TYPES = ("LIST", )
    RETURN_NAMES = ("schedule_list", )

    FUNCTION = "keyframe_schedule"
    CATEGORY = "SALT/Scheduling"

    def keyframe_schedule(self, keyframe_schedule, easing_mode, end_frame=0, ndigits=2, a=[0], b=[0], c=[0], d=[0], e=[0], f=[0], g=[0], h=[0]):
        print("Received keyframe_schedule:", keyframe_schedule)
        custom_vars = {"a": a, "b": b, "c": c, "d": d, "e": e, "f": f, "g": g, "h": h}
        scheduler = KeyframeScheduler(end_frame=end_frame, custom_vars=custom_vars)
        schedule = scheduler.generate_schedule(keyframe_schedule, easing_mode=easing_mode, ndigits=ndigits)
        return (schedule, )

```
