---
tags:
- Image
- TextOnImage
---

# 🔤 CR Overlay Text
## Documentation
- Class name: `CR Overlay Text`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

This node is designed to overlay text onto images, allowing for customization of text alignment, font properties, and positioning. It provides a versatile tool for adding textual annotations or labels directly onto visual content.
## Input types
### Required
- **`image`**
    - The image onto which the text will be overlaid. It serves as the base layer for the text overlay operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`text`**
    - The text content to be overlaid on the image. This parameter allows for dynamic text annotations on visual content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - The name of the font to be used for the text overlay. This determines the visual style of the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - The size of the font for the text overlay. It influences the readability and visual impact of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_color`**
    - The color of the font in RGB format. It affects the visibility and aesthetic of the text overlay.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `tuple`
- **`align`**
    - Specifies the alignment of the text within the given margins. It affects the positioning and appearance of the text overlay.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`justify`**
    - Determines the justification of the text, affecting its alignment relative to the specified margins.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`margins`**
    - The margin size around the text, influencing its positioning within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`line_spacing`**
    - The spacing between lines of text, affecting the layout and readability of the text overlay.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_x`**
    - The horizontal position of the text within the image, determining its exact placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_y`**
    - The vertical position of the text within the image, determining its exact placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation_angle`**
    - The angle at which the text is rotated, allowing for dynamic text orientation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation_options`**
    - Options for rotating the text, providing flexibility in text presentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`font_color_hex`**
    - The hexadecimal color code for the font. Provides an alternative way to specify the font color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the text overlay operation, with the text visually integrated onto the original image.
    - Python dtype: `PIL.Image.Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string output that provides help or additional information related to the text overlay operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_OverlayText:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
                        
        return {"required": {
                "image": ("IMAGE",),
                "text": ("STRING", {"multiline": True, "default": "text"}),
                "font_name": (file_list,),
                "font_size": ("INT", {"default": 50, "min": 1, "max": 1024}),
                "font_color": (COLORS,), 
                "align": (ALIGN_OPTIONS,),
                "justify": (JUSTIFY_OPTIONS,),
                "margins": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                "line_spacing": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                "position_x": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                "position_y": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                "rotation_angle": ("FLOAT", {"default": 0.0, "min": -360.0, "max": 360.0, "step": 0.1}),
                "rotation_options": (ROTATE_OPTIONS,),
                },
                "optional": {"font_color_hex": ("STRING", {"multiline": False, "default": "#000000"})
                }        
    }

    RETURN_TYPES = ("IMAGE", "STRING",)
    RETURN_NAMES = ("IMAGE", "show_help",)
    FUNCTION = "overlay_text"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")

    def overlay_text(self, image, text, font_name, font_size, font_color,  
                     margins, line_spacing,
                     position_x, position_y,
                     align, justify,
                     rotation_angle, rotation_options,
                     font_color_hex='#000000'):

        # Get RGB values for the text color  
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
      
        # Convert tensor images
        image_3d = image[0, :, :, :]

        # Create PIL images for the text and background layers and text mask
        back_image = tensor2pil(image_3d)
        text_image = Image.new('RGB', back_image.size, text_color)
        text_mask = Image.new('L', back_image.size)
        
        # Draw the text on the text mask
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size,
                                             margins, line_spacing, 
                                             position_x, position_y,
                                             align, justify,
                                             rotation_angle, rotation_options)

        # Composite the text image onto the background image using the rotated text mask       
        image_out = Image.composite(text_image, back_image, rotated_text_mask)       

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-overlay-text"
        
        # Convert the PIL image back to a torch tensor
        return (pil2tensor(image_out), show_help,)

```
