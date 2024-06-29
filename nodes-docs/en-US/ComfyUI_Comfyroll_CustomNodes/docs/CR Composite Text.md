---
tags:
- Image
- TextOnImage
---

# 🔤️ CR Composite Text
## Documentation
- Class name: `CR Composite Text`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

This node is designed for the advanced manipulation and combination of text elements within images, enabling users to create complex text overlays and compositions. It likely offers functionalities for adjusting text properties such as font, size, and alignment, as well as the ability to blend text with images in various creative ways.
## Input types
### Required
- **`image_text`**
    - The image onto which the text will be composited. This parameter is essential for integrating the text with the visual content.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_background`**
    - The background image over which the text and foreground image will be composited, providing a backdrop for the composition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - The primary text content to be composited onto an image. This parameter is crucial for defining the textual element of the composition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - Specifies the font style to be used for the text, impacting the visual appearance of the text element within the composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Determines the size of the text, allowing for precise control over how the text fits within the overall image composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`align`**
    - Controls the horizontal alignment of the text within the image, enabling users to position the text according to their compositional needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`justify`**
    - Controls the vertical alignment and distribution of text lines within the image, further refining the text's placement and appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`margins`**
    - Defines the margins around the text, providing space between the text and the edges of the image or other compositional elements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`line_spacing`**
    - Adjusts the spacing between lines of text, allowing for better readability and aesthetic arrangement of the text content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_x`**
    - Specifies the x-coordinate for the position of the text within the image, enabling precise placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_y`**
    - Specifies the y-coordinate for the position of the text within the image, enabling precise placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation_angle`**
    - Defines the angle at which the text will be rotated, allowing for dynamic and creative text orientations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation_options`**
    - Provides additional options for text rotation, such as the point around which the text should rotate, enhancing the flexibility of text positioning.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the text has been composited onto it. This output showcases the integration of text and image elements.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Optional output that provides help or guidance related to the node's functionality or output.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_CompositeText:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
                             
        return {"required": {
                    "image_text": ("IMAGE",),
                    "image_background": ("IMAGE",),
                    "text": ("STRING", {"multiline": True, "default": "text"}),
                    "font_name": (file_list,),
                    "font_size": ("INT", {"default": 50, "min": 1, "max": 1024}),
                    "align": (ALIGN_OPTIONS,),
                    "justify": (JUSTIFY_OPTIONS,),
                    "margins": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                    "line_spacing": ("INT", {"default": 0, "min": -1024, "max": 1024}),
                    "position_x": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                    "position_y": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                    "rotation_angle": ("FLOAT", {"default": 0.0, "min": -360.0, "max": 360.0, "step": 0.1}),
                    "rotation_options": (ROTATE_OPTIONS,),
                }        
    }

    RETURN_TYPES = ("IMAGE", "STRING",)
    RETURN_NAMES = ("IMAGE", "show_help",)
    FUNCTION = "composite_text"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")
    
    def composite_text(self, image_text, image_background, text,
                       font_name, font_size, 
                       margins, line_spacing,
                       position_x, position_y,
                       align, justify,
                       rotation_angle, rotation_options):

        # Convert tensor images
        image_text_3d = image_text[0, :, :, :]
        image_back_3d = image_background[0, :, :, :]
            
        # Create PIL images for the text and background layers and text mask
        text_image = tensor2pil(image_text_3d)
        back_image = tensor2pil(image_back_3d)
        text_mask = Image.new('L', back_image.size)

        # Draw the text on the text mask
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size,
                                             margins, line_spacing,
                                             position_x, position_y,
                                             align, justify,
                                             rotation_angle, rotation_options)
                                             
        # Composite the text image onto the background image using the rotated text mask
        image_out = Image.composite(text_image, back_image, rotated_text_mask)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-composite-text"
        
        # Convert the PIL image back to a torch tensor
        return (pil2tensor(image_out), show_help,)

```
