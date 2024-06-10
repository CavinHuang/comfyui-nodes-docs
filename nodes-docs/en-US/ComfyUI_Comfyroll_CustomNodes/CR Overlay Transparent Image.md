---
tags:
- Image
- ImageComposite
---

# 🌁 CR Overlay Transparent Image
## Documentation
- Class name: `CR Overlay Transparent Image`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

This node is designed to overlay a transparent image onto a background image, allowing for adjustments in transparency, position, rotation, and scale of the overlay image. It facilitates the creation of composite images by blending two images together in a visually appealing manner.
## Input types
### Required
- **`back_image`**
    - The background image onto which the overlay image will be placed. It serves as the base layer for the composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`overlay_image`**
    - The image to be overlaid on the background image. This image can be manipulated in terms of transparency, rotation, and scale to achieve the desired visual effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`transparency`**
    - Controls the opacity of the overlay image, allowing it to be more or less visible against the background image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`offset_x`**
    - The horizontal offset from the center of the background image where the overlay image will be placed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_y`**
    - The vertical offset from the center of the background image where the overlay image will be placed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation_angle`**
    - The angle in degrees to rotate the overlay image, enabling dynamic positioning and orientation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`overlay_scale_factor`**
    - A factor by which the overlay image is scaled, allowing for adjustments in size relative to the background image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after overlaying the transparent image onto the background, incorporating all specified transformations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_OverlayTransparentImage:
    
    @classmethod
    def INPUT_TYPES(s):
                  
        return {"required": {
                "back_image": ("IMAGE",),
                "overlay_image": ("IMAGE",),
                "transparency": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.1}),
                "offset_x": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                "offset_y": ("INT", {"default": 0, "min": -4096, "max": 4096}),
                "rotation_angle": ("FLOAT", {"default": 0.0, "min": -360.0, "max": 360.0, "step": 0.1}),
                "overlay_scale_factor": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 100.000, "step": 0.001}),
                }        
        }

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "overlay_image"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")

    def overlay_image(self, back_image, overlay_image, 
                      transparency, offset_x, offset_y, rotation_angle, overlay_scale_factor=1.0):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-overlay-transparent-image"
       
        # Create PIL images for the text and background layers and text mask
        back_image = tensor2pil(back_image)
        overlay_image = tensor2pil(overlay_image)

        # Apply transparency to overlay image
        overlay_image.putalpha(int(255 * (1 - transparency)))

        # Rotate overlay image
        overlay_image = overlay_image.rotate(rotation_angle, expand=True)

        # Scale overlay image
        overlay_width, overlay_height = overlay_image.size
        new_size = (int(overlay_width * overlay_scale_factor), int(overlay_height * overlay_scale_factor))
        overlay_image = overlay_image.resize(new_size, Image.Resampling.LANCZOS)

        # Calculate centered position relative to the center of the background image
        center_x = back_image.width // 2
        center_y = back_image.height // 2
        position_x = center_x - overlay_image.width // 2 + offset_x
        position_y = center_y - overlay_image.height // 2 + offset_y

        # Paste the rotated overlay image onto the new back image at the specified position
        back_image.paste(overlay_image, (position_x, position_y), overlay_image)

        # Convert the PIL image back to a torch tensor
        return pil2tensor(back_image),

```
