---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟥 CR Binary Pattern
## Documentation
- Class name: `CR Binary Pattern`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

This node is designed to generate complex binary patterns, offering a creative tool for generating intricate designs and textures based on binary logic. It abstracts the complexity of creating binary patterns, making it accessible for users to incorporate these patterns into their graphics projects.
## Input types
### Required
- **`binary_pattern`**
    - Specifies the binary pattern as a multiline string, where each line represents a row in the pattern. This pattern determines the visual structure of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - Sets the width of the output image. It defines the horizontal dimension of the canvas on which the binary pattern will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the output image. It defines the vertical dimension of the canvas on which the binary pattern will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_color`**
    - Determines the background color of the output image. It sets the color that will appear in the background of the binary pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_0`**
    - Specifies the color for the '0' bits in the binary pattern. This color will fill the squares corresponding to '0' bits.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_1`**
    - Specifies the color for the '1' bits in the binary pattern. This color will fill the squares corresponding to '1' bits.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`outline_thickness`**
    - Defines the thickness of the outline around each square in the pattern. A thickness of 0 means no outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - Sets the color of the outline around each square in the pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`jitter_distance`**
    - Specifies the maximum distance that squares in the pattern can be randomly displaced to create a jitter effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bias`**
    - Adjusts the probability of a square being colored with 'color_1' over 'color_0', allowing for more control over the pattern's appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`bg_color_hex`**
    - An optional hexadecimal value specifying the background color, providing an alternative to the 'background_color' input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color0_hex`**
    - An optional hexadecimal value specifying the color for '0' bits, providing an alternative to the 'color_0' input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color1_hex`**
    - An optional hexadecimal value specifying the color for '1' bits, providing an alternative to the 'color_1' input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`outline_color_hex`**
    - An optional hexadecimal value specifying the outline color, providing an alternative to the 'outline_color' input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated image based on the specified binary pattern and color settings.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the binary pattern node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Color Tint](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Color Tint.md)



## Source code
```python
class CR_BinaryPattern:
    
    @classmethod
    def INPUT_TYPES(cls):
                 
        return {"required": {
                    "binary_pattern": ("STRING", {"multiline": True, "default": "10101"}),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "background_color": (COLORS,), 
                    "color_0": (COLORS,),
                    "color_1": (COLORS,),
                    "outline_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}), 
                    "outline_color": (COLORS,),
                    "jitter_distance": ("INT", {"default": 0, "min": 0, "max": 1024}),
                    "bias": ("FLOAT", {"default": 0.50, "min": 0.00, "max": 1.00, "step": 0.05}),
                },
                "optional": {
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "color0_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "color1_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "outline_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }     
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw_pattern"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw_pattern(self, binary_pattern, width, height,
                     background_color, outline_color,
                     color_0="white", color_1="black", outline_thickness=0,
                     color0_hex='#000000', color1_hex='#000000',
                     bg_color_hex='#000000', outline_color_hex='#000000',
                     jitter_distance = 0, bias=0.5):
                     
        # Get RGB values
        color0 = get_color_values(color_0, color0_hex, color_mapping)         
        color1 = get_color_values(color_1, color1_hex, color_mapping) 
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping) 
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping) 
        
        # Convert multiline binary pattern to a 2D list
        rows = binary_pattern.strip().split('\n')
        grid = [[int(bit) for bit in row.strip()] for row in rows]

        # Calculate the size of each square
        square_width = width / len(rows[0])
        square_height = height / len(rows)

        # Create a new image
        image = Image.new("RGB", (width, height), color=bg_color)
        draw = ImageDraw.Draw(image)
        
        x_jitter = 0
        y_jitter = 0
        
        # Draw grid based on the binary pattern
        for row_index, row in enumerate(grid):
            for col_index, bit in enumerate(row):
                if jitter_distance != 0:
                    x_jitter = random.uniform(0, jitter_distance)
                    y_jitter = random.uniform(0, jitter_distance)
                x1 = col_index * square_width + x_jitter
                y1 = row_index * square_height + y_jitter 
                x2 = x1 + square_width + x_jitter
                y2 = y1 + square_height + y_jitter 

                # Draw black square if bit is 1, else draw white square
                #color = color1 if bit == 1 else color0
                
                # Adjust color based on bias
                if random.uniform(0, 1) < abs(bias):
                    color = color1
                else:
                    color = color0

                draw.rectangle([x1, y1, x2, y2], fill=color, outline=outline_color, width=outline_thickness)

        image_out = pil2tensor(image)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-binary-pattern"
 
        # Convert the PIL image back to a torch tensor
        return (image_out, show_help, )

```
