---
tags:
- Image
- VisualEffects
---

# 🟫 CR Halftone Grid
## Documentation
- Class name: `CR Halftone Grid`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Halftone Grid node is designed to generate a graphical representation of a halftone grid, a technique often used in printing to simulate continuous tone imagery through the use of dots. This node allows for customization of the grid's appearance, including dot style, frequency, and background color, enabling users to create visually appealing patterns and textures for various applications.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated halftone grid image. It directly influences the size of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the generated halftone grid image, affecting the overall dimensions of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`dot_style`**
    - Defines the style of the dots in the halftone grid, allowing for creative control over the appearance of the pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`reverse_dot_style`**
    - When set to 'Yes', this reverses the dot style, adding an additional layer of customization to the halftone effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`dot_frequency`**
    - Controls the frequency of dots in the halftone grid, impacting the density of the pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_color`**
    - Sets the background color of the halftone grid. It supports predefined colors or a custom color if specified.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_pos`**
    - The x-coordinate position for the center of the dot pattern, influencing the distribution of dots.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_pos`**
    - The y-coordinate position for the center of the dot pattern, affecting the placement of dots in the grid.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`bg_color_hex`**
    - Specifies the hex code for a custom background color, offering precise control over the grid's background color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output image of the halftone grid.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the CR Halftone Grid node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_HalftoneGrid:
    @classmethod
    def INPUT_TYPES(s):
               
        return {"required": {
                "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                "dot_style": (STYLES,),
                "reverse_dot_style": (["No", "Yes"],),
                "dot_frequency": ("INT", {"default": 50, "min": 1, "max":200, "step": 1}),
                "background_color": (COLORS,),
                "x_pos": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": .01}),
                "y_pos": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": .01}),                     
                },
                "optional": {
                "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"})
                }
        }        

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "halftone"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")


    def halftone(self, width, height, dot_style, reverse_dot_style, dot_frequency, background_color, x_pos, y_pos, bg_color_hex='#000000'):
    
        if background_color == "custom":
            bgc = bg_color_hex
        else:
            bgc = background_color
            
        reverse = ""
        
        if reverse_dot_style == "Yes":
            reverse = "_r"
        
        fig, ax = plt.subplots(figsize=(width/100,height/100))
           
        dotsx = np.linspace(0, 1, dot_frequency)
        dotsy = np.linspace(0, 1, dot_frequency)
    
        X, Y = np.meshgrid(dotsx, dotsy)
    
        dist = np.sqrt((X - x_pos)**2 + (Y - y_pos)**2)
    
        fig.patch.set_facecolor(bgc)
        ax.scatter(X, Y, c=dist, cmap=dot_style+reverse)
        
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
            
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-halftone-grid"
        
        return(image_out, show_help, )

```
