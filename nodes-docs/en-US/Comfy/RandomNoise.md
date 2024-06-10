---
tags:
- LatentNoise
- Noise
---

# RandomNoise
## Documentation
- Class name: `RandomNoise`
- Category: `sampling/custom_sampling/noise`
- Output node: `False`

The RandomNoise node generates random noise based on a given seed. It is designed to introduce variability into processes by providing a randomized element that can be consistently reproduced using the seed value.
## Input types
### Required
- **`noise_seed`**
    - The 'noise_seed' parameter specifies the seed for the random noise generation, ensuring reproducibility of the noise pattern for given seed values. It plays a crucial role in the generation of consistent random noise across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`noise`**
    - Comfy dtype: `NOISE`
    - This output represents the generated random noise, which can be used to introduce randomness into various processes, such as image generation or sampling, based on the provided seed.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomNoise(DisableNoise):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     }
                }

    def get_noise(self, noise_seed):
        return (Noise_RandomNoise(noise_seed),)

```
