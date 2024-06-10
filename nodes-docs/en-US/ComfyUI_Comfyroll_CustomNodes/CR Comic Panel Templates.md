---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 📱 CR Comic Panel Templates
## Documentation
- Class name: `CR Comic Panel Templates`
- Category: `🧩 Comfyroll Studio/👾 Graphics/📱 Template`
- Output node: `False`

This node is designed to generate comic panel layouts based on predefined templates. It dynamically creates and arranges panels within a page, allowing for customization of panel sizes, colors, and border styles to fit various comic storytelling needs.
## Input types
### Required
- **`page_width`**
    - Specifies the width of the page on which the comic panels will be drawn, influencing the layout's scale and the size of individual panels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`page_height`**
    - Determines the height of the page, affecting the overall layout and the vertical size of the comic panels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`template`**
    - Defines the template used for the comic panel layout, which can be a predefined template or a custom layout specified by the user.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`reading_direction`**
    - Indicates the direction in which the comic should be read, affecting the arrangement and flow of the panels.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`border_thickness`**
    - Defines the thickness of the borders around each panel, contributing to the visual style of the comic.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_thickness`**
    - Sets the thickness of the outline around the page and panels, impacting the comic's aesthetic appeal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - Specifies the color of the outline around the panels and page, adding to the visual design of the comic.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`panel_color`**
    - Determines the color of the panel backgrounds, influencing the mood and style of the comic.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Sets the background color of the page, framing the panels and contributing to the overall visual theme.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`images`**
    - A collection of images to be placed within the comic panels. This parameter is crucial for populating the panels with visual content, significantly enhancing the storytelling aspect of the comic.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[object]`
- **`custom_panel_layout`**
    - Allows for the specification of a custom layout for the comic panels, offering flexibility in design beyond predefined templates.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`outline_color_hex`**
    - Provides a hexadecimal color code for the outline color, offering precise color customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`panel_color_hex`**
    - Gives a hexadecimal color code for the panel color, allowing for exact color selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Specifies a hexadecimal color code for the background color, enabling detailed color customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image output containing the generated comic panel layout.
    - Python dtype: `object`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string output providing guidance or additional information related to the generated comic panel layout.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ComicPanelTemplates:

    @classmethod
    def INPUT_TYPES(s):
    
        directions = ["left to right", "right to left"]

        templates = ["custom",
                     "G22", "G33",
                     "H2", "H3",
                     "H12", "H13",
                     "H21", "H23",
                     "H31", "H32",
                     "V2", "V3",
                     "V12", "V13",
                     "V21", "V23",
                     "V31", "V32"]                           
        
        return {"required": {
                    "page_width": ("INT", {"default": 512, "min": 8, "max": 4096}),
                    "page_height": ("INT", {"default": 512, "min": 8, "max": 4096}),
                    "template": (templates,),
                    "reading_direction": (directions,),
                    "border_thickness": ("INT", {"default": 5, "min": 0, "max": 1024}),
                    "outline_thickness": ("INT", {"default": 2, "min": 0, "max": 1024}),
                    "outline_color": (COLORS,), 
                    "panel_color": (COLORS,),
                    "background_color": (COLORS,),
               },
                "optional": {
                    "images": ("IMAGE",),
                    "custom_panel_layout": ("STRING", {"multiline": False, "default": "H123"}),
                    "outline_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "panel_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
               }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "layout"
    CATEGORY = icons.get("Comfyroll/Graphics/Template")
    
    def layout(self, page_width, page_height, template, reading_direction,
               border_thickness, outline_thickness, 
               outline_color, panel_color, background_color,
               images=None, custom_panel_layout='G44',
               outline_color_hex='#000000', panel_color_hex='#000000', bg_color_hex='#000000'):

        panels = []
        k = 0
        len_images = 0
        
        # Convert tensor images to PIL
        if images is not None:
            images = [tensor2pil(image) for image in images]
            len_images = len(images)
        
        # Get RGB values for the text and background colors    
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping)
        panel_color = get_color_values(panel_color, panel_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)                    

        # Create page and apply bg color
        size = (page_width - (2 * border_thickness), page_height - (2 * border_thickness))
        page = Image.new('RGB', size, bg_color)
        draw = ImageDraw.Draw(page)
 
        if template == "custom":
            template = custom_panel_layout
        
        # Calculate panel positions and add to bg image
        first_char = template[0]
        if first_char == "G":
            rows = int(template[1])
            columns = int(template[2])
            panel_width = (page.width - (2 * columns * (border_thickness + outline_thickness))) // columns
            panel_height = (page.height  - (2 * rows * (border_thickness + outline_thickness))) // rows
            # Row loop
            for i in range(rows):
                # Column Loop
                for j in range(columns):
                    # Draw the panel
                    create_and_paste_panel(page, border_thickness, outline_thickness,
                                           panel_width, panel_height, page.width,
                                           panel_color, bg_color, outline_color,
                                           images, i, j, k, len_images, reading_direction)
                    k += 1

        elif first_char == "H":
            rows = len(template) - 1
            panel_height = (page.height  - (2 * rows * (border_thickness + outline_thickness))) // rows
            for i in range(rows):
                columns = int(template[i+1])
                panel_width = (page.width - (2 * columns * (border_thickness + outline_thickness))) // columns
                for j in range(columns):
                    # Draw the panel
                    create_and_paste_panel(page, border_thickness, outline_thickness,
                                           panel_width, panel_height, page.width,
                                           panel_color, bg_color, outline_color,
                                           images, i, j, k, len_images, reading_direction)
                    k += 1
                    
        elif first_char == "V":
            columns = len(template) - 1
            panel_width = (page.width - (2 * columns * (border_thickness + outline_thickness))) // columns
            for j in range(columns):
                rows = int(template[j+1])
                panel_height = (page.height  - (2 * rows * (border_thickness + outline_thickness))) // rows
                for i in range(rows):
                    # Draw the panel
                    create_and_paste_panel(page, border_thickness, outline_thickness,
                                           panel_width, panel_height, page.width,
                                           panel_color, bg_color, outline_color,
                                           images, i, j, k, len_images, reading_direction)
                    k += 1 
        
        # Add a border to the page
        if border_thickness > 0:
            page = ImageOps.expand(page, border_thickness, bg_color)
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-comic-panel-templates"

        return (pil2tensor(page), show_help, )   

```
