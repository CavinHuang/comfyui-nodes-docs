---
tags:
- RandomGeneration
- Randomization
---

# 🎲 CR Random Multiline Colors
## Documentation
- Class name: `CR Random Multiline Colors`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🎲 Random`
- Output node: `False`

This node generates a multiline string of colors based on the specified type (hex color, RGB, or matplotlib xkcd color names), number of rows, and seed. It's designed to provide a simple way to create a diverse set of color values for various applications, ensuring repeatability with the use of a seed.
## Input types
### Required
- **`seed`**
    - A seed value to ensure the repeatability of the color values generated. Using the same seed will produce the same set of color values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`value_type`**
    - Specifies the format of the color values to be generated: hex color, RGB, or matplotlib xkcd color names. This choice determines the structure of the output color values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rows`**
    - Determines the number of color values to be generated, corresponding to the number of lines in the output string.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`multiline_text`**
    - Comfy dtype: `STRING`
    - A string containing multiple lines, each representing a color value in the specified format.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and information about the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomMultilineColors:
    
    @classmethod
    def INPUT_TYPES(cls):
    
        types = ["rgb", "hex color", "matplotlib xkcd"]
        
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "value_type": (types,),
                             "rows": ("INT", {"default": 5, "min": 1, "max": 2048}),
               }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("multiline_text", "show_help", )
    FUNCTION = "generate"
    CATEGORY = icons.get("Comfyroll/Utils/Random")

    def generate(self, value_type, rows, seed):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-multiline-colors"
        
        # Set the seed
        random.seed(seed)
        
        # Get the list of XKCD color names
        xkcd_colors = mcolors.XKCD_COLORS
        
        if value_type == "hex color":
            choice_str = '0123456789ABCDEF'

        if value_type == "hex color":
            multiline_text = '\n'.join(['#' + ''.join(random.choice(choice_str) for _ in range(6)) for _ in range(rows)]) 
        elif value_type == "rgb":
            multiline_text = '\n'.join([f'{random.randint(0, 255)},{random.randint(0, 255)},{random.randint(0, 255)}' for _ in range(rows)])
        elif value_type == "matplotlib xkcd":
            multiline_text = '\n'.join([random.choice(list(xkcd_colors.keys())).replace('xkcd:', '') for _ in range(rows)])   
        else:
            pass
                   
        return (multiline_text, show_help, )

```
