---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Batch Prompt Schedule SDXL 📅🅕🅝
## Documentation
- Class name: `BatchPromptScheduleEncodeSDXL`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

This node is designed to process and schedule G and L clips separately before tokenization, applying an add_weighted process to generate a batch of conditionings. It focuses on handling and transforming input prompts into scheduled outputs, optimizing the conditioning process for batch operations.
## Input types
### Required
- **`width`**
    - Specifies the desired width for the output conditioning, affecting the dimensionality of the processed batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height for the output conditioning, affecting the dimensionality of the processed batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - Determines the width of the crop to be applied to the input, influencing the focus area of the conditioning process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Determines the height of the crop to be applied to the input, influencing the focus area of the conditioning process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - Defines the target width for the final output, impacting the resolution of the conditioned batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Defines the target height for the final output, impacting the resolution of the conditioned batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_g`**
    - The G clip text input that will be processed and scheduled, contributing to the generation of the conditioning batch.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The CLIP model used for tokenization and encoding of the input texts, central to the conditioning process.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`text_l`**
    - The L clip text input that will be processed and scheduled alongside the G clip, contributing to the diversity of the conditioning batch.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - Specifies the maximum number of frames to be considered for scheduling, influencing the temporal aspect of the conditioning process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A flag indicating whether to print the output for debugging or logging purposes, affecting the verbosity of the process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text_G`**
    - Pre-text for the G clip, used to prepend to the input text for further customization of the conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_G`**
    - Appended text for the G clip, used to append to the input text for additional customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pre_text_L`**
    - Pre-text for the L clip, used in a similar manner to the G clip for enhancing the input conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_L`**
    - Appended text for the L clip, serving the same purpose as for the G clip, enriching the input for a more tailored conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - Weight parameter A, part of a set of weights used in the add_weighted process to fine-tune the conditioning output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Weight parameter B, works alongside other weight parameters to adjust the emphasis of the conditioning process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - Weight parameter C, contributes to the balance and distribution of weights in the conditioning output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - Weight parameter D, finalizes the set of weights for precise control over the conditioning outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - The processed output that emphasizes the positive aspects of the conditioned batch, reflecting the scheduled and weighted transformation of the input.
    - Python dtype: `str`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - The processed output that emphasizes the negative aspects of the conditioned batch, showcasing the scheduled and weighted transformation of the input to provide a balanced perspective.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchPromptScheduleEncodeSDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                    "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                    "crop_w": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
                    "crop_h": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
                    "target_width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                    "target_height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                    "text_g": ("STRING", {"multiline": True, }), "clip": ("CLIP", ),
                    "text_l": ("STRING", {"multiline": True, }), "clip": ("CLIP", ),
                    "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                    "print_output":("BOOLEAN", {"default": False}),
            },
                "optional": {
                    "pre_text_G": ("STRING", {"multiline": True, "forceInput": True}),
                    "app_text_G": ("STRING", {"multiline": True, "forceInput": True}),
                    "pre_text_L": ("STRING", {"multiline": True, "forceInput": True}),
                    "app_text_L": ("STRING", {"multiline": True, "forceInput": True}),
                    "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
            }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)# "CONDITIONING", "CONDITIONING", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG", "POS_CUR", "NEG_CUR", "POS_NXT", "NEG_NXT",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, max_frames, print_output, pw_a=0, pw_b=0, pw_c=0, pw_d=0):
        settings = ScheduleSettings(
            text_g=text_g,
            pre_text_G=pre_text_G,
            app_text_G=app_text_G,
            text_L=text_l,
            pre_text_L=pre_text_L,
            app_text_L=app_text_L,
            max_frames=max_frames,
            current_frame=None,
            print_output=print_output,
            pw_a=pw_a,
            pw_b=pw_b,
            pw_c=pw_c,
            pw_d=pw_d,
            start_frame=0,
            width=width,
            height=height,
            crop_w=crop_w,
            crop_h=crop_h,
            target_width=target_width,
            target_height=target_height,
        )
        return batch_prompt_schedule_SDXL(settings, clip)

```
