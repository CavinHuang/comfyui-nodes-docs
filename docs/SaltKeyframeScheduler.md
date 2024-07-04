
# Documentation
- Class name: `SaltKeyframeScheduler`
- Category: `SALT/Scheduling`
- Output node: `False`

SaltKeyframeScheduler节点旨在根据指定的缓动函数和自定义参数生成和操作关键帧调度。它通过将缓动模式应用于关键帧序列，实现动画或效果时间线的动态创建，从而精确控制视觉或听觉效果的时间和进程。

# Input types
## Required
- keyframe_schedule
    - 定义要调度的关键帧序列。此序列构成了动画或效果时间线的基础，决定了转换或变化的关键点。
    - Comfy dtype: STRING
    - Python dtype: str
- easing_mode
    - 指定要应用于关键帧调度的缓动函数，影响关键帧之间的插值和过渡。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- end_frame
    - 确定要考虑处理的调度的最后一帧，允许在较大序列中进行部分调度。
    - Comfy dtype: INT
    - Python dtype: int
- ndigits
    - 设置计算调度值的精度，定义包含的小数位数。
    - Comfy dtype: INT
    - Python dtype: int
- a
    - 自定义参数'a'，为定义调度逻辑或缓动函数行为提供额外的灵活性。
    - Comfy dtype: *
    - Python dtype: Union[int, float, bool, list]
- b
    - 自定义参数'b'，类似于'a'，用于进一步自定义调度或缓动函数。
    - Comfy dtype: *
    - Python dtype: Union[int, float, bool, list]

# Output types
- schedule_list
    - 应用指定缓动模式和自定义参数后得到的调度关键帧值列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltKeyframeScheduler:
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
                "b": (WILDCARD, {})
            }
        }

    RETURN_TYPES = ("LIST", )
    RETURN_NAMES = ("schedule_list", )

    FUNCTION = "keyframe_schedule"
    CATEGORY = "SALT/Scheduling"

    def keyframe_schedule(self, keyframe_schedule, easing_mode, end_frame=0, ndigits=2, a=None, b=None):
        if a and not isinstance(a, (int, float, bool, list)):
            raise ValueError("`a` is not a valid int, float, boolean, or schedule_list")
        if b and not isinstance(b, (int, float, bool, list)):
            raise ValueError("`b` is not a valid int, float, or boolean, or schedule_list")
        
        custom_vars = {}
        if a:
            custom_vars['a'] = a
        if b:
            custom_vars['b'] = b
        
        scheduler = KeyframeScheduler(end_frame=end_frame, custom_vars=custom_vars)
        schedule = scheduler.generate_schedule(keyframe_schedule, easing_mode=easing_mode, ndigits=ndigits)
        return (schedule, )

```
