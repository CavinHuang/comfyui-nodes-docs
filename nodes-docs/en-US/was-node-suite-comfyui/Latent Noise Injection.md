---
tags:
- LatentNoise
- Noise
---

# Latent Noise Injection
## Documentation
- Class name: `Latent Noise Injection`
- Category: `WAS Suite/Latent/Generate`
- Output node: `False`

The Latent Noise Injection node is designed to augment latent representations with stochastic noise. This process can introduce variability and potentially enhance the generative qualities of models by injecting controlled noise into the latent space.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to which noise will be added. Injecting noise into these samples can help in exploring variations in the generated outputs.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`noise_std`**
    - The 'noise_std' parameter controls the standard deviation of the noise to be injected, allowing for fine-tuning of the noise intensity for different effects on the latent samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent samples, now augmented with noise according to the specified standard deviation.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute



## Source code
```python
class WAS_Latent_Noise:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "samples": ("LATENT",),
                "noise_std": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "inject_noise"

    CATEGORY = "WAS Suite/Latent/Generate"

    def inject_noise(self, samples, noise_std):
        s = samples.copy()
        noise = torch.randn_like(s["samples"]) * noise_std
        s["samples"] = s["samples"] + noise
        return (s,)

```
