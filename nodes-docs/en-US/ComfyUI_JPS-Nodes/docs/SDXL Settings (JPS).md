---
tags:
- Image
- SDXLSettings
---

# SDXL Settings (JPS)
## Documentation
- Class name: `SDXL Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

The SDXL Settings (JPS) node is designed to configure and provide essential settings for image generation processes, including resolution factors, sampler and scheduler types, and other parameters critical for controlling the output quality and characteristics of generated images.
## Input types
### Required
- **`resolution`**
    - Specifies the resolution setting for the image generation, influencing the dimensions of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`res_factor`**
    - Determines the resolution factor, affecting the detail level and quality of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler_name`**
    - Selects the sampler to be used, impacting the sampling method for the image generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler type, influencing the scheduling strategy for the image generation steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Defines the total number of steps in the image generation process, affecting the refinement of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Sets the configuration value, which adjusts the generation process's behavior and output characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_rescale`**
    - Specifies the rescale value for the configuration, modifying how the configuration influences the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_skip`**
    - Indicates the number of clips to skip, affecting the processing of the image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filename`**
    - The filename for the generated image, determining the output file's name.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`sdxl_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Encapsulates a comprehensive set of settings used for the SDXL image generation process, including resolution, sampler, scheduler, and other configurations.
    - Python dtype: `Tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Settings:
    resolution = ["Use Image Resolution", "square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resolution": (s.resolution,),
                "res_factor": ("INT", {"default": 4, "min": 1, "max": 8, "step": 1}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "steps": ("INT", {"default": 60, "min": 20, "max": 250, "step": 5}),
                "cfg": ("FLOAT", {"default": 6.5, "min": 1, "max": 20, "step": 0.1}),
                "cfg_rescale": ("FLOAT", {"default": 0.00, "min": 0.00, "max": 1.00, "step": 0.05}),
                "clip_skip": ("INT", {"default": -2, "min": -24, "max": -1}),
                "filename": ("STRING", {"default": "JPS"}),
        }}
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("sdxl_settings",)
    FUNCTION = "get_values"

    CATEGORY="JPS Nodes/Settings"

    def get_values(self,resolution,res_factor,sampler_name,scheduler,steps,cfg,cfg_rescale,clip_skip,filename):

        image_res = 1
        if(resolution == "Use Image Resolution"):
            image_res = 2

        width = 1024
        height = 1024
        if(resolution == "landscape - 1152x896 (4:3)"):
            width = 1152
            height = 896
        if(resolution == "landscape - 1216x832 (3:2)"):
            width = 1216
            height = 832
        if(resolution == "landscape - 1344x768 (16:9)"):
            width = 1344
            height = 768
        if(resolution == "landscape - 1536x640 (21:9)"):
            width = 1536
            height = 640
        if(resolution == "portrait - 896x1152 (3:4)"):
            width = 896
            height = 1152
        if(resolution == "portrait - 832x1216 (2:3)"):
            width = 832
            height = 1216
        if(resolution == "portrait - 768x1344 (9:16)"):
            width = 768
            height = 1344
        if(resolution == "portrait - 640x1536 (9:21)"):
            width = 640
            height = 1536

        sdxl_settings = width, height, res_factor, sampler_name, scheduler, steps, cfg, cfg_rescale, clip_skip, filename,image_res

        return(sdxl_settings,)

```
