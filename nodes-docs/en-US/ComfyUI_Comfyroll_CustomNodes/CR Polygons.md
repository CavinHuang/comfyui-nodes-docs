---
tags:
- Image
- VisualEffects
---

# 🟩 CR Polygons
## Documentation
- Class name: `CR Polygons`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Polygons node is designed for creating and manipulating polygon shapes within a graphical environment, leveraging the capabilities of matplotlib for visualization. This node facilitates the generation, customization, and rendering of polygonal figures, supporting a wide range of graphical applications.
## Input types
### Required
- **`mode`**
    - Specifies the mode of polygon generation, affecting the shape and arrangement of polygons.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - Specifies the width of the canvas on which polygons will be drawn. This parameter influences the overall size of the graphical output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the canvas, affecting the vertical dimension of the generated polygonal graphics.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - Sets the number of rows in the grid layout for placing polygons. This affects the distribution and organization of polygons on the canvas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`columns`**
    - Defines the number of columns in the grid layout, impacting how polygons are arranged horizontally.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`face_color`**
    - Primary color used for filling polygons, contributing to the visual style of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Color used for the canvas background, setting the visual context for the polygons.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`line_color`**
    - Color used for the polygon outlines, enhancing the definition and contrast of shapes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`line_width`**
    - Specifies the thickness of the polygon outlines, affecting the visual prominence of the shapes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`face_color_hex`**
    - Hexadecimal representation of the primary color, offering an alternative method for specifying color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Hexadecimal code for the background color, providing precision in color selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`line_color_hex`**
    - Hexadecimal code for the outline color, allowing for exact color matching.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Generates an image file containing the rendered polygons, serving as the visual output of the node.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides textual help or guidance related to the node's functionality and usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Polygons:

    @classmethod
    def INPUT_TYPES(s):
        
        modes = ["hexagons", "triangles"]          
        
        return {"required": {
                    "mode": (modes,),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),         
                    "rows": ("INT", {"default": 5, "min": 1, "max": 512}),          
                    "columns": ("INT", {"default": 5, "min": 1, "max": 512}),
                    "face_color": (COLORS,),
                    "background_color": (COLORS,),
                    "line_color": (COLORS,),            
                    "line_width": ("INT", {"default": 2, "min": 0, "max": 512}),
                },
                "optional": {
                    "face_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "line_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                } 
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, mode, width, height, rows, columns,
             face_color, background_color, line_color, line_width,
             face_color_hex='#000000', bg_color_hex='#000000', line_color_hex='#000000'):

        # Get RGB values 
        if face_color == "custom":
            face_color = face_color_hex

        if line_color == "custom":
            line_color = line_color_hex

        if background_color == "custom":
            background_color = bg_color_hex
    
        fig, ax = plt.subplots(figsize=(width/100, height/100))
        fig.set_facecolor(background_color)
        plt.xlim(0, width/100)
        plt.ylim(0, height/100)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)         

        # Get polygon shape  
        if mode == "hexagons":
            vertices = 6
        elif mode == "triangles":
            vertices = 3      
        
        # Define the height and width of a hexagon
        cell_width = (width/100) / columns
    
        cell_height = (width/height) * np.sqrt(3) * (height/100) / (2 * columns)
        
        for row in range(rows + 2):
            for col in range(columns + 2):
                x = col * cell_width
                y = row * cell_height

                # Shift every other row
                if row % 2 == 1:
                    x += cell_width / 2
                    
                # Create a hexagon as a polygon patch
                hexagon = RegularPolygon((x, y), numVertices=vertices, radius=cell_width/1.732, edgecolor=line_color, linewidth=line_width, facecolor=face_color)
                ax.add_patch(hexagon)
                 
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))         

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-polygons"

        return (image_out, show_help, )

```
