---
tags:
- SamplerScheduler
- Sampling
---

# TiledKSamplerProvider
## Documentation
- Class name: `TiledKSamplerProvider`
- Category: `ImpactPack/Sampler`
- Output node: `False`

The TiledKSamplerProvider node is designed to facilitate the generation of samples using a tiled K-sampling approach. It configures and utilizes a specialized sampler that operates on tiles of an image, allowing for efficient and scalable image generation with customizable sampling strategies.
## Input types
### Required
- **`seed`**
    - Specifies the initial seed for random number generation, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps to be taken in the sampling process, affecting the detail and quality of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration setting for the sampling process, influencing the behavior and characteristics of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific K-sampler to be used, allowing for flexibility in choosing the sampling algorithm.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, enabling fine-tuning of the sampling dynamics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the denoising factor applied during sampling, impacting the clarity and noise level of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tile_width`**
    - Sets the width of the tiles used in the sampling process, defining the granularity of the tiled approach.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - Sets the height of the tiles used in the sampling process, defining the granularity of the tiled approach.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tiling_strategy`**
    - Determines the strategy for tiling the image during sampling, affecting the overall sampling pattern and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`basic_pipe`**
    - Provides the basic pipeline components required for the sampling process, including the model and positive/negative conditioning.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
## Output types
- **`ksampler`**
    - Comfy dtype: `KSAMPLER`
    - Returns a configured KSampler instance ready for sampling operations.
    - Python dtype: `KSamplerWrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TiledKSamplerProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "tile_width": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tile_height": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tiling_strategy": (["random", "padded", 'simple'], ),
                    "basic_pipe": ("BASIC_PIPE", )
                    }}

    RETURN_TYPES = ("KSAMPLER",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Sampler"

    def doit(self, seed, steps, cfg, sampler_name, scheduler, denoise,
             tile_width, tile_height, tiling_strategy, basic_pipe):
        model, _, _, positive, negative = basic_pipe
        sampler = core.TiledKSamplerWrapper(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise,
                                            tile_width, tile_height, tiling_strategy)
        return (sampler, )

```
