---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# ImageToImage Pipe (JPS)
## Documentation
- Class name: `ImageToImage Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The ImageToImage Pipe node is designed to process image-to-image settings, extracting and returning various parameters related to image transformation processes. It abstracts the complexity of configuring settings for image-to-image operations, providing a streamlined interface for specifying and retrieving transformation parameters.
## Input types
### Required
- **`img2img_settings`**
    - Specifies the settings for image-to-image transformation, including strengths and configurations for inpainting, unsampling, and other related processes. It is crucial for defining how the image will be processed and transformed.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[float, float, int, float, float, comfy.samplers.KSampler.SAMPLERS, comfy.samplers.KSampler.SCHEDULERS]`
## Output types
- **`img2img_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the image-to-image transformation.
    - Python dtype: `float`
- **`inpaint_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the inpainting process in the transformation.
    - Python dtype: `float`
- **`inpaint_grow_mask`**
    - Comfy dtype: `INT`
    - Specifies how much the inpaint mask should grow.
    - Python dtype: `int`
- **`unsampler_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the unsampling process.
    - Python dtype: `float`
- **`unsampler_cfg`**
    - Comfy dtype: `FLOAT`
    - Configuration for the unsampler process.
    - Python dtype: `float`
- **`unsampler_sampler`**
    - Comfy dtype: `COMBO[STRING]`
    - The sampler used in the unsampling process.
    - Python dtype: `comfy.samplers.KSampler.SAMPLERS`
- **`unsampler_scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - The scheduler used for unsampling.
    - Python dtype: `comfy.samplers.KSampler.SCHEDULERS`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageToImage_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img2img_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("FLOAT", "FLOAT", "INT", "FLOAT", "FLOAT", comfy.samplers.KSampler.SAMPLERS, comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("img2img_strength", "inpaint_strength", "inpaint_grow_mask", "unsampler_strength", "unsampler_cfg", "unsampler_sampler", "unsampler_scheduler",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,img2img_settings):
        
        img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler = img2img_settings

        return(img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler,)

```
