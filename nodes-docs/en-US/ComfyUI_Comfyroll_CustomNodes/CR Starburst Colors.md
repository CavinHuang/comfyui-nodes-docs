---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟧 CR Starburst Colors
## Documentation
- Class name: `CR Starburst Colors`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Starburst Colors node is designed to generate starburst patterns with alternating colors. It utilizes matplotlib to set up a plot and draw triangles in a starburst formation, allowing for customization of the number of triangles, bounding box size, and color scheme. This node is ideal for creating visually striking backgrounds or elements in graphics projects.
## Input types
### Required
- **`width`**
    - Sets the width of the plot area for the starburst pattern, influencing the overall size of the generated graphic.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the plot area, working alongside 'width' to define the dimensions of the starburst pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_triangles`**
    - Specifies the number of triangles to draw in the starburst pattern, allowing for control over the pattern's complexity and density.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color_1`**
    - Specifies the first color in the alternating color scheme of the starburst pattern. This can be a predefined color or a custom hex value if 'custom' is selected.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_2`**
    - Defines the second color in the alternating color scheme, complementing the first color. Like 'color_1', it supports predefined colors or custom hex values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`center_x`**
    - Sets the x-coordinate of the center point for the starburst pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`center_y`**
    - Sets the y-coordinate of the center point for the starburst pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation`**
    - Determines the rotation angle of the starburst pattern, allowing for dynamic visual effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_factor`**
    - Controls the size of the bounding box for the starburst pattern, affecting how tightly the triangles are packed together.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`color1_hex`**
    - Specifies the hex value for the first color, used when 'color_1' is set to 'custom'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color2_hex`**
    - Specifies the hex value for the second color, used when 'color_2' is set to 'custom'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Generates an image of the starburst pattern with the specified parameters.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to documentation or help related to the starburst pattern generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_StarburstColors:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {
                "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                "height": ("INT", {"default": 512, "min": 64, "max": 4096}),             
                "num_triangles": ("INT", {"default": 6, "min": 1, "max": 512}),                      
                "color_1": (COLORS,),
                "color_2": (COLORS,),
                "center_x": ("INT", {"default": 0, "min": 0, "max": 512}),
                "center_y": ("INT", {"default": 0, "min": 0, "max": 512}),
                "rotation": ("FLOAT", {"default": 0, "min": 0, "max": 720}),
                "bbox_factor": ("FLOAT", {"default": 2, "min": 0, "max": 2, "step": .01}),
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
        
    def draw(self, width, height, num_triangles, color_1, color_2,
             center_x, center_y, bbox_factor, rotation=0,
             color1_hex='#000000', color2_hex='#000000'): 

        # Get RGB values for the text color  
        if color_1 == "custom":
            color_1 = color1_hex
        else:
            color_1 = color_1

        if color_2 == "custom":
            color_2 = color2_hex
        else:
            color_2 = color_2

        # Set up the plot
        fig, ax = plt.subplots()
        
        x = width/100
        y = height/100

        fig, ax = plt.subplots(figsize=(x,y))  
        plt.xlim(-x/2, x/2)
        plt.ylim(-y/2, y/2)
        
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)
        
        # Set the size of the starburst bounding box in x and y dimensions
        box_width = bbox_factor * x
        box_height = bbox_factor * y
        
        # Initialize a color list for alternating colors
        colors = [color_1, color_2]
        
        tri = num_triangles
        
        # Draw the starburst triangles with alternating colors and square pattern
        for i in range(tri):
            # Calculate the endpoints of the triangle with varying length
            x1 = center_x/100
            y1 = center_y/100
            x2_unrotated = (box_width / 2) * np.cos(np.radians(i * 360 / tri))
            y2_unrotated = (box_height / 2) * np.sin(np.radians(i * 360 / tri))
            x3_unrotated = (box_width / 2) * np.cos(np.radians((i + 1) * 360 / tri))
            y3_unrotated = (box_height / 2) * np.sin(np.radians((i + 1) * 360 / tri))
            
            #apply rotation transform
            x2 = x2_unrotated * np.cos(np.radians(rotation)) - y2_unrotated * np.sin(np.radians(rotation))
            y2 = x2_unrotated * np.sin(np.radians(rotation)) + y2_unrotated * np.cos(np.radians(rotation))
            x3 = x3_unrotated * np.cos(np.radians(rotation)) - y3_unrotated * np.sin(np.radians(rotation))
            y3 = x3_unrotated * np.sin(np.radians(rotation)) + y3_unrotated * np.cos(np.radians(rotation))
            
            # Plot the triangle with alternating colors
            ax.fill([x1, x2, x3, x1], [y1, y2, y3, y1], color=colors[i % 2])

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))         

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-starburst-colors"

        return (image_out, show_help, )

```
