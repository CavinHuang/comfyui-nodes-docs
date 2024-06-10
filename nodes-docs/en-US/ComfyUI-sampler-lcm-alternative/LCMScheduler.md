---
tags:
- SigmaScheduling
---

# LCMScheduler
## Documentation
- Class name: `LCMScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The LCMScheduler node is designed to compute and adjust the sigma values for a given model based on the specified number of steps and denoise factor. It aims to facilitate the customization of the sampling process in generative models by providing a tailored set of sigma values that can be used to control the level of noise introduced during the generation process.
## Input types
### Required
- **`model`**
    - The 'model' parameter specifies the generative model for which the sigma values are to be calculated. It plays a crucial role in determining the specific characteristics of the noise to be introduced during the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.Model`
- **`steps`**
    - The 'steps' parameter defines the number of steps to be used in the sampling process. It directly influences the granularity of the noise adjustment, with a higher number of steps allowing for finer control over the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - The 'denoise' parameter allows for adjusting the intensity of the noise introduced during the sampling process. A lower value results in a higher number of total steps, enabling more precise control over the noise characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - This output represents the calculated sigma values for the specified model and parameters. These values are crucial for controlling the noise level in the generative process, directly impacting the quality and characteristics of the generated output.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)



## Source code
```python
class LCMScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "steps": ("INT", {"default": 8, "min": 1, "max": 10000}),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                      }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, model, steps, denoise):
        total_steps = steps
        if denoise < 1.0:
            total_steps = int(steps/denoise)

        comfy.model_management.load_models_gpu([model])
        sigmas = comfy.samplers.calculate_sigmas(model.get_model_object("model_sampling"), "sgm_uniform", total_steps).cpu()
        sigmas = sigmas[-(steps + 1):]
        return (sigmas, )

```
