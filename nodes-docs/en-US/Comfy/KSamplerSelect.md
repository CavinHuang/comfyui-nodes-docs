---
tags:
- SamplerScheduler
- Sampling
---

# KSamplerSelect
## Documentation
- Class name: `KSamplerSelect`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

The KSamplerSelect node is designed to select a specific sampler based on the provided sampler name. It abstracts the complexity of sampler selection, allowing users to easily switch between different sampling strategies for their tasks.
## Input types
### Required
- **`sampler_name`**
    - Specifies the name of the sampler to be selected. This parameter determines which sampling strategy will be used, impacting the overall sampling behavior and results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - Returns the selected sampler object, ready to be used for sampling tasks.
    - Python dtype: `comfy.samplers.Sampler`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - Reroute



## Source code
```python
class KSamplerSelect:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"sampler_name": (comfy.samplers.SAMPLER_NAMES, ),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, sampler_name):
        sampler = comfy.samplers.sampler_object(sampler_name)
        return (sampler, )

```
