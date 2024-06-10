---
tags:
- Image
- TextOnImage
---

# 🔤️ CR Simple Text Watermark
## Documentation
- Class name: `CR Simple Text Watermark`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

The CR Simple Text Watermark node is designed to overlay text onto images in a subtle manner, typically for the purpose of copyright or identification. It allows for the customization of text appearance and positioning, ensuring the watermark blends seamlessly with the underlying image while maintaining readability.
## Input types
### Required
- **`image`**
    - The image onto which the watermark text will be applied. This is the primary canvas for the watermark operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - The text to be used as the watermark. This allows for customization of the watermark content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`align`**
    - Controls the alignment of the watermark text within the image, aiding in precise placement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`opacity`**
    - Adjusts the opacity of the watermark text, ensuring it does not overpower the main content of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`font_name`**
    - Specifies the font used for the watermark text, enabling customization of the text appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Determines the size of the font used for the watermark text, affecting its visibility and integration with the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_color`**
    - Defines the color of the watermark text, allowing for visual customization to match or contrast with the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_margin`**
    - The horizontal margin from the edge of the image to the start of the watermark text, providing control over its positioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_margin`**
    - The vertical margin from the edge of the image to the start of the watermark text, providing control over its positioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`font_color_hex`**
    - An optional hexadecimal color code for the watermark text, offering an alternative method for defining text color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Outputs the image with the applied watermark text.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides additional information or guidance related to the watermarking process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleTextWatermark:
    
    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
               
        ALIGN_OPTIONS = ["center", "top left", "top center", "top right", "bottom left", "bottom center", "bottom right"]  
                   
        return {"required": {
                    "image": ("IMAGE",),
                    "text": ("STRING", {"multiline": False, "default": "@ your name"}),
                    "align": (ALIGN_OPTIONS,),
                    "opacity": ("FLOAT", {"default": 0.30, "min": 0.00, "max": 1.00, "step": 0.01}),
                    "font_name": (file_list,),
                    "font_size": ("INT", {"default": 50, "min": 1, "max": 1024}),                
                    "font_color": (COLORS,), 
                    "x_margin": ("INT", {"default": 20, "min": -1024, "max": 1024}),
                    "y_margin": ("INT", {"default": 20, "min": -1024, "max": 1024}),
                },
                "optional": {
                    "font_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }     
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "overlay_text"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")

    def overlay_text(self, image, text, align,
                     font_name, font_size, font_color,
                     opacity, x_margin, y_margin, font_color_hex='#000000'):

        # Get RGB values for the text color  
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        
        total_images = []
        
        for img in image:
            
            # Create PIL images for the background layer
            img = tensor2pil(img)
            
            textlayer = Image.new("RGBA", img.size)
            draw = ImageDraw.Draw(textlayer)
            
            # Load the font
            font_file = os.path.join("fonts", str(font_name))             
            resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), font_file)
            font = ImageFont.truetype(str(resolved_font_path), size=font_size)
            
            # Get the size of the text
            textsize = get_text_size(draw, text, font)
            
            # Calculate the position to place the text based on the alignment
            if align == 'center':
                textpos = [(img.size[0] - textsize[0]) // 2, (img.size[1] - textsize[1]) // 2]
            elif align == 'top left':
                textpos = [x_margin, y_margin]
            elif align == 'top center':
                textpos = [(img.size[0] - textsize[0]) // 2, y_margin]    
            elif align == 'top right':
                textpos = [img.size[0] - textsize[0] - x_margin, y_margin]
            elif align == 'bottom left':
                textpos = [x_margin, img.size[1] - textsize[1] - y_margin]
            elif align == 'bottom center':
                textpos = [(img.size[0] - textsize[0]) // 2, img.size[1] - textsize[1] - y_margin]             
            elif align == 'bottom right':
                textpos = [img.size[0] - textsize[0] - x_margin, img.size[1] - textsize[1] - y_margin]
            
            # Draw the text on the text layer
            draw.text(textpos, text, font=font, fill=text_color)
            
            # Adjust the opacity of the text layer if needed
            if opacity != 1:
                textlayer = reduce_opacity(textlayer, opacity)
            
            # Composite the text layer on top of the original image
            out_image = Image.composite(textlayer, img, textlayer)
 
            # convert to tensor
            out_image = np.array(out_image.convert("RGB")).astype(np.float32) / 255.0
            out_image = torch.from_numpy(out_image).unsqueeze(0)
            total_images.append(out_image)

        images_out = torch.cat(total_images, 0)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-simple-text-watermark"
 
        # Convert the PIL image back to a torch tensor
        return (images_out, show_help, )

```
