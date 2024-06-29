---
tags:
- Image
- VisualEffects
---

# 🟡 CR Draw Shape
## Documentation
- Class name: `CR Draw Shape`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🟣 Shape`
- Output node: `False`

The CR Draw Shape node is designed for drawing various geometric shapes on an image canvas. It supports a wide range of shapes including circles, ovals, diamonds, squares, triangles, hexagons, octagons, quarter circles, half circles, starbursts, stars, and crosses. This node allows for the customization of shape properties such as size, aspect ratio, and color, enabling the creation of complex graphics patterns.
## Input types
### Required
- **`width`**
    - Specifies the width of the image canvas. It determines the horizontal dimension of the canvas where the shapes will be drawn, affecting the overall layout and size of the geometric patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image canvas. It determines the vertical dimension of the canvas where the shapes will be drawn, affecting the overall layout and size of the geometric patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shape`**
    - Defines the type of geometric shape to be drawn on the canvas. The choice of shape affects the visual outcome and the complexity of the pattern created.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`shape_color`**
    - Determines the color of the shape to be drawn. The color choice influences the visual appeal and contrast of the shape against the canvas background.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`back_color`**
    - Specifies the background color of the image canvas. It sets the overall tone and mood of the image, providing a backdrop for the geometric shapes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_offset`**
    - Adjusts the horizontal position of the shape on the canvas. It allows for precise placement of the shape, enabling the creation of dynamic and varied patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_offset`**
    - Adjusts the vertical position of the shape on the canvas. It allows for precise placement of the shape, enabling the creation of dynamic and varied patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom`**
    - Controls the scale of the shape relative to its original size. Zooming in or out can dramatically alter the visual impact of the shape on the canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation`**
    - Specifies the rotation angle of the shape in degrees. Rotating the shape can add dynamism and complexity to the pattern.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`shape_color_hex`**
    - Specifies the hexadecimal color code for the shape color, offering an alternative to the predefined color options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Specifies the hexadecimal color code for the background color, offering an alternative to the predefined color options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output image with the drawn shapes. It showcases the visual result of applying geometric patterns to the canvas, highlighting the node's capability to create complex graphics.
    - Python dtype: `Image.Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides textual help or guidance related to the node's functionality or output. It can offer insights into the drawing process or tips for optimizing the use of the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DrawShape:

    @classmethod
    def INPUT_TYPES(cls):
                
        shapes = ["circle","oval","square","diamond","triangle","hexagon","octagon",
                  "quarter circle","half circle","quarter circle",
                  "starburst","star","cross",
                  "diagonal regions"]
        
        return {"required": {
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),        
                    "shape": (shapes,),
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
                      shape, shape_color, back_color,
                      x_offset=0, y_offset=0, zoom=1.0,
                      shape_color_hex='#000000', bg_color_hex='#000000'):

        bg_color = get_color_values(back_color, bg_color_hex, color_mapping) 
        shape_color = get_color_values(shape_color, shape_color_hex, color_mapping) 
          
        back_img = Image.new("RGB", (width, height), color=bg_color)
        shape_img = Image.new("RGB", (width, height), color=shape_color)
        shape_mask = Image.new('L', (width, height))
        draw = ImageDraw.Draw(shape_mask)   

        center_x = width // 2 + x_offset
        center_y = height // 2 + y_offset         
        size = min(width - x_offset, height - y_offset) * zoom
        aspect_ratio = width / height
        color = 'white'

        shape_functions = {
            'circle': draw_circle,
            'oval': draw_oval,
            'diamond': draw_diamond,
            'square': draw_square,
            'triangle': draw_triangle,
            'hexagon': draw_hexagon,
            'octagon': draw_octagon,
            'quarter circle': draw_quarter_circle,
            'half circle': draw_half_circle,
            'starburst': draw_starburst,
            'star': draw_star, 
            'cross': draw_cross,
        }

        if shape in shape_functions:
            shape_function = shape_functions.get(shape)
            shape_function(draw, center_x, center_y, size, aspect_ratio, color)

        if shape == "diagonal regions":
            draw.polygon([(width, 0), (width, height), (0, height)], fill=color)

        shape_mask = shape_mask.rotate(rotation, center=(center_x, center_y))
        
        result_image = Image.composite(shape_img, back_img, shape_mask) 

        image_out = pil2tensor(result_image)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-draw-shape"

        return (image_out, show_help, )  

```
