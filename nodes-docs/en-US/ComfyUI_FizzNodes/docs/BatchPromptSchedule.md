---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Batch Prompt Schedule 📅🅕🅝
## Documentation
- Class name: `BatchPromptSchedule`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

The `BatchPromptSchedule` node processes user-formatted prompts to sequence and evaluate expressions within these prompts, ultimately generating a batch of conditionings based on a specified schedule. This node is designed to handle the intricacies of animation prompt scheduling, including the management of current and next prompts as well as the conditioning strength across a series of frames.
## Input types
### Required
- **`text`**
    - This input represents the user's formatted prompt, serving as the foundational content for animation sequence generation. It is crucial for defining the thematic direction and elements to be emphasized or minimized in the animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - Refers to the clip information or settings that are essential for processing the animation. This input is critical for aligning the animation with specific visual or thematic constraints.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`max_frames`**
    - Specifies the maximum number of frames for the animation, playing a key role in defining the length and scope of the animated sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag indicating whether to print output information for debugging or informational purposes during the animation processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text`**
    - Pre-text to be added before the main prompt content, influencing the initial context or setting for the animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - Appended text to be added after the main prompt content, affecting the concluding context or elements in the animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_frame`**
    - The starting frame number for the animation, determining the initial point of the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`pw_a`**
    - A parameter weight influencing the animation's visual or thematic aspects, part of a set of weights used for fine-tuning the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Another parameter weight for adjusting the animation's characteristics, contributing to the customization of the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - A weight parameter for further customization of the animation, allowing for specific adjustments to the visual or thematic output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - The last of the parameter weights for detailed control over the animation's appearance or theme, enabling precise modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - This output represents the positive conditioning generated from the animation prompt, ready for further processing or utilization in the animation sequence.
    - Python dtype: `CONDITIONING`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - Signifies the negative conditioning derived from the animation prompt, complementing the positive conditioning to provide a balanced and nuanced animation output.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Prompts Everywhere](../../cg-use-everywhere/Nodes/Prompts Everywhere.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - LinearBatchCreativeInterpolation



## Source code
```python
class BatchPromptSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text": ("STRING", {"multiline": True, "default": defaultPrompt}),
                    "clip": ("CLIP",),
                    "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                    "print_output":("BOOLEAN", {"default": False}),
                },
                "optional": {
                    "pre_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "app_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "start_frame": ("INT", {"default": 0, "min": 0, "max": 9999, "step": 1, }),
                    "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                    "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                    "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                    "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, text, max_frames, print_output, clip, start_frame, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text=''
    ):
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
            start_frame=start_frame,
            width=None,
            height=None,
            crop_w=None,
            crop_h=None,
            target_width=None,
            target_height=None,
        )
        return batch_prompt_schedule(settings, clip)

```
