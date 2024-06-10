---
tags:
- AnimationScheduling
- Scheduling
---

# Batch String Schedule 📅🅕🅝
## Documentation
- Class name: `BatchStringSchedule`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

The BatchStringSchedule node processes animation prompts by splitting them into positive and negative prompts, interpolating these prompts over a series of frames, and returning the current and next prompts for both positive and negative categories. This node is designed to work with batch processing of strings for animation purposes, facilitating dynamic text generation based on frame-specific settings.
## Input types
### Required
- **`text`**
    - The 'text' parameter represents the animation prompts to be processed, serving as the input for splitting and interpolation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - Specifies the maximum number of frames for which the animation prompts will be processed and interpolated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A flag indicating whether the output should be printed for debugging or logging purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text`**
    - Text to be prepended to each animation prompt before processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - Text to be appended to each animation prompt after processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - Parameter weight A for adjusting the interpolation of prompts.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Parameter weight B for further customization of prompt interpolation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - Parameter weight C, used in conjunction with A and B for fine-tuning the interpolation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - Parameter weight D, provides additional control over the interpolation of animation prompts.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `STRING`
    - The current positive prompt interpolated for the current frame.
    - Python dtype: `str`
- **`NEG`**
    - Comfy dtype: `STRING`
    - The current negative prompt interpolated for the current frame.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchStringSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text": ("STRING", {"multiline": True, "default": defaultPrompt}),
                    "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                    "print_output": ("BOOLEAN", {"default": False}),
            },
                "optional": {
                    "pre_text": ("STRING", {"multiline": True, "forceInput": True}),
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

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, text, max_frames,  pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text='',
                print_output=False):
        settings = ScheduleSettings(
            text_g=text,
            pre_text_G=pre_text,
            app_text_G=app_text,
            text_L=None,
            pre_text_L=None,
            app_text_L=None,
            max_frames=max_frames,
            current_frame=None,
            print_output=print_output,
            pw_a=pw_a,
            pw_b=pw_b,
            pw_c=pw_c,
            pw_d=pw_d,
            start_frame=0,
            width=None,
            height=None,
            crop_w=None,
            crop_h=None,
            target_width=None,
            target_height=None,
        )
        return batch_string_schedule(settings)

```
