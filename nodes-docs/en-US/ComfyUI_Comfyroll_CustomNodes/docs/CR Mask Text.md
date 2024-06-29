---
tags:
- Mask
- MaskGeneration
---

# 🔤️ CR Mask Text
## Documentation
- Class name: `CR Mask Text`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

This node is designed to apply text masking operations within a graphical context, enabling the creation of text-based masks that can be used for various image manipulation and composition tasks. It abstracts the complexities involved in text rendering and mask generation, providing a straightforward way to integrate text into visual designs programmatically.
## Input types
### Required
- **`image`**
    - The input image over which the text mask will be applied. This forms the base layer for the text masking operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - The text content to be used for creating the mask. This parameter allows users to specify the exact text that will be rendered into the mask.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - Specifies the font to be used for rendering the text. This allows for customization of the text appearance in the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Determines the size of the font used for the text. This affects how large the text appears within the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_color`**
    - The color of the background over which the text is rendered. This parameter is crucial for defining the visual contrast between the text and the background.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`align`**
    - Specifies the alignment of the text within the mask. This can be left, center, or right, affecting the text's positioning relative to the specified margins.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`justify`**
    - Determines whether the text is justified within the mask. This affects the distribution of space between words in each line.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`margins`**
    - Specifies the margins around the text within the mask. This parameter helps in positioning the text properly within the mask.
    - Comfy dtype: `INT`
    - Python dtype: `Tuple[int, int]`
- **`line_spacing`**
    - Controls the spacing between lines of text. This is important for adjusting the readability of the text within the mask.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`position_x`**
    - The horizontal position of the text within the mask. This parameter allows for precise placement of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position_y`**
    - The vertical position of the text within the mask. Similar to position_x, it enables accurate placement of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation_angle`**
    - The angle at which the text is rotated. This parameter allows for dynamic text orientations within the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation_options`**
    - Additional options for controlling the rotation of the text. This provides further customization of the text's appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Dict[str, Any]`
### Optional
- **`bg_color_hex`**
    - Hexadecimal representation of the background color. Provides an alternative way to specify the background color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the text masking operation, showcasing the applied text mask over the original image.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - A URL or reference to additional help or documentation related to the text masking operation. This can assist users in understanding or utilizing the node more effectively.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_MaskText:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
                      
        return {"required": {
                    "image": ("IMAGE",),
                    "text": ("STRING", {"multiline": True, "default": "text"}),
                    "font_name": (file_list,),
                    "font_size": ("INT", {"default": 50, "min": 1, "max": 1024}),
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
                    "bg_color_hex": ("STRING", {"multiline": False, "default": "#000000"})
                }         
    }

    RETURN_TYPES = ("IMAGE", "STRING",)
    RETURN_NAMES = ("IMAGE", "show_help",)
    FUNCTION = "mask_text"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")
    
    def mask_text(self, image, text, font_name, font_size,
                  margins, line_spacing, 
                  position_x, position_y, background_color, 
                  align, justify,
                  rotation_angle, rotation_options,
                  bg_color_hex='#000000'):

        # Get RGB values for the background color
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)   
   
        # Convert tensor images
        image_3d = image[0, :, :, :]
            
        # Create PIL images for the text and background layers and text mask
        text_image = tensor2pil(image_3d)        
        text_mask = Image.new('L', text_image.size)
        background_image = Image.new('RGB', text_mask.size, bg_color)        

        # Draw the text on the text mask
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size,
                                             margins, line_spacing,
                                             position_x, position_y,
                                             align, justify,
                                             rotation_angle, rotation_options)

        # Invert the text mask (so the text is white and the background is black)
        text_mask = ImageOps.invert(rotated_text_mask)        

        # Composite the text image onto the background image using the inverted text mask        
        image_out = Image.composite(background_image, text_image, text_mask)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-mask-text"
        
        # Convert the PIL image back to a torch tensor
        return (pil2tensor(image_out), show_help,)

```
