---
tags:
- Image
- VisualEffects
---

# 🟢 CR Draw Pie
## Documentation
- Class name: `CR Draw Pie`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🟣 Shape`
- Output node: `False`

The CR_DrawPie node is designed for creating pie-shaped graphics with customizable start and stop angles, colors, and positioning. It allows users to generate pie or partial pie shapes with specific dimensions, colors, and orientations, facilitating the creation of unique graphical representations.
## Input types
### Required
- **`width`**
    - Specifies the width of the canvas on which the pie shape will be drawn. It determines the horizontal dimension of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the canvas on which the pie shape will be drawn. It determines the vertical dimension of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`pie_start`**
    - Defines the starting angle of the pie shape. This angle sets the beginning point of the pie or partial pie segment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pie_stop`**
    - Defines the stopping angle of the pie shape. This angle sets the end point of the pie or partial pie segment, completing its arc.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`shape_color`**
    - Determines the color of the pie shape. This color fills the interior of the pie or partial pie segment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`back_color`**
    - Sets the background color of the canvas. It affects the overall appearance of the output image by providing a backdrop for the pie shape.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_offset`**
    - Adjusts the horizontal position of the pie shape on the canvas. It allows for precise placement of the pie segment within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_offset`**
    - Adjusts the vertical position of the pie shape on the canvas. It allows for precise placement of the pie segment within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom`**
    - Controls the zoom level of the pie shape. This parameter can enlarge or reduce the size of the pie segment, affecting its visual impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation`**
    - Rotates the pie shape around its center. This parameter can orient the pie segment at various angles, offering additional customization.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`shape_color_hex`**
    - Specifies the hex code for the pie shape's color, offering an alternative to the predefined color options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Specifies the hex code for the background color, offering an alternative to the predefined color options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Generates an image file containing the pie or partial pie shape as specified by the input parameters.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a string output that can offer guidance or additional information about the generated pie shape.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DrawPie:

    @classmethod
    def INPUT_TYPES(cls):
                       
        return {"required": {
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),        
                    "pie_start": ("FLOAT", {"default": 30.0, "min": 0.0, "max": 9999.0, "step": 0.1}),
                    "pie_stop": ("FLOAT", {"default": 330.0, "min": 0.0, "max": 9999.0, "step": 0.1}),
                    "shape_color": (COLORS,), 
                    "back_color": (COLORS,),                  
                    "x_offset": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                    "y_offset": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                    "zoom": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.05}),
                    "rotation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 3600.0, "step": 0.1}),
               },
                "optional": {
                    "shape_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "make_shape"
    CATEGORY = icons.get("Comfyroll/Graphics/Shape")
    
    def make_shape(self, width, height, rotation,
                      pie_start, pie_stop, shape_color, back_color,
                      x_offset=0, y_offset=0, zoom=1.0,
                      shape_color_hex='#000000', bg_color_hex='#000000'):

        bg_color = get_color_values(back_color, bg_color_hex, color_mapping) 
        shape_color = get_color_values(shape_color, shape_color_hex, color_mapping) 
          
        back_img = Image.new("RGB", (width, height), color=bg_color)
        shape_img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))     
        draw = ImageDraw.Draw(shape_img, 'RGBA')        

        center_x = width // 2 + x_offset
        center_y = height // 2 + y_offset         
        size = min(width - x_offset, height - y_offset) * zoom
        aspect_ratio = width / height
        num_rays = 16
        color = 'white'

        draw.pieslice([(center_x - size / 2, center_y - size / 2),
                   (center_x + size / 2, center_y + size / 2)], start=pie_start, end=pie_stop, fill=color, outline=None)

        shape_img = shape_img.rotate(rotation, center=(center_x, center_y))      

        # Composite the images with anti-aliasing
        result_image = Image.alpha_composite(back_img.convert("RGBA"), shape_img)

        image_out = pil2tensor(result_image.convert("RGB"))

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-draw-pie"

        return (image_out, show_help, )  

```
