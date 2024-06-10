---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# ImageToImage Settings (JPS)
## Documentation
- Class name: `ImageToImage Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

The ImageToImage Settings node is designed to configure and apply specific settings for image-to-image transformation tasks within the JPS Nodes framework. It focuses on adjusting parameters that influence how an input image is processed and transformed into an output image, catering to various customization needs for image manipulation.
## Input types
### Required
- **`img2img_strength`**
    - Specifies the strength of the image-to-image transformation, affecting the intensity of the applied changes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inpaint_strength`**
    - Determines the strength of the inpainting effect, influencing how missing or unwanted parts of the image are filled in.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inpaint_grow_mask`**
    - Sets the amount by which the inpainting mask is expanded, affecting the area of the image that is subject to inpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`unsampler_strength`**
    - Defines the strength of the unsampling process, affecting the level of detail enhancement in the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`unsampler_cfg`**
    - Specifies the configuration for the unsampler, influencing the algorithm's behavior and output quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unsampler_sampler`**
    - Selects the sampling method used by the unsampler, affecting the texture and quality of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`unsampler_scheduler`**
    - Chooses the scheduling algorithm for the unsampling process, impacting the progression and quality of image transformation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`img2img_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Outputs the configured settings for image-to-image transformation, encapsulating all adjustments made for processing the input image.
    - Python dtype: `Tuple[float, float, int, float, float, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageToImage_Settings:
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img2img_strength": ("INT", {"default": 50, "min": 0, "max": 100, "step": 1}),
                "inpaint_strength": ("INT", {"default": 100, "min": 2, "max": 100, "step": 1}),
                "inpaint_grow_mask": ("INT", {"default": 20, "min": 0, "max": 200, "step": 2}),
                "unsampler_strength": ("INT", {"default": 30, "min": 0, "max": 100, "step": 1}),
                "unsampler_cfg": ("FLOAT", {"default": 1, "min": 1, "max": 10, "step": 0.1}),
                "unsampler_sampler": (comfy.samplers.KSampler.SAMPLERS,),
                "unsampler_scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("img2img_settings",)
    FUNCTION = "get_img2img"

    CATEGORY="JPS Nodes/Settings"

    def get_img2img(self, img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler,):

        img2img_strength = (img2img_strength + 0.001) / 100

        inpaint_strength = (100 - inpaint_strength + 0.001) / 100

        unsampler_strength = (unsampler_strength + 0.001) / 100
        
        img2img_settings = img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler

        return(img2img_settings,)

```
