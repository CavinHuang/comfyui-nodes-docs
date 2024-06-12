---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Batch Prompt Schedule SDXL (Latent Input) 📅🅕🅝
## Documentation
- Class name: `BatchPromptScheduleSDXLLatentInput`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

This node processes animation prompts for both G and L types, applies pre and post text modifications, and then generates positive and negative prompt conditionings for each. It utilizes a batch processing approach to handle multiple prompts simultaneously, incorporating latent inputs to tailor the output conditionings. The node is designed to work with SDXL scheduling, optimizing the animation prompt processing for scenarios involving complex scheduling and interpolation requirements.
## Input types
### Required
- **`width`**
    - Specifies the width of the output animation, affecting the processing and conditioning of animation prompts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the output animation, impacting the prompt processing and conditioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - The width of the crop area, used in the processing of animation prompts to adjust the visual focus.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - The height of the crop area, used alongside crop_w to fine-tune the focus area in the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - The target width for the animation output, influencing the scaling and processing of prompts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - The target height for the animation output, affecting the scaling and conditioning of prompts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_g`**
    - The text_g input is essential for generating the G type animation prompts, which are then processed to create positive and negative conditionings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The clip parameter is used to apply clip-based modifications or conditionings to the processed prompts, influencing the final output based on the clip's characteristics.
    - Comfy dtype: `CLIP`
    - Python dtype: `ClipType`
- **`text_l`**
    - The text_l input is used for generating the L type animation prompts, contributing to the creation of positive and negative conditionings alongside text_g.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`num_latents`**
    - Provides the number of latent vectors to be used, influencing the batch processing and conditioning of animation prompts.
    - Comfy dtype: `LATENT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag indicating whether to print the output of the processing for debugging or logging purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text_G`**
    - Pre-text to be added to the G type animation prompts before processing, used for modifying or enhancing the original prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_G`**
    - App-text to be appended to the G type animation prompts, further customizing the prompts before they are split into positive and negative conditionings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pre_text_L`**
    - Pre-text to be added to the L type animation prompts before processing, enhancing or modifying the original prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_L`**
    - App-text to be appended to the L type animation prompts, further customizing the prompts alongside pre_text_L before splitting into positive and negative conditionings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - A weight parameter for adjusting the processing of animation prompts, part of a set of weights used for fine-tuning the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Another weight parameter for prompt processing adjustment, contributing to the customization of the conditioning process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - A weight parameter used in conjunction with others to tailor the prompt processing and conditioning outputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - The final weight parameter in the set, used for precise adjustments in the animation prompt conditioning process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - The POS output consists of processed prompts that have been positively conditioned, ready for further processing or utilization in animation generation.
    - Python dtype: `List[ConditioningType]`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - The NEG output includes prompts that have undergone negative conditioning, complementing the POS conditionings for a balanced approach to animation prompt processing.
    - Python dtype: `List[ConditioningType]`
- **`POS_CUR`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchPromptScheduleEncodeSDXLLatentInput:
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
                "num_latents": ("LATENT", ),
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
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT",)# "CONDITIONING", "CONDITIONING", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG", "POS_CUR", "NEG_CUR", "POS_NXT", "NEG_NXT",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, num_latents, print_output, pw_a, pw_b, pw_c, pw_d):
        settings = ScheduleSettings(
            text_g=text_g,
            pre_text_G=pre_text_G,
            app_text_G=app_text_G,
            text_L=text_l,
            pre_text_L=pre_text_L,
            app_text_L=app_text_L,
            max_frames=sum(tensor.size(0) for tensor in num_latents.values()),
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
        return batch_prompt_schedule_SDXL_latentInput(settings, clip, num_latents)

```
