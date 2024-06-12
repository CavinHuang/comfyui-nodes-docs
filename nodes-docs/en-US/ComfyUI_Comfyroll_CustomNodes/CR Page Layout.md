---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Page Layout
## Documentation
- Class name: `CR Page Layout`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR Page Layout node is designed for arranging visual elements within a specified page layout. It enables the creation of structured and aesthetically pleasing page designs by allowing users to define the layout parameters, including dimensions, template, and color scheme, as well as to place images and panels according to custom or predefined layouts.
## Input types
### Required
- **`layout_options`**
    - Specifies the layout options for the page, such as including headers, footers, or neither, allowing for further customization of the page structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`image_panel`**
    - The primary image or panel to be used as the base for the layout, serving as the central visual element around which other components are arranged.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`header_height`**
    - Defines the height of the header area, allowing for customization of the space allocated for header content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`header_text`**
    - Specifies the text to be included in the header, enabling the addition of titles or other header information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`header_align`**
    - Determines the alignment of the header text, influencing the text's positioning within the header area.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`footer_height`**
    - Sets the height of the footer area, providing control over the space allocated for footer content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`footer_text`**
    - Specifies the text to be included in the footer, enabling the addition of descriptive or supplementary information at the bottom of the page.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`footer_align`**
    - Determines the alignment of the footer text, affecting its positioning within the footer area.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_name`**
    - Selects the font to be used for text elements within the layout, allowing for stylistic consistency or variation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`font_color`**
    - Defines the color of the text, enabling customization to match the overall design theme or to highlight specific text elements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`header_font_size`**
    - Specifies the font size for the header text, allowing for visual emphasis or subtlety depending on the design needs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`footer_font_size`**
    - Sets the font size for the footer text, enabling customization to ensure readability and design coherence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_thickness`**
    - Defines the thickness of the border surrounding the layout, offering an additional layer of design customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - Determines the color of the border surrounding the layout, providing a visual frame for the page content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Specifies the background color of the layout, setting the overall tone and atmosphere of the design.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`font_color_hex`**
    - Provides an alternative method to specify the text color using hexadecimal color codes, offering precise color customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`border_color_hex`**
    - Allows for the specification of border color using hexadecimal color codes, enabling precise color matching and customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Offers an alternative method to specify the background color using hexadecimal color codes, allowing for precise color customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image resulting from the applied layout, showcasing the arranged visual elements according to the specified parameters.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string output that provides help or guidance related to the use of the node, including parameter explanations or layout tips.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Image Border](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Border.md)



## Source code
```python
class CR_PageLayout:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]

        layout_options = ["header", "footer", "header and footer", "no header or footer"]               
        
        return {"required": {
                "layout_options": (layout_options,),
                "image_panel": ("IMAGE",),
                "header_height": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "header_text": ("STRING", {"multiline": True, "default": "text"}),
                "header_align": (JUSTIFY_OPTIONS, ),
                "footer_height": ("INT", {"default": 0, "min": 0, "max": 1024}), 
                "footer_text": ("STRING", {"multiline": True, "default": "text"}),
                "footer_align": (JUSTIFY_OPTIONS, ),
                "font_name": (file_list,),
                "font_color": (COLORS,),
                "header_font_size": ("INT", {"default": 150, "min": 0, "max": 1024}),
                "footer_font_size": ("INT", {"default": 50, "min": 0, "max": 1024}),
                "border_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "border_color": (COLORS,),                
                "background_color": (COLORS,),
               },
                "optional": {
                "font_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                "border_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
               }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "layout"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def layout(self, layout_options, image_panel,
               border_thickness, border_color, background_color,
               header_height, header_text, header_align,
               footer_height, footer_text, footer_align,
               font_name, font_color,
               header_font_size, footer_font_size,
               font_color_hex='#000000', border_color_hex='#000000', bg_color_hex='#000000'):

        # Get RGB values for the text and background colors    
        font_color = get_color_values(font_color, font_color_hex, color_mapping)
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
                    
        main_panel = tensor2pil(image_panel)
        
        # Get image width and height        
        image_width = main_panel.width
        image_height = main_panel.height 

        # Set defaults
        margins = 50
        line_spacing = 0
        position_x = 0
        position_y = 0
        align = "center"
        rotation_angle = 0
        rotation_options = "image center"
        font_outline_thickness = 0
        font_outline_color = "black"
        
        images = []
        
        ### Create text panels and add to images array       
        if layout_options == "header" or layout_options == "header and footer":
            header_panel = text_panel(image_width, header_height, header_text,
                                      font_name, header_font_size, font_color,
                                      font_outline_thickness, font_outline_color,
                                      bg_color,
                                      margins, line_spacing,
                                      position_x, position_y,
                                      align, header_align,
                                      rotation_angle, rotation_options)
            images.append(header_panel)
        
        images.append(main_panel)
               
        if layout_options == "footer" or layout_options == "header and footer":        
            footer_panel = text_panel(image_width, footer_height, footer_text,
                                      font_name, footer_font_size, font_color,
                                      font_outline_thickness, font_outline_color,
                                      bg_color,
                                      margins, line_spacing,
                                      position_x, position_y,
                                      align, footer_align,
                                      rotation_angle, rotation_options)
            images.append(footer_panel)                                                           
       
        combined_image = combine_images(images, 'vertical')

        # Add a border to the combined image
        if border_thickness > 0:
            combined_image = ImageOps.expand(combined_image, border_thickness, border_color)
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-page-layout"

        return (pil2tensor(combined_image), show_help, )    

```
