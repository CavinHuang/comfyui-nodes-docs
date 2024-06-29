---
tags:
- AnimationScheduling
- Scheduling
---

# String Schedule 📅🅕🅝
## Documentation
- Class name: `StringSchedule`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

The StringSchedule node is designed to manage and schedule string-based content for dynamic animation or content generation. It leverages scheduling settings to interpolate between different string values over a series of frames, facilitating the creation of animated text or evolving narratives.
## Input types
### Required
- **`text`**
    - This input takes a multiline string that represents the text to be scheduled and animated, serving as the primary content for the scheduling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - Specifies the maximum number of frames for the scheduling, determining the length of the animation or content generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - Indicates the current frame number in the scheduling process, used to calculate the specific string content to be displayed at any given frame.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag that, when set to true, enables the printing of the scheduling process's output for debugging or tracking purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text`**
    - An optional string input that is prepended to the main text before scheduling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - An optional string input that is appended to the main text after scheduling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - A parameter weight used in the scheduling algorithm to adjust the influence of certain aspects of the text.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - A parameter weight similar to pw_a, used for adjusting the scheduling algorithm's influence on the text.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - Another parameter weight for fine-tuning the scheduling algorithm's effect on the text.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - A parameter weight that works alongside pw_a, pw_b, and pw_c to customize the scheduling outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `STRING`
    - The output is a dynamically scheduled string, representing the positive aspect of the text adjusted according to the current frame and scheduling settings.
    - Python dtype: `str`
- **`NEG`**
    - Comfy dtype: `STRING`
    - The output is a dynamically scheduled string, representing the negative aspect of the text adjusted according to the current frame and scheduling settings.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True, "default": defaultPrompt}),
                     "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                     "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0, }),
                     "print_output":("BOOLEAN", {"default": False}),},
                "optional": {"pre_text": ("STRING", {"multiline": True, "forceInput": True}),
                      "app_text": ("STRING", {"multiline": True, "forceInput": True}),
                      "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                      "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                      "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                      "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                }
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("POS", "NEG",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def animate(self, text, max_frames, current_frame, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text='', print_output = False ):
        settings = ScheduleSettings(
        text_g = text,
        pre_text_G = pre_text,
        app_text_G = app_text,
        text_L = None,
        pre_text_L = None,
        app_text_L = None,
        max_frames = max_frames,
        current_frame = current_frame,
        print_output = print_output,
        pw_a = pw_a,
        pw_b = pw_b,
        pw_c = pw_c,
        pw_d = pw_d,
        start_frame = 0,
        width = None,
        height = None,
        crop_w = None,
        crop_h = None,
        target_width = None,
        target_height = None,
        )
        return string_schedule(settings)

```
