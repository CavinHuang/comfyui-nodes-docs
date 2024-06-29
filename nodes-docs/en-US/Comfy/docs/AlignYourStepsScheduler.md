---
tags:
- SigmaScheduling
---

# AlignYourStepsScheduler
## Documentation
- Class name: `AlignYourStepsScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The AlignYourStepsScheduler node is designed to adjust the noise levels (sigmas) for a given model type over a specified number of steps, ensuring that the diffusion process is aligned with the model's requirements. It dynamically interpolates or selects predefined noise levels to match the step count, facilitating a tailored diffusion process.
## Input types
### Required
- **`model_type`**
    - Specifies the model type for which the noise levels are to be adjusted, affecting the selection or interpolation of noise levels.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`steps`**
    - Determines the number of steps for the diffusion process, influencing the interpolation or selection of noise levels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A tensor of noise levels (sigmas) adjusted to align with the specified steps and model type.
    - Python dtype: `torch.FloatTensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlignYourStepsScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model_type": (["SD1", "SDXL", "SVD"], ),
                     "steps": ("INT", {"default": 10, "min": 10, "max": 10000}),
                      }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, model_type, steps):
        sigmas = NOISE_LEVELS[model_type][:]
        if (steps + 1) != len(sigmas):
            sigmas = loglinear_interp(sigmas, steps + 1)

        sigmas[-1] = 0
        return (torch.FloatTensor(sigmas), )

```
