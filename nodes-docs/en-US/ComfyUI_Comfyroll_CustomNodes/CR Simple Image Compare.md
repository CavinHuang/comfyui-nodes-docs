---
tags:
- Comparison
---

# 📱 CR Simple Image Compare
## Documentation
- Class name: `CR Simple Image Compare`
- Category: `🧩 Comfyroll Studio/👾 Graphics/📱 Template`
- Output node: `False`

The CR Simple Image Compare node is designed to facilitate the comparison of two images within a graphical interface. It abstracts the complexities involved in image comparison, providing a straightforward way for users to visually assess and contrast the differences or similarities between images.
## Input types
### Required
- **`text1`**
    - The first text input for comparison, allowing users to label or describe the first image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text input for comparison, enabling labeling or description of the second image for a clear contrast.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`footer_height`**
    - Specifies the height of the footer area where additional information or labels can be displayed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_name`**
    - The name of the font used for text rendering in the comparison interface, allowing customization of text appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Determines the size of the font used for text, affecting the readability and visual impact of text labels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Defines the comparison mode, such as side-by-side or overlay, offering different ways to visualize the differences or similarities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`border_thickness`**
    - Specifies the thickness of the border around images, adding a visual separation that can enhance the comparison.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image1`**
    - The first image to be compared, serving as the baseline for visual assessment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image for comparison, allowing users to visually identify differences or similarities with the first image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after comparison, showcasing the differences or similarities identified between the two images.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A flag indicating whether help information about using the comparison tool should be displayed, aiding user understanding.
    - Python dtype: `bool`
- **`ui`**
    - The user interface elements generated by the node, facilitating interaction and visualization of the comparison results.
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class CR_SimpleImageCompare:

    @classmethod
    def INPUT_TYPES(s):

        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]

        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": "text"}),
                    "text2": ("STRING", {"multiline": True, "default": "text"}),
                    "footer_height": ("INT", {"default": 100, "min": 0, "max": 1024}),
                    "font_name": (file_list,),
                    "font_size": ("INT", {"default": 50, "min": 0, "max": 1024}),                
                    "mode": (["normal", "dark"],),
                    "border_thickness": ("INT", {"default": 20, "min": 0, "max": 1024}),                
               },
                "optional": {
                    "image1": ("IMAGE",),
                    "image2": ("IMAGE",),
               }
               
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "layout"
    CATEGORY = icons.get("Comfyroll/Graphics/Template")
    
    def layout(self, text1, text2,
               footer_height, font_name, font_size, mode,
               border_thickness, image1=None, image2=None):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-simple-image-compare"

        # Get RGB values for the text and background colors
        if mode == "normal":
            font_color = "black"
            bg_color = "white"    
        else:    
            font_color = "white"
            bg_color = "black"
        
        if image1 is not None and image2 is not None:

            img1 = tensor2pil(image1)  
            img2 = tensor2pil(image2)
            
            # Get image width and height        
            image_width, image_height = img1.width, img1.height
          
            if img2.width != img1.width or img2.height  != img1.height:
                img2 = apply_resize_image(img2, image_width, image_height, 8, "rescale", "false", 1, 256, "lanczos")          

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
            align = "center"
            footer_align = "center"
            outline_thickness = border_thickness//2
            border_thickness = border_thickness//2
            
            ### Create text panel for image 1                
            if footer_height >0:       
                text_panel1 = text_panel(image_width, footer_height, text1,
                                          font_name, font_size, font_color,
                                          font_outline_thickness, font_outline_color,
                                          bg_color,
                                          margins, line_spacing,
                                          position_x, position_y,
                                          align, footer_align,
                                          rotation_angle, rotation_options)                                                         
                    
            combined_img1 = combine_images([img1, text_panel1], 'vertical')
            
            # Apply the outline
            if outline_thickness > 0:
                combined_img1 = ImageOps.expand(combined_img1, outline_thickness, fill=bg_color)

            ### Create text panel for image 2                
            if footer_height >0:       
                text_panel2 = text_panel(image_width, footer_height, text2,
                                          font_name, font_size, font_color,
                                          font_outline_thickness, font_outline_color,
                                          bg_color,
                                          margins, line_spacing,
                                          position_x, position_y,
                                          align, footer_align,
                                          rotation_angle, rotation_options)
                                                                                       
            combined_img2 = combine_images([img2, text_panel2], 'vertical')

            if outline_thickness > 0:
                combined_img2 = ImageOps.expand(combined_img2, outline_thickness, fill=bg_color)
            
            result_img = combine_images([combined_img1, combined_img2], 'horizontal')
        else:
            result_img = Image.new('RGB', (512,512), bg_color)

        # Add a border to the combined image
        if border_thickness > 0:
            result_img = ImageOps.expand(result_img, border_thickness, bg_color)
          
        return (pil2tensor(result_img), show_help, )  

```