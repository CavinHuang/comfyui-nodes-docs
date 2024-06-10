---
tags:
- RandomGeneration
- Seed
---

# Seed Selector
## Documentation
- Class name: `SeedSelector`
- Category: `Art Venture/Utils`
- Output node: `False`

The SeedSelector node is designed to select a seed value for procedural generation tasks, allowing users to switch between random and fixed seed modes. This flexibility enables both reproducibility of results with a fixed seed and the generation of varied outcomes with random seeds.
## Input types
### Required
- **`mode`**
    - Determines whether the seed selection is random or fixed, impacting the reproducibility and variability of the generated outcomes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - The seed value used when mode is set to random, influencing the procedural generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fixed_seed`**
    - The seed value used when mode is set to fixed, ensuring reproducibility of the generated outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `INT`
    - The selected seed value, either fixed or randomly determined based on the mode, used for procedural generation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute



## Source code
```python
class UtilSeedSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mode": ("BOOLEAN", {"default": True, "label_on": "random", "label_off": "fixed"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "fixed_seed": (
                    "INT",
                    {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF},
                ),
            }
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_seed"

    def get_seed(self, mode, seed, fixed_seed):
        return (fixed_seed if not mode else seed,)

```
