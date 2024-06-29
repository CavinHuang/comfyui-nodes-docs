---
tags:
- RandomGeneration
- Randomization
---

# 🎲 CR Random Hex Color
## Documentation
- Class name: `CR Random Hex Color`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🎲 Random`
- Output node: `False`

This node generates a set of random hexadecimal color values based on a given seed. It aims to provide a simple way to generate consistent color schemes for design and visualization purposes.
## Input types
### Required
- **`seed`**
    - The seed parameter initializes the random number generator, ensuring that the same set of colors is generated each time for a given seed value. This allows for reproducibility in color generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`hex_color1`**
    - Comfy dtype: `STRING`
    - A randomly generated hexadecimal color value.
    - Python dtype: `str`
- **`hex_color2`**
    - Comfy dtype: `STRING`
    - A randomly generated hexadecimal color value.
    - Python dtype: `str`
- **`hex_color3`**
    - Comfy dtype: `STRING`
    - A randomly generated hexadecimal color value.
    - Python dtype: `str`
- **`hex_color4`**
    - Comfy dtype: `STRING`
    - A randomly generated hexadecimal color value.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Random Shape Pattern](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Random Shape Pattern.md)
    - [CR Color Tint](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Color Tint.md)
    - [CR Binary Pattern](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Binary Pattern.md)
    - [CR Color Gradient](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Color Gradient.md)



## Source code
```python
class CR_RandomHexColor:
    
    @classmethod
    def INPUT_TYPES(cls):
        
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),}}

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", )
    RETURN_NAMES = ("hex_color1", "hex_color2", "hex_color3", "hex_color4", "show_help", )
    FUNCTION = "get_colors"
    CATEGORY = icons.get("Comfyroll/Utils/Random")

    def get_colors(self, seed):
    
        # Set the seed
        random.seed(seed)
    
        hex_color1 = random_hex_color()
        hex_color2 = random_hex_color()
        hex_color3 = random_hex_color()
        hex_color4 = random_hex_color()
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-hex-color"
             
        return (hex_color1, hex_color2, hex_color3, hex_color4, show_help, )

```
