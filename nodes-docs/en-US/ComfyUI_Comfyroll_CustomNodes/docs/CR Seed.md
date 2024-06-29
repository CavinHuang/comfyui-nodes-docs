---
tags:
- RandomGeneration
- Seed
---

# 🌱 CR Seed
## Documentation
- Class name: `CR Seed`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `True`

The CR Seed node is designed to provide a consistent starting point for random number generation processes by supplying a seed value. It also offers a link to further documentation on its usage.
## Input types
### Required
- **`seed`**
    - The seed parameter is crucial for initializing the random number generator to ensure reproducibility of results across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `INT`
    - Returns the same seed value that was input, allowing it to be used in subsequent operations.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation for further assistance and detailed information about the CR Seed node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - Reroute
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)
    - NEW_PhotoMaker_Generation



## Source code
```python
class CR_Seed:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("seed", "show_help", )
    FUNCTION = "seedint"
    OUTPUT_NODE = True
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    @staticmethod
    def seedint(seed):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-seed"
        return (seed, show_help,)

```
