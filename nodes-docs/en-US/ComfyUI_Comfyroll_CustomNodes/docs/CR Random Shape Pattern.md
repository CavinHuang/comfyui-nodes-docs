---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🔵 CR Random Shape Pattern
## Documentation
- Class name: `CR Random Shape Pattern`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🟣 Shape`
- Output node: `False`

This node generates a pattern of random shapes, allowing for the creation of visually diverse and customizable graphical patterns. It leverages randomness in shape selection, size, aspect ratio, and color to produce unique designs.
## Input types
### Required
- **`width`**
    - Defines the width of the canvas on which the shapes are drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the canvas on which the shapes are drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_rows`**
    - Specifies the number of rows in the pattern, affecting the vertical distribution of shapes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_cols`**
    - Specifies the number of columns in the pattern, affecting the horizontal distribution of shapes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color1`**
    - The primary color used in the pattern, providing a base for visual variety.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color2`**
    - The secondary color used in the pattern, adding to the visual diversity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`color1_hex`**
    - Hexadecimal representation of the primary color, offering an alternative color specification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color2_hex`**
    - Hexadecimal representation of the secondary color, offering an alternative color specification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated image containing the random shape pattern.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomShapePattern:

    @classmethod
    def INPUT_TYPES(cls):
                
        shapes = ["circle","oval","square","diamond","triangle",
                  "hexagon","octagon","half circle","quarter circle",
                  "starburst","star", "cross"]
        
        return {"required": {
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),  
                    "num_rows": ("INT", {"default": 5, "min": 1, "max": 128}),
                    "num_cols": ("INT", {"default": 5, "min": 1, "max": 128}),                    
                    "color1": (COLORS,), 
                    "color2": (COLORS,),
               },
                "optional": {
                    "color1_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "color2_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "plot_random_shapes"
    CATEGORY = icons.get("Comfyroll/Graphics/Shape")

    def plot_random_shapes(self, num_rows, num_cols, width, height, color1, color2,
                           color1_hex="#000000", color2_hex="#000000"):
                           
        color1 = get_color_values(color1, color1_hex, color_mapping) 
        color2 = get_color_values(color2, color2_hex, color_mapping) 
                           
        image = Image.new("RGB", (width, height), color="white")
        draw = ImageDraw.Draw(image)

        shape_functions = [
            draw_circle,
            draw_oval,
            draw_diamond,
            draw_square,
            draw_triangle,
            draw_hexagon,
            draw_octagon,
            draw_half_circle,
            draw_quarter_circle,
            draw_starburst,
            draw_star,
            draw_cross,
        ]

        for row in range(num_rows):
            for col in range(num_cols):
                shape_function = random.choice(shape_functions)
                color = random.choice([color1, color2])
                size = random.uniform(20, min(width, height) / 2)
                aspect_ratio = random.uniform(0.5, 2.0)  # For shapes that use aspect ratio

                center_x = col * (width / num_cols) + (width / num_cols) / 2
                center_y = row * (height / num_rows) + (height / num_rows) / 2
                
                shape_function(draw, center_x, center_y, size, aspect_ratio, color)

        image_out = pil2tensor(image)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-random-shape-pattern"

        return (image_out, show_help, )  

```
