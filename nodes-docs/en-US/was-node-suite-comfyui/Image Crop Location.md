---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Crop Location
## Documentation
- Class name: `Image Crop Location`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to crop a given image based on specified coordinates and dimensions, adjusting the crop area to fit within the original image's boundaries. It ensures the cropped area does not exceed the image's dimensions by dynamically adjusting the specified coordinates and size.
## Input types
### Required
- **`image`**
    - The input image to be cropped. This parameter is crucial as it defines the base image from which a specific region will be extracted based on the provided coordinates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`top`**
    - The top coordinate for the cropping area, influencing the vertical starting point of the crop within the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`left`**
    - The left coordinate for the cropping area, influencing the horizontal starting point of the crop within the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - The right coordinate for the cropping area, determining the horizontal end point of the crop within the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - The bottom coordinate for the cropping area, determining the vertical end point of the crop within the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped image.
    - Python dtype: `torch.Tensor`
- **`crop_data`**
    - Comfy dtype: `CROP_DATA`
    - Crop data including the final crop dimensions and coordinates.
    - Python dtype: `Tuple[Tuple[int, int], Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Crop_Location:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "top": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "left": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "right": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
                "bottom": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
            }
        }

    RETURN_TYPES = ("IMAGE", "CROP_DATA")
    FUNCTION = "image_crop_location"

    CATEGORY = "WAS Suite/Image/Process"

    def image_crop_location(self, image, top=0, left=0, right=256, bottom=256):
        image = tensor2pil(image)
        img_width, img_height = image.size

        # Calculate the final coordinates for cropping
        crop_top = max(top, 0)
        crop_left = max(left, 0)
        crop_bottom = min(bottom, img_height)
        crop_right = min(right, img_width)

        # Ensure that the cropping region has non-zero width and height
        crop_width = crop_right - crop_left
        crop_height = crop_bottom - crop_top
        if crop_width <= 0 or crop_height <= 0:
            raise ValueError("Invalid crop dimensions. Please check the values for top, left, right, and bottom.")

        # Crop the image and resize
        crop = image.crop((crop_left, crop_top, crop_right, crop_bottom))
        crop_data = (crop.size, (crop_left, crop_top, crop_right, crop_bottom))
        crop = crop.resize((((crop.size[0] // 8) * 8), ((crop.size[1] // 8) * 8)))

        return (pil2tensor(crop), crop_data)

```
