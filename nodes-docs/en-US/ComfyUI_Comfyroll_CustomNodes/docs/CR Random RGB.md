---
tags:
- RandomGeneration
- Randomization
---

# 🎲 CR Random RGB
## Documentation
- Class name: `CR Random RGB`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🎲 Random`
- Output node: `False`

This node generates a set of four random RGB color values and provides a link to further help or documentation. It's designed to introduce variability and customization in visual elements by leveraging randomness.
## Input types
### Required
- **`seed`**
    - The seed parameter initializes the random number generator, ensuring reproducibility of the random RGB colors generated. It plays a crucial role in enabling consistent results across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`rgb_1`**
    - Comfy dtype: `STRING`
    - A randomly generated RGB color value.
    - Python dtype: `str`
- **`rgb_2`**
    - Comfy dtype: `STRING`
    - A randomly generated RGB color value.
    - Python dtype: `str`
- **`rgb_3`**
    - Comfy dtype: `STRING`
    - A randomly generated RGB color value.
    - Python dtype: `str`
- **`rgb_4`**
    - Comfy dtype: `STRING`
    - A randomly generated RGB color value.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL link to the node's documentation or help page.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomRGB:
    
    @classmethod
    def INPUT_TYPES(cls):
        
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),}}

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", )
    RETURN_NAMES = ("rgb_1", "rgb_2", "rgb_3", "rgb_4", "show_help", )
    FUNCTION = "get_colors"
    CATEGORY = icons.get("Comfyroll/Utils/Random")

    def get_colors(self, seed):
    
        # Set the seed
        random.seed(seed)
    
        rgb_1 = random_rgb()
        rgb_2 = random_rgb()
        rgb_3 = random_rgb()
        rgb_4 = random_rgb()
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-rgb"
             
        return (rgb_1, rgb_2, rgb_3, rgb_4, show_help, )

```
