---
tags:
- ImageTransformation
---

# Image Displacement Warp
## Documentation
- Class name: `Image Displacement Warp`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

This node applies a displacement warp effect to an image based on a provided displacement map and amplitude. It adjusts the positions of pixels in the original image according to the displacement values, creating a visually distorted version of the image that simulates physical displacement.
## Input types
### Required
- **`images`**
    - The original images to be warped. They serve as the base for applying the displacement effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`displacement_maps`**
    - Grayscale images representing the displacement maps. Each pixel's intensity in these maps indicates the displacement amount for the corresponding pixel in the original images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`amplitude`**
    - A scalar value that scales the displacement effect. Higher values result in more pronounced displacement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting images after applying the displacement warp effect. They showcase the original images with the displacement effect applied.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Displacement_Warp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "displacement_maps": ("IMAGE",),
                "amplitude": ("FLOAT", {"default": 25.0, "min": -4096, "max": 4096, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "displace_image"

    CATEGORY = "WAS Suite/Image/Transform"

    def displace_image(self, images, displacement_maps, amplitude):

        WTools = WAS_Tools_Class()

        displaced_images = []
        for i in range(len(images)):
            img = tensor2pil(images[i])
            if i < len(displacement_maps):
                disp = tensor2pil(displacement_maps[i])
            else:
                disp = tensor2pil(displacement_maps[-1])
            disp = self.resize_and_crop(disp, img.size)
            displaced_images.append(pil2tensor(WTools.displace_image(img, disp, amplitude)))

        displaced_images = torch.cat(displaced_images, dim=0)

        return (displaced_images, )


    def resize_and_crop(self, image, target_size):
        width, height = image.size
        target_width, target_height = target_size
        aspect_ratio = width / height
        target_aspect_ratio = target_width / target_height

        if aspect_ratio > target_aspect_ratio:
            new_height = target_height
            new_width = int(new_height * aspect_ratio)
        else:
            new_width = target_width
            new_height = int(new_width / aspect_ratio)

        image = image.resize((new_width, new_height))
        left = (new_width - target_width) // 2
        top = (new_height - target_height) // 2
        right = left + target_width
        bottom = top + target_height
        image = image.crop((left, top, right, bottom))

        return image

```
