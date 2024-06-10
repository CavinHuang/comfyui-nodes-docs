---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Prompt Schedule SDXL 📅🅕🅝
## Documentation
- Class name: `PromptScheduleEncodeSDXL`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

This node is designed to schedule and encode prompts specifically for the SDXL model, allowing for separate scheduling of G and L clips before tokenization. It processes these clips through an add_weighted mechanism to return the current, next, or averaged conditioning, facilitating dynamic and flexible text input manipulation for generative tasks.
## Input types
### Required
- **`width`**
    - Specifies the width of the image or canvas in pixels, setting the spatial dimension for the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image or canvas in pixels, setting the spatial dimension for the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - Defines the width of the crop area in pixels, allowing for focused generation within a specified region of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Defines the height of the crop area in pixels, allowing for focused generation within a specified region of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - Sets the target width for the output image, enabling resizing of the generated image to fit specific dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Sets the target height for the output image, enabling resizing of the generated image to fit specific dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_g`**
    - Represents the global text prompt that guides the overall theme or subject of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - Specifies the CLIP model to be used for encoding the text prompts, influencing the direction of the generation.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`text_l`**
    - Represents the local text prompt that provides detailed guidance for specific areas or aspects of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - Defines the maximum number of frames for animation or video generation, setting the temporal boundary for the project.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - Specifies the current frame number in the context of an animation or video generation, dictating the specific moment being processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - Enables or disables the printing of output for debugging or tracking purposes, offering insights into the generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text_G`**
    - Specifies the text to be prepended to the global prompt, modifying the initial conditions of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_G`**
    - Specifies the text to be appended to the global prompt, modifying the final conditions of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pre_text_L`**
    - Specifies the text to be prepended to the local prompt, modifying the initial conditions of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text_L`**
    - Specifies the text to be appended to the local prompt, modifying the final conditions of the generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pw_a`**
    - Parameter weight A, part of a set of weights used to adjust the influence of different components in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Parameter weight B, part of a set of weights used to adjust the influence of different components in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - Parameter weight C, part of a set of weights used to adjust the influence of different components in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - Parameter weight D, part of a set of weights used to adjust the influence of different components in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - The encoded positive conditioning, ready for use in generative tasks, reflecting the emphasized aspects of the input prompt.
    - Python dtype: `object`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - The encoded negative conditioning, ready for use in generative tasks, reflecting the de-emphasized aspects of the input prompt.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PromptScheduleEncodeSDXL:
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
                "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0}),
                "print_output":("BOOLEAN", {"default": False})
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
    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, max_frames, current_frame, print_output, pw_a, pw_b, pw_c, pw_d):
        settings = ScheduleSettings(
            text_g=text_g,
            pre_text_G=pre_text_G,
            app_text_G=app_text_G,
            text_L=text_l,
            pre_text_L=pre_text_L,
            app_text_L=app_text_L,
            max_frames=max_frames,
            current_frame=current_frame,
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
        return prompt_schedule_SDXL(settings,clip)

```
