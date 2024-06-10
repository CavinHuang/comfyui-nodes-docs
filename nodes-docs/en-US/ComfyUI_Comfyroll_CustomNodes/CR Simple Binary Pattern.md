---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟥 CR Simple Binary Pattern
## Documentation
- Class name: `CR Simple Binary Pattern`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

This node generates simple binary patterns, offering a straightforward approach to creating binary (two-color) designs. It abstracts the complexity of pattern generation, enabling users to easily produce visually appealing binary patterns for various applications.
## Input types
### Required
- **`binary_pattern`**
    - Specifies the binary pattern as a multiline string, where each line represents a row in the pattern. This pattern dictates the visual structure of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - Determines the width of the generated image. The width influences the scale of the binary pattern, affecting its display size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated image. Similar to width, height impacts the scale and display size of the binary pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated image based on the binary pattern input. This output is a visual representation of the binary design.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string URL providing additional help and documentation related to binary pattern generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_BinaryPatternSimple:
    
    @classmethod
    def INPUT_TYPES(cls):
                 
        return {"required": {
                    "binary_pattern": ("STRING", {"multiline": True, "default": "10101"}),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                }    
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw_pattern"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw_pattern(self, binary_pattern, width, height):
        # Convert multiline binary pattern to a 2D list
        rows = binary_pattern.strip().split('\n')
        grid = [[int(bit) for bit in row.strip()] for row in rows]

        # Calculate the size of each square
        square_width = width // len(rows[0])
        square_height = height // len(rows)

        # Create a new image
        image = Image.new("RGB", (width, height), color='black')
        draw = ImageDraw.Draw(image)

        # Draw grid based on the binary pattern
        for row_index, row in enumerate(grid):
            for col_index, bit in enumerate(row):
                x1 = col_index * square_width
                y1 = row_index * square_height
                x2 = x1 + square_width
                y2 = y1 + square_height

                # Draw black square if bit is 1, else draw white square
                color = 'black' if bit == 1 else 'white'
                draw.rectangle([x1, y1, x2, y2], fill=color, outline="black")

        image_out = pil2tensor(image)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-simple-binary-pattern"
 
        # Convert the PIL image back to a torch tensor
        return (image_out, show_help, )

```
