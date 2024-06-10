---
tags:
- AnimationScheduling
- Scheduling
---

# Keyframe Scheduler (BIG)
## Documentation
- Class name: `SaltKeyframeSchedulerBFN`
- Category: `SALT/Scheduling`
- Output node: `False`

This node is designed for scheduling keyframe animations with customizable easing functions. It allows for the precise timing and sequencing of animations by specifying keyframes, easing modes, and optional parameters to fine-tune the animation's progression.
## Input types
### Required
- **`keyframe_schedule`**
    - Defines the sequence of keyframes for the animation. It's the backbone of the scheduling process, dictating the timing and values of the animation frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`easing_mode`**
    - Specifies the easing function to apply between keyframes, influencing the animation's pace and style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`end_frame`**
    - Determines the last frame of the animation, allowing for the animation's duration to be limited.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ndigits`**
    - Sets the precision of the computed keyframe values, affecting the smoothness and accuracy of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`a`**
    - Custom variable 'a' for additional flexibility in defining the animation, supporting complex scheduling scenarios.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`b`**
    - Custom variable 'b' for additional flexibility in defining the animation, supporting complex scheduling scenarios.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`c`**
    - Custom variable 'c', extending the flexibility and complexity of animation scheduling.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`d`**
    - Custom variable 'd', further enhancing the scheduling capabilities with additional customization options.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`e`**
    - Custom variable 'e', adds another layer of customization for intricate animation scheduling.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`f`**
    - Custom variable 'f', allows for even more detailed control over the animation's scheduling.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`g`**
    - Custom variable 'g', contributes to the depth of customization available for scheduling animations.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
- **`h`**
    - Custom variable 'h', completes the extensive set of customization options for detailed animation scheduling.
    - Comfy dtype: `*`
    - Python dtype: `list | int | float | bool`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The computed schedule list of keyframe values, ready for use in animating objects or scenes.
    - Python dtype: `list`
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
