---
tags:
- RandomGeneration
- Seed
---

# Seed Generator
## Documentation
- Class name: `Seed Generator`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Seed Generator node is designed to provide a deterministic or randomized seed value for various operations within the image saving process. It ensures that operations can be repeatable with a fixed seed or varied with a random seed, supporting both consistency and diversity in output.
## Input types
### Required
- **`seed`**
    - The seed parameter allows users to specify a seed value for generating deterministic outputs. If not provided, a default value is used, ensuring repeatability or randomness in operations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Outputs an integer representing the seed value, which can be used to initialize random number generators or other processes requiring a seed.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [UltimateSDUpscaleNoUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscaleNoUpscale.md)
    - Reroute
    - KSamplerAdvanced //Inspire
    - [DetailerForEach](../../ComfyUI-Impact-Pack/Nodes/DetailerForEach.md)



## Source code
```python
class SeedGenerator:
    RETURN_TYPES = ("INT",)
    FUNCTION = "get_seed"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    def get_seed(self, seed):
        return (seed,)

```
