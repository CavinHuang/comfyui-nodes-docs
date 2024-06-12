---
tags:
- Image
- TextOnImage
---

# 🔤️ CR Draw Text
## Documentation
- Class name: `CR Draw Text`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

This node is designed for drawing text onto images or graphics, allowing for customization of font properties, alignment, and positioning. It provides a versatile tool for adding textual elements to visual content, enhancing the ability to convey messages or labels within a graphical context.
## Input types
### Required
- **`image_width`**
    - Specifies the width of the image onto which the text will be drawn. This parameter sets the canvas size for the textual content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_height`**
    - Specifies the height of the image, defining the vertical dimension of the canvas for the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The text to be drawn onto the image. It allows for customization of the content and message conveyed through the graphical output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - Allows for the selection of the font used to render the text, impacting the style and readability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Determines the size of the text, affecting visibility and emphasis within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_color`**
    - Specifies the color of the text, crucial for visibility against the background and overall visual appeal.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`background_color`**
    - Defines the background color of the image, setting the visual context for the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`align`**
    - Determines the alignment of the text within the image, affecting its positioning and overall layout.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`justify`**
    - Determines the justification of the text, affecting its alignment relative to the specified position.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`margins`**
    - Sets the margins around the text, aiding in its precise positioning within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`line_spacing`**
    - Controls the spacing between lines of text, affecting readability and text layout.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_x`**
    - Specifies the horizontal position of the text within the image, allowing for accurate placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_y`**
    - Specifies the vertical position of the text within the image, enabling precise alignment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation_angle`**
    - Determines the angle at which the text is rotated, enabling dynamic text orientation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation_options`**
    - Provides options for how the text rotation is applied, offering flexibility in text presentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`font_color_hex`**
    - An optional hexadecimal value for the text color, offering an alternative to predefined color selections.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`bg_color_hex`**
    - An optional hexadecimal value for the background color, providing additional customization options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The modified image after the text has been drawn onto it, showcasing the integration of textual and visual elements.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to additional documentation and help resources related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DrawText:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
                      
        return {"required": {
                    "image_width": ("INT", {"default": 512, "min": 64, "max": 2048}),
                    "image_height": ("INT", {"default": 512, "min": 64, "max": 2048}),  
                    "text": ("STRING", {"multiline": True, "default": "text"}),
                    "font_name": (file_list,),
                    "font_size": ("INT", {"default": 50, "min": 1, "max": 1024}),
                    "font_color": (COLORS,),
                    "background_color": (COLORS,),
                    "align": (ALIGN_OPTIONS,),
                    "justify": (JUSTIFY_OPTIONS,),
                    "margins": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                    "line_spacing": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                    "position_x": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                    "position_y": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                    "rotation_angle": ("FLOAT", {"default": 0.0, "min": -360.0, "max": 360.0, "step": 0.1}),
                    "rotation_options": (ROTATE_OPTIONS,),            
                },
                "optional": {
                    "font_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"})
                }          
    }

    RETURN_TYPES = ("IMAGE", "STRING",)
    RETURN_NAMES = ("IMAGE", "show_help",)
    FUNCTION = "draw_text"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")

    def draw_text(self, image_width, image_height, text,
                  font_name, font_size, font_color, 
                  background_color,
                  margins, line_spacing,
                  position_x, position_y,
                  align, justify,
                  rotation_angle, rotation_options,
                  font_color_hex='#000000', bg_color_hex='#000000'):

        # Get RGB values for the text and background colors
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping) 
        
        # Create PIL images for the text and background layers and text mask
        size = (image_width, image_height)
        text_image = Image.new('RGB', size, text_color)
        back_image = Image.new('RGB', size, bg_color)
        text_mask = Image.new('L', back_image.size)

        # Draw the text on the text mask
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size,
                                             margins, line_spacing,
                                             position_x, position_y,
                                             align, justify,
                                             rotation_angle, rotation_options)

        # Composite the text image onto the background image using the rotated text mask
        image_out = Image.composite(text_image, back_image, rotated_text_mask)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-draw-text"

        # Convert the PIL image back to a torch tensor
        return (pil2tensor(image_out), show_help,)

```
