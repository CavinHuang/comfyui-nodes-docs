---
tags:
- Image
- SDXLSettings
---

# SDXL Basic Settings Pipe (JPS)
## Documentation
- Class name: `SDXL Basic Settings Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

This node processes basic settings for SDXL, translating a structured input of settings into specific output values that are essential for image generation processes. It encapsulates the functionality to parse and convert settings related to resolution, sampling, and image refinement parameters into a format that can be utilized by downstream processes or components.
## Input types
### Required
- **`sdxl_basic_settings`**
    - Represents the basic settings for SDXL, including resolution, sampling, and image refinement parameters. It is crucial for determining the output values that configure the image generation process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, int, str, str, int, int, float, float, float, float, int, int, str, int]`
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
- **`sampler_name`**
    - Comfy dtype: `COMBO[STRING]`
    - The name of the sampler used for image generation.
    - Python dtype: `str`
- **`scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - The scheduler used alongside the sampler for image generation.
    - Python dtype: `str`
- **`steps_total`**
    - Comfy dtype: `INT`
    - The total number of steps for the image generation process.
    - Python dtype: `int`
- **`step_split`**
    - Comfy dtype: `INT`
    - The step split value used in the image generation process.
    - Python dtype: `int`
- **`cfg`**
    - Comfy dtype: `FLOAT`
    - The CFG scale used in the image generation process.
    - Python dtype: `float`
- **`cfg_rescale`**
    - Comfy dtype: `FLOAT`
    - The CFG rescale value, adjusting the influence of CFG on the process.
    - Python dtype: `float`
- **`cfg_refiner`**
    - Comfy dtype: `FLOAT`
    - The CFG refiner scale, refining the CFG's effect.
    - Python dtype: `float`
- **`ascore_refiner`**
    - Comfy dtype: `FLOAT`
    - The ascore refiner value, refining the ascore's effect.
    - Python dtype: `float`
- **`res_factor`**
    - Comfy dtype: `INT`
    - The resolution factor, influencing the overall image resolution.
    - Python dtype: `int`
- **`clip_skip`**
    - Comfy dtype: `INT`
    - The number of CLIP model skips during the generation process.
    - Python dtype: `int`
- **`filename`**
    - Comfy dtype: `STRING`
    - The filename for the generated image.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Basic_Settings_Pipe:
    resolution = ["square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sdxl_basic_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT","INT","INT",comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,"INT","INT","FLOAT","FLOAT","FLOAT","FLOAT","INT","INT","STRING",)
    RETURN_NAMES = ("image_res","width","height","sampler_name","scheduler","steps_total","step_split","cfg","cfg_rescale","cfg_refiner","ascore_refiner","res_factor","clip_skip","filename",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,sdxl_basic_settings):
        
        width, height, sampler_name, scheduler, steps_total, step_split, cfg, cfg_rescale, cfg_refiner, ascore_refiner, res_factor, clip_skip, filename,image_res = sdxl_basic_settings

        return(int(image_res), int(width), int(height), sampler_name, scheduler, int(steps_total), int(step_split), float(cfg), float(cfg_rescale), float(cfg_refiner), float(ascore_refiner), int (res_factor), int(clip_skip), str(filename),)

```
