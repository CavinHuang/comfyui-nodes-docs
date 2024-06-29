---
tags:
- Image
- SDXLSettings
---

# SDXL Settings Pipe (JPS)
## Documentation
- Class name: `SDXL Settings Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The SDXL Settings Pipe node is designed to process and return a comprehensive set of settings for image generation, including resolution, sampling, scheduling, and other configuration parameters. It abstracts the complexity of configuring various aspects of image generation into a simple interface, enabling users to easily specify and retrieve detailed settings for their image generation tasks.
## Input types
### Required
- **`sdxl_settings`**
    - Serves as the comprehensive input encapsulating all necessary settings for the SDXL image generation process. It is essential for determining the configuration and resultant behavior of the image generation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, int, int, int, str, str, int, float, float, int, str, int]`
## Output types
- **`image_res`**
    - Comfy dtype: `INT`
    - The resolution of the generated image.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the generated image in pixels.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the generated image in pixels.
    - Python dtype: `int`
- **`res_factor`**
    - Comfy dtype: `INT`
    - A factor influencing the resolution of the generated image.
    - Python dtype: `int`
- **`sampler_name`**
    - Comfy dtype: `COMBO[STRING]`
    - The name of the sampling method used for image generation.
    - Python dtype: `str`
- **`scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - The scheduling method used during the image generation process.
    - Python dtype: `str`
- **`steps`**
    - Comfy dtype: `INT`
    - The number of steps to be taken in the image generation process.
    - Python dtype: `int`
- **`cfg`**
    - Comfy dtype: `FLOAT`
    - A configuration parameter affecting the generation process.
    - Python dtype: `float`
- **`cfg_rescale`**
    - Comfy dtype: `FLOAT`
    - A parameter for rescaling the configuration during the generation process.
    - Python dtype: `float`
- **`clip_skip`**
    - Comfy dtype: `INT`
    - Indicates the number of clipping steps to skip during the generation process.
    - Python dtype: `int`
- **`filename`**
    - Comfy dtype: `STRING`
    - The name of the file where the generated image will be saved.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sdxl_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT","INT","INT","INT",comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,"INT","FLOAT","FLOAT","INT","STRING",)
    RETURN_NAMES = ("image_res","width","height","res_factor","sampler_name","scheduler","steps","cfg","cfg_rescale","clip_skip","filename",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,sdxl_settings):
        
        width, height, res_factor, sampler_name, scheduler, steps, cfg, cfg_rescale, clip_skip, filename,image_res = sdxl_settings

        return(int(image_res), int(width), int(height), int (res_factor), sampler_name, scheduler, int(steps), float(cfg), float(cfg_rescale), int(clip_skip), str(filename),)

```
