---
tags:
- Image
---

# 🌁 CR Image Border
## Documentation
- Class name: `CR Image Border`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

This node is designed to add customizable borders around images. It allows for the adjustment of border thickness on all sides and the specification of border color, including the option to use a hex color code. Additionally, it supports the creation of feathered borders, providing a soft, blurred edge effect around the image.
## Input types
### Required
- **`image`**
    - The input image or images to which the border will be applied. This parameter is crucial for defining the visual content that will be enhanced with a border.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`top_thickness`**
    - Specifies the thickness of the border at the top edge of the image. This parameter allows for the customization of the border's appearance by adjusting its size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom_thickness`**
    - Specifies the thickness of the border at the bottom edge of the image. This parameter enables the user to customize the border's appearance by adjusting its size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`left_thickness`**
    - Specifies the thickness of the border at the left edge of the image. This parameter allows for the customization of the border's appearance by adjusting its size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right_thickness`**
    - Specifies the thickness of the border at the right edge of the image. This parameter enables the user to customize the border's appearance by adjusting its size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - Defines the color of the border. This parameter allows for the customization of the border's appearance by choosing a specific color.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`outline_thickness`**
    - Determines the thickness of the outline around the image, separate from the main border. This allows for an additional layer of customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - Specifies the color of the outline. This parameter works in conjunction with outline thickness to enhance the visual appeal of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`border_color_hex`**
    - An optional hex code to specify the border color, providing an alternative method for defining the border's color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the applied borders. This includes any adjustments made to border thickness, color, feathering, and outline.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR Image Border node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewBridge](../../ComfyUI-Impact-Pack/Nodes/PreviewBridge.md)



## Source code
```python
class CR_ImageBorder:

    @classmethod
    def INPUT_TYPES(s):
                    
        return {"required": {
                    "image": ("IMAGE",),
                    "top_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "bottom_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "left_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "right_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "border_color": (COLORS,),
                    "outline_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                    "outline_color": (COLORS[1:],),
                },
                "optional": {
                    "border_color_hex": ("STRING", {"multiline": False, "default": "#000000"})                
                }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, image,
                   top_thickness, bottom_thickness,
                   left_thickness, right_thickness, border_color,
                   outline_thickness, outline_color, 
                   border_color_hex='#000000'):

        images = []

        border_color = get_color_values(border_color, border_color_hex, color_mapping)

        for img in image:
            img = tensor2pil(img)
            
            # Apply the outline
            if outline_thickness > 0:
                img = ImageOps.expand(img, outline_thickness, fill=outline_color)
            
            # Apply the borders
            if left_thickness > 0 or right_thickness > 0 or top_thickness > 0 or bottom_thickness > 0:
                img = ImageOps.expand(img, (left_thickness, top_thickness, right_thickness, bottom_thickness), fill=border_color)
                
            images.append(pil2tensor(img))
        
        images = torch.cat(images, dim=0)                

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-border"

        return (images, show_help, )

```
