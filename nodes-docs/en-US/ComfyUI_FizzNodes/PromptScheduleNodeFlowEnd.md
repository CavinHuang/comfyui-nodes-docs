---
tags:
- AnimationScheduling
- Scheduling
---

# Prompt Schedule NodeFlow End 📅🅕🅝
## Documentation
- Class name: `PromptScheduleNodeFlowEnd`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

This node represents the final step in a scheduling flow for processing and evaluating JSON data produced by preceding nodes. It focuses on finalizing the scheduling process by applying specific settings and adjustments to the input data, ensuring the output is ready for subsequent use or display.
## Input types
### Required
- **`text`**
    - The main text input that has been formatted and processed through the scheduling flow. It serves as the base content for final adjustments and evaluations in this node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A clip input that may influence the scheduling process by providing context or constraints related to media content.
    - Comfy dtype: `CLIP`
    - Python dtype: `Clip`
- **`max_frames`**
    - Specifies the maximum number of frames to be considered in the scheduling process, affecting how the input text is evaluated and processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A flag indicating whether the output should be printed, affecting the node's behavior in terms of displaying the processed results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`current_frame`**
    - Indicates the current frame being processed, which is crucial for determining the specific adjustments and evaluations to be applied based on the scheduling settings.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`pre_text`**
    - Optional pre-text that can be used to prepend to the main text input for additional context or instructions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - Optional appended text that can be added to the main text input for further details or instructions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - A parameter weight that can influence the scheduling process by adjusting the importance or effect of certain inputs or settings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - A parameter weight similar to pw_a, providing an additional level of control over the scheduling adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - Another parameter weight offering further customization of the scheduling process through its influence on input handling or output generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - The final parameter weight, allowing for comprehensive customization of the scheduling process by affecting various aspects of input processing and output generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - Represents a positive conditioning output, indicating a successful scheduling or processing outcome.
    - Python dtype: `str`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - Denotes a negative conditioning output, signifying an unsuccessful scheduling or processing outcome that may require further adjustment.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptScheduleNodeFlowEnd:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": False, "forceInput": True}), 
                            "clip": ("CLIP", ),
                            "max_frames": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0,}),
                            "print_output": ("BOOLEAN", {"default": False}),
                            "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0, "forceInput": True}),},
               "optional": {"pre_text": ("STRING", {"multiline": True, "forceInput": True}),
                            "app_text": ("STRING", {"multiline": True, "forceInput": True}),
                            "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                            "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                            "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                            "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True}),
                            }}
    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def animate(self, text, max_frames, print_output, current_frame, clip, pw_a = 0, pw_b = 0, pw_c = 0, pw_d = 0, pre_text = '', app_text = ''):
        if text[-1] == ",":
            text = text[:-1]
        if text[0] == ",":
            text = text[:0]
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
        return prompt_schedule(settings, clip)

```
