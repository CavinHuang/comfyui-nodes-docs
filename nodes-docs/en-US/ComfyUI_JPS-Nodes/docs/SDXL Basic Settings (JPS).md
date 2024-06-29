---
tags:
- Image
- SDXLSettings
---

# SDXL Basic Settings (JPS)
## Documentation
- Class name: `SDXL Basic Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure the basic settings for SDXL image generation, including resolution, sampler, scheduler, and various parameters related to image refinement and generation steps. It abstracts the complexity of setting up these parameters, providing a streamlined interface for users to easily adjust the core settings that influence the quality and characteristics of the generated images.
## Input types
### Required
- **`resolution`**
    - Specifies the desired resolution for the image generation, chosen from a predefined list of resolutions. This setting directly impacts the dimensions of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sampler_name`**
    - Determines the sampler to be used for image generation, affecting the sampling process and the quality of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for managing the sampling process, influencing how the generation steps are executed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps_total`**
    - The total number of steps to be used in the image generation process, impacting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`base_percentage`**
    - Defines the base percentage of the image to be generated in the initial steps, influencing the progression of image detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter for controlling the generation process, affecting the coherence and quality of the generated image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_rescale`**
    - Parameter for rescaling the configuration value, allowing for fine-tuning of the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_refiner`**
    - Adjusts the configuration for refining the generation process, enhancing the quality of the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ascore_refiner`**
    - Refines the ascore to adjust the quality of the generated image, impacting the final image aesthetics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`res_factor`**
    - Factor for adjusting the resolution of the generated image, influencing the overall image quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`clip_skip`**
    - Determines the number of clipping steps to skip in the generation process, affecting the final image output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filename`**
    - The filename for the generated image, used for saving and identifying the output file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`sdxl_basic_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Encapsulates the configured basic settings for SDXL image generation, including resolution, sampler, scheduler, and various parameters for image refinement and generation steps.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Basic_Settings:
    resolution = ["Use Image Resolution", "square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resolution": (s.resolution,),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "steps_total": ("INT", {"default": 60, "min": 20, "max": 250, "step": 5}),
                "base_percentage": ("INT", {"default": 80, "min": 5, "max": 100, "step": 5}),
                "cfg": ("FLOAT", {"default": 6.5, "min": 1, "max": 20, "step": 0.1}),
                "cfg_rescale": ("FLOAT", {"default": 0.00, "min": 0.00, "max": 1.00, "step": 0.05}),
                "cfg_refiner": ("FLOAT", {"default": 6.5, "min": 0, "max": 20, "step": 0.1}),
                "ascore_refiner": ("FLOAT", {"default": 6, "min": 1, "max": 10, "step": 0.5}),
                "res_factor": ("INT", {"default": 4, "min": 1, "max": 8, "step": 1}),
                "clip_skip": ("INT", {"default": -2, "min": -24, "max": -1}),
                "filename": ("STRING", {"default": "JPS"}),
        }}
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("sdxl_basic_settings",)
    FUNCTION = "get_values"

    CATEGORY="JPS Nodes/Settings"

    def get_values(self,resolution,sampler_name,scheduler,steps_total,base_percentage,cfg,cfg_rescale,cfg_refiner,ascore_refiner,res_factor,clip_skip,filename):
        width = 1024
        height = 1024
        width = int(width)
        height = int(height)
        steps_total = int(steps_total)
        step_split = steps_total * base_percentage / 100
        cfg = float(cfg)
        cfg_rescale = float(cfg_rescale)
        cfg_refiner = float (cfg_refiner)
        ascore_refiner = float (ascore_refiner)
        res_factor = int (res_factor)
        base_percentage = int (base_percentage)
        image_res = 1

        if(resolution == "Use Image Resolution"):
            image_res = 2
        if(resolution == "square - 1024x1024 (1:1)"):
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

        if(cfg_refiner == 0):
            cfg_refiner = cfg
        
        sdxl_basic_settings = width, height, sampler_name, scheduler, steps_total, step_split, cfg, cfg_rescale, cfg_refiner, ascore_refiner, res_factor, clip_skip, filename,image_res

        return(sdxl_basic_settings,)

```
