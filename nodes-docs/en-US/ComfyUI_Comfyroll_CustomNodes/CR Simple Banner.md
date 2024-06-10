---
tags:
- Image
- TextOnImage
---

# 📱 CR Simple Banner
## Documentation
- Class name: `CR Simple Banner`
- Category: `🧩 Comfyroll Studio/👾 Graphics/📱 Template`
- Output node: `False`

The CR Simple Banner node is designed to create visually appealing banners by combining images with customizable text, fonts, and colors. It allows for the creation of banners with specific aesthetic requirements, such as font size, color, and outline, as well as the inclusion of margin sizes for layout adjustments.
## Input types
### Required
- **`image`**
    - The image parameter is the base image over which the banner text will be overlaid. It serves as the foundational visual element of the banner.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`banner_text`**
    - The banner_text parameter specifies the text to be displayed on the banner. This text is customizable and is a key element in conveying the banner's message or theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_name`**
    - The font_name parameter determines the typeface used for the banner text, allowing for stylistic customization to match the banner's design theme.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`max_font_size`**
    - The max_font_size parameter sets the maximum size of the font for the banner text, enabling control over the text's visual impact and readability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_color`**
    - The font_color parameter specifies the color of the banner text, contributing to the banner's overall aesthetic and theme.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`outline_thickness`**
    - The outline_thickness parameter controls the thickness of the outline around the banner text, enhancing text visibility and adding a distinct visual effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - The outline_color parameter defines the color of the text outline, which can be used to create contrast or complement the banner's color scheme.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`margin_size`**
    - The margin_size parameter adjusts the spacing around the banner text, affecting the layout and overall composition of the banner.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`font_color_hex`**
    - The font_color_hex parameter allows specifying the font color in hexadecimal format, offering precise control over the text color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`outline_color_hex`**
    - The outline_color_hex parameter allows specifying the outline color in hexadecimal format, providing additional customization for the text outline.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image output represents the final banner image with the applied text and styling, ready for use in various media formats.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The show_help output provides guidance or additional information related to the banner creation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleBanner:
    
    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]     
        
        return {"required": {
                    "image": ("IMAGE",),
                    #"image_opacity": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1}),
                    "banner_text": ("STRING", {"multiline": True, "default": "text"}),
                    "font_name": (file_list,),
                    "max_font_size": ("INT", {"default": 150, "min": 20, "max": 2048}),
                    "font_color": (COLORS,),                 
                    "outline_thickness": ("INT", {"default": 0, "min": 0, "max": 500}),
                    "outline_color": (COLORS,),
                    #"text_opacity": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1}),
                    #"drop_shadow_angle": ("INT", {"default": 0, "min": 0, "max": 500}),
                    #"drop_shadow_offset": ("INT", {"default": 0, "min": 0, "max": 500}),
                    #"drop_shadow_color": (COLORS,),
                    #"drop_shadow_opacity": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1}),
                    #"wrap_text": (["true", "false"],),
                    "margin_size": ("INT", {"default": 0, "min": 0, "max": 500}),
                },
                "optional": {
                    "font_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "outline_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }         
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_banner"
    CATEGORY = icons.get("Comfyroll/Graphics/Template")

    def make_banner(self, image, banner_text,
                  font_name, max_font_size, font_color,
                  outline_thickness, outline_color, margin_size,
                  font_color_hex='#000000', outline_color_hex='#000000'):

        # Get RGB values for the text and bar colors
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping) 
        
        total_images = []
        
        for img in image:
                    
            # Create PIL images for the image and text bars
            back_image = tensor2pil(img).convert("RGBA")
            size = back_image.width, back_image.height
            #result_image = Image.new("RGB", size)

            # Define font settings
            font_file = os.path.join("fonts", font_name)
            resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), font_file)
        
            # Create the drawing context
            draw = ImageDraw.Draw(back_image)
            
            area_width = back_image.width - (margin_size * 2)
            area_height = back_image.width - (margin_size * 2)
     
            # Get the font size and draw the text
            font = get_font_size(draw, banner_text, area_width, area_height, resolved_font_path, max_font_size)

            x = back_image.width // 2
            y = back_image.height // 2

            if outline_thickness > 0:
                draw.text((x, y), banner_text, fill=text_color, font=font, anchor='mm', stroke_width=outline_thickness, stroke_fill=outline_color)
            else:    
                draw.text((x, y), banner_text, fill=text_color, font=font, anchor='mm')

            # Convert to tensor
            out_image = np.array(back_image.convert("RGB")).astype(np.float32) / 255.0
            out_image = torch.from_numpy(out_image).unsqueeze(0)
            total_images.append(out_image)

        # Batch the images
        images_out = torch.cat(total_images, 0)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-simple-banner"
          
        return (images_out, show_help, )

```
