---
tags:
- SamplerScheduler
- Sampling
---

# Sampler Selector
## Documentation
- Class name: `Sampler Selector`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Sampler Selector node is designed to dynamically choose and configure a sampling strategy for image generation tasks. It allows for the selection of different sampling algorithms based on input parameters, optimizing the image generation process for various scenarios and preferences.
## Input types
### Required
- **`sampler_name`**
    - Specifies the name of the sampler to be used, influencing the selection of the sampling algorithm for the image generation task.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sampler_name`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the identifier of the configured sampler object, ready for use in image generation tasks.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactKSamplerBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ImpactKSamplerBasicPipe.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class SamplerSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (comfy.samplers.KSampler.SAMPLERS,)
    RETURN_NAMES = ("sampler_name",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"sampler_name": (comfy.samplers.KSampler.SAMPLERS,)}}

    def get_names(self, sampler_name):
        return (sampler_name,)

```
