---
tags:
- Sampling
---

# Global Sampler (Inspire)
## Documentation
- Class name: `GlobalSampler __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `True`

The GlobalSampler __Inspire node is designed to integrate various advanced sampling techniques for image generation and manipulation within the Inspire Pack framework. It leverages a collection of sophisticated samplers and schedulers to offer a versatile and customizable approach to generating or modifying images, accommodating a wide range of creative and technical requirements.
## Input types
### Required
- **`sampler_name`**
    - Specifies the sampler to be used, enabling selection from a variety of predefined sampling strategies within the Inspire Pack framework.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduler for controlling the sampling process, influencing the progression and quality of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GlobalSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                "scheduler": (common.SCHEDULERS, ),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
