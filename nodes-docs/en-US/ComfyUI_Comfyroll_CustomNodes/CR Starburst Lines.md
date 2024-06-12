---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟧 CR Starburst Lines
## Documentation
- Class name: `CR Starburst Lines`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

This node is designed to generate a starburst pattern with lines radiating from a central point. It allows customization of various aspects such as the number of lines, their length, color, and rotation, enabling the creation of visually striking graphics.
## Input types
### Required
- **`width`**
    - Specifies the width of the canvas for the starburst pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the canvas for the starburst pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_lines`**
    - Specifies the number of lines in the starburst pattern. This determines how densely the lines are packed together, affecting the overall appearance of the starburst.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`line_length`**
    - Defines the length of each line in the starburst pattern. Longer lines will extend further from the center, creating a more pronounced effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`line_width`**
    - Sets the width of the lines in the starburst pattern. Thicker lines will make the starburst more visible and pronounced.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`line_color`**
    - Determines the color of the lines in the starburst pattern. This can be a predefined color or a custom hex value, allowing for extensive customization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Determines the background color of the canvas. This can be a predefined color or 'custom' to use a hex value specified in 'bg_color_hex'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`center_x`**
    - Specifies the x-coordinate of the center point from which the starburst lines radiate.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`center_y`**
    - Specifies the y-coordinate of the center point from which the starburst lines radiate.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`rotation`**
    - Specifies the rotation angle of the entire starburst pattern. This allows the pattern to be oriented in any direction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`line_color_hex`**
    - Specifies the custom hex color value for the lines if 'line_color' is set to 'custom'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Specifies the custom hex color value for the background if 'background_color' is set to 'custom'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated image featuring the starburst pattern.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to documentation or help page related to the starburst pattern generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_StarburstLines:

    @classmethod
    def INPUT_TYPES(s):
      
        return {"required": {
                "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                "height": ("INT", {"default": 512, "min": 64, "max": 4096}),              
                "num_lines": ("INT", {"default": 6, "min": 1, "max": 500}),      
                "line_length": ("FLOAT", {"default": 5, "min": 0, "max": 100, "step": 0.1}),      
                "line_width": ("INT", {"default": 5, "min": 1, "max": 512}),
                "line_color": (COLORS,),
                "background_color": (COLORS,),
                "center_x": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "center_y": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "rotation": ("FLOAT", {"default": 0, "min": 0, "max": 720}),            
                },
                "optional": {
                "line_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                } 
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")
    
    def draw(self, width, height, num_lines, line_length, line_width, line_color, background_color,
             center_x, center_y, rotation=0,
             line_color_hex='#000000', bg_color_hex='#000000'):

        if line_color == "custom":
            line_color = line_color_hex
        else:
            line_color = line_color   
             
        if background_color == "custom":
            bgc = bg_color_hex
        else:
            bgc = background_color       
        
        # Define the angle for the spokes in the starburst
        angle = 360 / num_lines

        # Set up the plot
        fig, ax = plt.subplots(figsize=(width/100,height/100))
        plt.xlim(-width/100, width/100)
        plt.ylim(-height/100, height/100)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)        

        # Coordinates of the central point
        center_x = center_x/100
        center_y = center_y/100

        # Draw the starburst lines
        for i in range(num_lines):
            # Calculate the endpoint of each line
            x_unrotated = center_x + line_length * np.cos(np.radians(i * angle))
            y_unrotated = center_y + line_length * np.sin(np.radians(i * angle))
        
            # Apply rotation transformation
            x = center_x + x_unrotated * np.cos(np.radians(rotation)) - y_unrotated * np.sin(np.radians(rotation))
            y = center_y + x_unrotated * np.sin(np.radians(rotation)) + y_unrotated * np.cos(np.radians(rotation))
        
            # Plot the line
            fig.patch.set_facecolor(bgc)
            ax.plot([center_x, x], [center_y, y], color=line_color, linewidth=line_width)
   
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))         

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-starburst-lines"

        return (image_out, show_help, ) 

```
