---
tags:
- RandomGeneration
- Seed
---

# CR Seed to Int (Legacy)
## Documentation
- Class name: `CR Seed to Int`
- Category: `🧩 Comfyroll Studio/✨ Essential/💀 Legacy`
- Output node: `False`

The CR Seed to Int node is designed to convert a seed value into an integer, providing a straightforward mechanism for seed manipulation and conversion within custom node workflows. It also offers a link to further documentation, aiding users in understanding its application.
## Input types
### Required
- **`seed`**
    - The seed parameter is crucial for the conversion process, serving as the input that is directly transformed into an integer. Its value dictates the outcome of the conversion.
    - Comfy dtype: `SEED`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - Represents the integer value obtained from the conversion of the seed input.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to detailed documentation about the CR Seed to Int node, assisting users in understanding its usage and functionalities.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SeedToInt:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("SEED", ),
            }
        }

    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    FUNCTION = "seed_to_int"
    CATEGORY = icons.get("Comfyroll/Essential/Legacy")

    def seed_to_int(self, seed):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-seed-to-int"
        return (seed.get('seed'), show_help, )

```
