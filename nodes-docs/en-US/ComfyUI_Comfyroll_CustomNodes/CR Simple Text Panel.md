---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Simple Text Panel
## Documentation
- Class name: `CR Simple Text Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

This node is designed to create simple text panels within a graphical interface, allowing for the display of text in a visually appealing and customizable manner.
## Input types
### Required
- **`panel_width`**
    - Specifies the width of the text panel. It determines how wide the panel will be, affecting the layout and appearance of the displayed text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`panel_height`**
    - Defines the height of the text panel. It influences the vertical space available for text display, impacting the overall layout and design.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The text content to be displayed on the panel. This input allows for customization of the text message, playing a crucial role in the panel's purpose and appearance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - Selects the font used for the text. The choice of font can significantly affect the panel's aesthetic and readability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_color`**
    - Determines the color of the text, offering customization options for visual appeal and contrast against the panel background.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Sets the size of the text font. This parameter affects the text's visibility and how it fits within the panel's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_outline_thickness`**
    - Specifies the thickness of the text's outline, enhancing readability and visual distinction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_outline_color`**
    - Defines the color of the text's outline, which can enhance text visibility and aesthetic appeal.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Sets the panel's background color, affecting the overall look and feel of the text panel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`align`**
    - Controls the alignment of the text within the panel, affecting the layout and presentation of the content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`justify`**
    - Determines the justification of the text, impacting how the text is spaced and aligned horizontally.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`font_color_hex`**
    - Specifies the hexadecimal color code for the text color, offering an alternative way to define text color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - Specifies the hexadecimal color code for the background color, providing an alternative way to define the panel's background color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image of the text panel, ready for display or further processing.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for using the text panel node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleTextPanel:

    @classmethod
    def INPUT_TYPES(s):
    
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]

        return {"required": {
                "panel_width": ("INT", {"default": 512, "min": 8, "max": 4096}),
                "panel_height": ("INT", {"default": 512, "min": 8, "max": 4096}),
                "text": ("STRING", {"multiline": True, "default": "text"}),
                "font_name": (file_list,),
                "font_color": (COLORS,),
                "font_size": ("INT", {"default": 100, "min": 0, "max": 1024}),
                "font_outline_thickness": ("INT", {"default": 0, "min": 0, "max": 50}),
                "font_outline_color": (COLORS,),                
                "background_color": (COLORS,),                
                "align": (ALIGN_OPTIONS, ),
                "justify": (JUSTIFY_OPTIONS, ),
               },
                "optional": {
                "font_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
               }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "layout"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def layout(self, panel_width, panel_height,
               text, align, justify,
               font_name, font_color, font_size,
               font_outline_thickness, font_outline_color,
               background_color, 
               font_color_hex='#000000', font_outline_color_hex='#000000', bg_color_hex='#000000'):

        # Get RGB values for the text and background colors    
        font_color = get_color_values(font_color, font_color_hex, color_mapping)
        outline_color = get_color_values(font_outline_color, font_outline_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        
        # Set defaults
        margins = 50
        line_spacing = 0
        position_x = 0
        position_y = 0
        rotation_angle = 0
        rotation_options = "image center"
        
        ### Create text panels
        
        panel = text_panel(panel_width, panel_height, text,
                           font_name, font_size, font_color, 
                           font_outline_thickness, outline_color,
                           bg_color,
                           margins, line_spacing,
                           position_x, position_y,
                           align, justify,
                           rotation_angle, rotation_options)
                                                       
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-simple-text-panel"

        return (pil2tensor(panel), show_help, )  

```
