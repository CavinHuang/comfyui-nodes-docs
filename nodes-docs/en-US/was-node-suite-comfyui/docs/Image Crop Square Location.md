---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Crop Square Location
## Documentation
- Class name: `Image Crop Square Location`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in cropping a square region from an image based on specified coordinates and size. It adjusts the crop area to ensure it remains within the image's boundaries and optionally resizes the cropped region to maintain a dimension that is a multiple of 8, facilitating compatibility with certain image processing operations.
## Input types
### Required
- **`image`**
    - The input image to be cropped. This parameter is crucial as it defines the base from which the square region will be extracted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x`**
    - The x-coordinate of the center point of the square crop. It influences the horizontal positioning of the crop area within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate of the center point of the square crop. It affects the vertical positioning of the crop area within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size`**
    - The size of the square to be cropped from the image. This parameter determines the dimensions of the resulting cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped square region of the image, resized to ensure its dimensions are multiples of 8.
    - Python dtype: `torch.Tensor`
- **`crop_data`**
    - Comfy dtype: `CROP_DATA`
    - The original crop data detailing the dimensions and coordinates of the crop.
    - Python dtype: `Tuple[Tuple[int, int], Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Crop_Square_Location:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "x": ("INT", {"default":0, "max": 24576, "min":0, "step":1}),
                "y": ("INT", {"default":0, "max": 24576, "min":0, "step":1}),
                "size": ("INT", {"default":256, "max": 4096, "min":5, "step":1}),
            }
        }

    RETURN_TYPES = ("IMAGE", "CROP_DATA")
    FUNCTION = "image_crop_location"

    CATEGORY = "WAS Suite/Image/Process"

    def image_crop_location(self, image, x=256, y=256, size=512):

        image = tensor2pil(image)
        img_width, img_height = image.size
        exp_size = size // 2
        left = max(x - exp_size, 0)
        top = max(y - exp_size, 0)
        right = min(x + exp_size, img_width)
        bottom = min(y + exp_size, img_height)

        if right - left < size:
            if right < img_width:
                right = min(right + size - (right - left), img_width)
            elif left > 0:
                left = max(left - (size - (right - left)), 0)
        if bottom - top < size:
            if bottom < img_height:
                bottom = min(bottom + size - (bottom - top), img_height)
            elif top > 0:
                top = max(top - (size - (bottom - top)), 0)

        crop = image.crop((left, top, right, bottom))

        # Original Crop Data
        crop_data = (crop.size, (left, top, right, bottom))

        # Output resize
        crop = crop.resize((((crop.size[0] // 8) * 8), ((crop.size[1] // 8) * 8)))

        return (pil2tensor(crop), crop_data)

```
