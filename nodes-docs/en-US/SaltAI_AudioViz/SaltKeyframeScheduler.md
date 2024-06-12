---
tags:
- AnimationScheduling
- Scheduling
---

# Keyframe Scheduler
## Documentation
- Class name: `SaltKeyframeScheduler`
- Category: `SALT/Scheduling`
- Output node: `False`

The SaltKeyframeScheduler node is designed for generating and manipulating keyframe schedules based on specified easing functions and custom parameters. It allows for the dynamic creation of animation or effect timelines by applying easing modes to keyframe sequences, enabling precise control over the timing and progression of visual or auditory effects.
## Input types
### Required
- **`keyframe_schedule`**
    - Defines the sequence of keyframes to be scheduled. This sequence forms the basis of the animation or effect timeline, dictating the key points of transition or change.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`easing_mode`**
    - Specifies the easing function to apply to the keyframe schedule, influencing the interpolation and transition between keyframes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`end_frame`**
    - Determines the last frame of the schedule to consider for processing, allowing for partial scheduling within a larger sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ndigits`**
    - Sets the precision of the computed schedule values, defining how many decimal places to include.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`a`**
    - Custom parameter 'a' for additional flexibility in defining the scheduling logic or easing function behavior.
    - Comfy dtype: `*`
    - Python dtype: `Union[int, float, bool, list]`
- **`b`**
    - Custom parameter 'b', similar to 'a', for further customization of the scheduling or easing function.
    - Comfy dtype: `*`
    - Python dtype: `Union[int, float, bool, list]`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The resulting list of scheduled keyframe values after applying the specified easing mode and custom parameters.
    - Python dtype: `List[float]`
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
