---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Prompt Schedule 📅🅕🅝
## Documentation
- Class name: `PromptSchedule`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

The PromptSchedule node is designed to process and sequence user-defined prompts, incorporating expressions and scheduling mechanisms to generate a series of conditionings. It evaluates the user's input, sequences the prompts based on specified conditions, and returns a batch of conditionings with the applied schedule, facilitating dynamic and temporal control over the generation process.
## Input types
### Required
- **`text`**
    - This input captures the user-defined prompt text, serving as the primary content for processing and conditioning. It is essential for determining the direction and tone of the generated output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The clip parameter specifies the clip model to be used for conditioning the input text, playing a crucial role in the generation process by influencing the quality and relevance of the output.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`max_frames`**
    - Specifies the maximum number of frames for the animation or sequence, setting an upper limit on the length and complexity of the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - Indicates the current frame in the sequence, used to determine the specific conditioning and adjustments needed at this point in the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag that, when set to true, enables the printing of the node's output for debugging or monitoring purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text`**
    - Optional text to prepend to the main prompt, allowing for additional context or instructions to be included in the generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - Optional text to append to the main prompt, providing a way to add further details or directives to the end of the prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - A weight parameter for adjusting the influence of the pre_text in the generation process, offering fine-tuned control over the conditioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - A weight parameter for adjusting the influence of the app_text in the generation process, allowing for customized emphasis on appended text.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - An additional weight parameter, providing further customization options for the conditioning process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - Another weight parameter, enabling precise adjustments to the generation's conditioning based on user-defined criteria.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - This output represents the positively conditioned aspect of the content, reflecting the emphasis and adjustments made based on the input prompts and settings.
    - Python dtype: `object`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - This output captures the negatively conditioned aspect, providing a counterbalance to the positive elements and ensuring a nuanced and balanced final output.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text": ("STRING", {"multiline": True, "default":defaultPrompt}),
                    "clip": ("CLIP", ),
                    "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                    "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0, "forceInput": True }),
                    "print_output":("BOOLEAN", {"default": False,}),
                },
                "optional": {"pre_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "app_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG",)
    FUNCTION = "animate"
    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def animate(self, text, max_frames, print_output, current_frame,clip, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text=''
    ):
        settings = ScheduleSettings(
            text_g=text,
            pre_text_G=pre_text,
            app_text_G=app_text,
            text_L=None,
            pre_text_L=None,
            app_text_L=None,
            max_frames=max_frames,
            current_frame=current_frame,
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
        return prompt_schedule(settings,clip)

```
