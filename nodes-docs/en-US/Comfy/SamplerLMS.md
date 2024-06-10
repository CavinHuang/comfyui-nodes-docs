---
tags:
- Sampling
---

# SamplerLMS
## Documentation
- Class name: `SamplerLMS`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

The SamplerLMS node provides a mechanism to generate a sampler based on the LMS (Least Mean Squares) algorithm, allowing for the customization of the sampling process through the adjustment of the order parameter. This node is designed to facilitate the creation of samplers that utilize the LMS method for applications within custom sampling strategies.
## Input types
### Required
- **`order`**
    - The 'order' parameter specifies the order of the LMS algorithm used in the sampling process. Adjusting this parameter allows for the tuning of the sampler's behavior, impacting the quality and characteristics of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - This output represents a sampler configured according to the LMS algorithm and the specified order parameter. It is ready to be used in sampling tasks within the framework.
    - Python dtype: `comfy.samplers.KSampler`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SamplerLMS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"order": ("INT", {"default": 4, "min": 1, "max": 100}),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, order):
        sampler = comfy.samplers.ksampler("lms", {"order": order})
        return (sampler, )

```
