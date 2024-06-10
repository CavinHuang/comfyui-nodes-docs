---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟦 CR Checker Pattern
## Documentation
- Class name: `CR Checker Pattern`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

This node is designed to generate checkerboard patterns, allowing users to create visually appealing designs or backgrounds by specifying pattern parameters. It abstracts the complexity of generating such patterns programmatically, offering a simple interface for customization.
## Input types
### Required
- **`mode`**
    - Specifies the mode of the checkerboard pattern generation, affecting the overall appearance and style of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - Determines the width of the generated checkerboard pattern, directly influencing the size of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated checkerboard pattern, directly influencing the size of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color_1`**
    - Defines the first color used in the checkerboard pattern, contributing to the visual aesthetics of the design.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_2`**
    - Specifies the second color used in the checkerboard pattern, complementing the first color to create the checkerboard effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`grid_frequency`**
    - Controls the frequency of the grid within the checkerboard pattern, affecting the density of the checkers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`step`**
    - Adjusts the step size between each checker in the pattern, allowing for customization of the checker spacing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`color1_hex`**
    - Provides an alternative way to specify the first color using hexadecimal color codes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color2_hex`**
    - Provides an alternative way to specify the second color using hexadecimal color codes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated checkerboard pattern image, ready for use or further processing.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A link to additional documentation or help related to the checkerboard pattern generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CheckerPattern:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["regular", "stepped"]          
        
        return {"required": {
                    "mode": (modes,),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "color_1": (COLORS,),
                    "color_2": (COLORS,), 
                    "grid_frequency": ("INT", {"default": 8, "min": 1, "max": 200, "step": 1}),
                    "step": ("INT", {"default": 2, "min": 2, "max": 200, "step": 1}),
                },
                "optional": {
                    "color1_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "color2_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }        
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, mode, width, height, color_1, color_2,
             grid_frequency, step,
             color1_hex='#000000', color2_hex='#000000'):

        # Get RGB values 
        if color_1 == "custom":
            color1_rgb = hex_to_rgb(color1_hex)
        else:
            color1_rgb = color_mapping.get(color_1, (255, 255, 255))  # Default to white if the color is not found

        if color_2 == "custom":
            color2_rgb = hex_to_rgb(color2_hex)
        else:
            color2_rgb = color_mapping.get(color_2, (0, 0, 0))  # Default to black if the color is not found

        # Create a blank canvas
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        
        grid_size = width / grid_frequency

        for i in range(width):
            for j in range(height):
            
                if mode == "regular":
                    if (i // grid_size) % 2 == (j // grid_size) % 2:    
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
                elif mode == "stepped":
                    if (i // grid_size) % step != (j // grid_size) % step:    
                        canvas[j, i] = color1_rgb            
                    else:
                        canvas[j, i] = color2_rgb  

        fig, ax = plt.subplots(figsize=(width/100, height/100))

        ax.imshow(canvas)

        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))         

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-checker-pattern"

        return (image_out, show_help, )

```
