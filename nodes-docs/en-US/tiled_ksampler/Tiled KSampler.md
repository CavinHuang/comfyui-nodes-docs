---
tags:
- Sampling
---

# Tiled KSampler
## Documentation
- Class name: `Tiled KSampler`
- Category: `Sampling/Tiled`
- Output node: `False`

The Tiled KSampler node is designed for advanced sampling in generative models, specifically tailored for handling tiled inputs. It incorporates circular padding and customizable sampling strategies to generate high-quality latent representations.
## Input types
### Required
- **`model`**
    - The generative model used for sampling. It's crucial for defining the architecture and parameters that will be used during the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - A seed value to ensure reproducibility of the sampling process. It influences the randomness of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tiling`**
    - A flag indicating whether circular padding should be applied, enhancing the quality of tiled samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform during the sampling process, affecting the detail and quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - A configuration parameter influencing the sampling process, allowing for fine-tuning of the generative model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler to use, determining the specific sampling strategy employed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler to use, controlling the progression of sampling steps and potentially improving sample quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive conditioning information to guide the sampling towards desired characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`negative`**
    - Negative conditioning information to steer the sampling away from undesired characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_image`**
    - An initial latent image to start the sampling from, allowing for modifications or enhancements of existing samples.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`denoise`**
    - A parameter to control the denoising strength during sampling, affecting the clarity and sharpness of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The generated latent representation, which can be further processed or converted into a final image.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Tiled_KSampler:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"model": ("MODEL", ),
                 "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                 "tiling": ("INT", {"default": 1, "min": 0, "max": 1}),
                 "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                 "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                 "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                 "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                 "positive": ("CONDITIONING", ),
                 "negative": ("CONDITIONING", ),
                 "latent_image": ("LATENT", ),
                 "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                 }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "Sampling/Tiled"
    def apply_circular(self, model, enable):
        for layer in [layer for layer in model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_mode = 'circular' if enable else 'zeros'

    def sample(self, model, seed, tiling, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        self.apply_circular(model.model, tiling == 1)
        return nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)

```
