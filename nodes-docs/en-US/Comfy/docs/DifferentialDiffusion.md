---
tags:
- LayeredDiffusion
---

# Differential Diffusion
## Documentation
- Class name: `DifferentialDiffusion`
- Category: `_for_testing`
- Output node: `False`

The DifferentialDiffusion node applies a custom denoising mask function to a given model, enhancing its ability to perform differential diffusion processes. This node modifies the model's behavior by integrating a forward function that dynamically adjusts the denoising threshold based on the model's internal timestep calculations, facilitating more nuanced control over the diffusion process.
## Input types
### Required
- **`model`**
    - The model to which the differential diffusion process will be applied. This parameter is crucial as it determines the base model that will be enhanced with a custom denoising mask function, directly influencing the diffusion behavior and outcomes.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model with a custom denoising mask function applied, capable of performing differential diffusion processes with adjusted denoising thresholds.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DifferentialDiffusion():
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL", ),
                            }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply"
    CATEGORY = "_for_testing"
    INIT = False

    def apply(self, model):
        model = model.clone()
        model.set_model_denoise_mask_function(self.forward)
        return (model,)

    def forward(self, sigma: torch.Tensor, denoise_mask: torch.Tensor, extra_options: dict):
        model = extra_options["model"]
        step_sigmas = extra_options["sigmas"]
        sigma_to = model.inner_model.model_sampling.sigma_min
        if step_sigmas[-1] > sigma_to:
            sigma_to = step_sigmas[-1]
        sigma_from = step_sigmas[0]

        ts_from = model.inner_model.model_sampling.timestep(sigma_from)
        ts_to = model.inner_model.model_sampling.timestep(sigma_to)
        current_ts = model.inner_model.model_sampling.timestep(sigma[0])

        threshold = (current_ts - ts_to) / (ts_from - ts_to)

        return (denoise_mask >= threshold).to(denoise_mask.dtype)

```
