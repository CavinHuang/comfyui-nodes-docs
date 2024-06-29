---
tags:
- LensEffects
- VisualEffects
---

# 🎨 CR Vignette Filter
## Documentation
- Class name: `CR Vignette Filter`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🎨 Filter`
- Output node: `False`

The CR Vignette Filter node applies a vignette effect to images, allowing for customization of the vignette's shape, intensity, and position. This node enhances visual aesthetics by softly fading the image edges into a specified color, typically to focus attention towards the central area of the image.
## Input types
### Required
- **`image`**
    - The 'image' input specifies the single image to which the vignette effect will be applied. This input is essential for determining the visual output of the node, as it directly influences the appearance and intensity of the vignette effect on the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`vignette_shape`**
    - Specifies the shape of the vignette effect applied to the image. Options include 'circle', 'oval', 'square', and 'diamond', allowing for versatile visual styling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`feather_amount`**
    - Determines the softness of the vignette's edges by specifying the amount of feathering. A higher value results in softer, more blended edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x_offset`**
    - Adjusts the horizontal position of the vignette effect, allowing for custom alignment relative to the image's center.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_offset`**
    - Adjusts the vertical position of the vignette effect, enabling precise placement in relation to the image's central point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom`**
    - Controls the size of the vignette effect relative to the image size. A higher zoom value decreases the vignette's size, focusing the effect more centrally.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`reverse`**
    - Determines whether the vignette effect is applied inside or outside the specified shape. Choosing 'yes' reverses the effect, highlighting the edges instead of the center.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image with the applied vignette effect, showcasing the enhanced focus and aesthetic appeal.
    - Python dtype: `Image`
- **`MASK`**
    - Comfy dtype: `MASK`
    - The mask used to create the vignette effect, useful for further image processing or analysis.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string output that provides helpful information or guidance related to the vignette effect's application.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_VignetteFilter:

    @classmethod
    def INPUT_TYPES(s):
                    
        return {"required": {
                    "image": ("IMAGE",),
                    "vignette_shape": (["circle","oval","square","diamond"],),                    
                    "feather_amount": ("INT", {"default": 100, "min": 0, "max": 1024}),
                    "x_offset": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                    "y_offset": ("INT", {"default": 0, "min": -2048, "max": 2048}),
                    "zoom": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                    "reverse": (["no","yes"],), 
               }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "STRING", )
    RETURN_NAMES = ("IMAGE", "MASK", "show_help", )
    FUNCTION = "make_vignette"
    CATEGORY = icons.get("Comfyroll/Graphics/Filter")
    
    def make_vignette(self, image, feather_amount, reverse,
                      vignette_shape='circle',
                      x_offset=0, y_offset=0, zoom=1.0):
    
        images = []
        masks = []

        vignette_color = "black"

        for img in image:
            im = tensor2pil(img)

            RADIUS = feather_amount

            # Create an alpha mask for the vignette effect
            alpha_mask = Image.new('L', im.size, 255)
            draw = ImageDraw.Draw(alpha_mask)

            center_x = im.size[0] // 2 + x_offset
            center_y = im.size[1] // 2 + y_offset         
            radius = min(center_x, center_y) * zoom
            size_x = (im.size[0] - RADIUS) * zoom
            size_y = (im.size[1] - RADIUS) * zoom               
                    
            if vignette_shape == 'circle':
                if reverse == 'no':
                    # Calculate the position to center the circular mask with offsets and zoom
                    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=0)
                elif reverse == 'yes':
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=255)             
                else:
                    raise ValueError("Invalid value for reverse. Use 'yes' or 'no'.")
            elif vignette_shape == 'oval':
                if reverse == 'no':
                    draw.ellipse([(center_x - size_x / 2, center_y - size_y / 2),
                        (center_x + size_x / 2, center_y + size_y / 2)], fill=0)
                elif reverse == 'yes':
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.ellipse([(center_x - size_x / 2, center_y - size_y / 2),
                        (center_x + size_x / 2, center_y + size_y / 2)], fill=255)                                                             
            elif vignette_shape == 'diamond':
                if reverse == 'no':
                    # Calculate the position and size to center the diamond mask with offsets and zoom
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.polygon([(center_x, center_y - size / 2),
                                  (center_x + size / 2, center_y),
                                  (center_x, center_y + size / 2),
                                  (center_x - size / 2, center_y)],
                                 fill=0)
                elif reverse == 'yes':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.polygon([(center_x, center_y - size / 2),
                                  (center_x + size / 2, center_y),
                                  (center_x, center_y + size / 2),
                                  (center_x - size / 2, center_y)],
                                 fill=255)                                    
            elif vignette_shape == 'square':
                if reverse == 'no':
                    # Calculate the position to center the square mask with offsets and zoom
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(center_x - size / 2, center_y - size / 2),
                        (center_x + size / 2, center_y + size / 2)], fill=0)
                elif reverse == 'yes':
                    size = min(im.size[0] - x_offset, im.size[1] - y_offset) * zoom
                    draw.rectangle([(0, 0), im.size], fill=0)
                    draw.rectangle([(center_x - size / 2, center_y - size / 2),
                        (center_x + size / 2, center_y + size / 2)], fill=255)                      
                else:
                    raise ValueError("Invalid value for reverse. Use 'yes' or 'no'.")
            else:
                raise ValueError("Invalid vignette_shape. Use 'circle', 'oval', or 'square'.")

            # Apply GaussianBlur to the alpha mask for feathering
            alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(RADIUS))
            
            # Append the alpha mask to the masks list
            masks.append(pil2tensor(alpha_mask).unsqueeze(0))

            # Create a new image with the vignette effect
            vignette_img = Image.new('RGBA', im.size, vignette_color)
            vignette_img.putalpha(alpha_mask)

            # Composite the original image with the vignette effect
            result_img = Image.alpha_composite(im.convert('RGBA'), vignette_img)

            images.append(pil2tensor(result_img.convert("RGB")))

        images = torch.cat(images, dim=0)
        masks = torch.cat(masks, dim=0)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-vignette-filter"

        return (images, masks, show_help, )

```
