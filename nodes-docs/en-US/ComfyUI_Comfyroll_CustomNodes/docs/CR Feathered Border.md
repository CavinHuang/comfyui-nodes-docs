---
tags:
- Image
---

# 🌁 CR Feathered Border
## Documentation
- Class name: `CR Feathered Border`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR Feathered Border node is designed to add a customizable feathered border around images. It allows for the adjustment of border thickness, color, and the degree of feathering to create visually appealing edges.
## Input types
### Required
- **`image`**
    - A single image to which the feathered border will be applied. This parameter is crucial for defining the visual content that will be enhanced with the border.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`top_thickness`**
    - Specifies the thickness of the top border. This parameter allows for the customization of the border's appearance by adjusting its size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom_thickness`**
    - Specifies the thickness of the bottom border, enabling customization of the border's vertical dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`left_thickness`**
    - Determines the thickness of the left side of the border, allowing for horizontal dimension customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right_thickness`**
    - Defines the thickness of the right side of the border, contributing to the customization of the border's horizontal dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - The color of the border. This parameter is essential for defining the aesthetic appeal of the border.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[int, int, int]`
- **`feather_amount`**
    - The degree of feathering applied to the border edges, affecting the softness and visual effect of the border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`border_color_hex`**
    - An optional hexadecimal value for the border color, providing an alternative way to specify custom colors.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the applied feathered border, showcasing the enhanced visual appeal.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR Feathered Border node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class CR_FeatheredBorder:

    @classmethod
    def INPUT_TYPES(s):
                    
        return {"required": {
                    "image": ("IMAGE",),
                    "top_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "bottom_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "left_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "right_thickness": ("INT", {"default": 0, "min": 0, "max": 4096}),
                    "border_color": (COLORS,),
                    "feather_amount": ("INT", {"default": 0, "min": 0, "max": 1024}),
                },
                "optional": {
                    "border_color_hex": ("STRING", {"multiline": False, "default": "#000000"})                
                }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_border"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_border(self, image,
                   top_thickness, bottom_thickness,
                   left_thickness, right_thickness, border_color,
                   feather_amount,
                   border_color_hex='#000000'):
                   
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-feathered-border"                   

        images = []

        border_color = get_color_values(border_color, border_color_hex, color_mapping)

        for img in image:
            im = tensor2pil(img)
            
            RADIUS = feather_amount
                         
            # Paste image on white background
            diam = 2*RADIUS
            back = Image.new('RGB', (im.size[0]+diam, im.size[1]+diam), border_color)
            back.paste(im, (RADIUS, RADIUS))

            # Create paste mask
            mask = Image.new('L', back.size, 0)
            draw = ImageDraw.Draw(mask)
            x0, y0 = 0, 0
            x1, y1 = back.size
            for d in range(diam+RADIUS):
                x1, y1 = x1-1, y1-1
                alpha = 255 if d<RADIUS else int(255*(diam+RADIUS-d)/diam)
                draw.rectangle([x0, y0, x1, y1], outline=alpha)
                x0, y0 = x0+1, y0+1

            # Blur image and paste blurred edge according to mask
            blur = back.filter(ImageFilter.GaussianBlur(RADIUS/2))
            back.paste(blur, mask=mask)

            # Apply the borders
            if left_thickness > 0 or right_thickness > 0 or top_thickness > 0 or bottom_thickness > 0:
                img = ImageOps.expand(back, (left_thickness, top_thickness, right_thickness, bottom_thickness), fill=border_color)
            else:
                img = back

            images.append(pil2tensor(img))
        
        images = torch.cat(images, dim=0)                

        return (images, show_help, )

```
