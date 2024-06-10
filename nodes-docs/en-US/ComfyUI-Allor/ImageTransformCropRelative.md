---
tags:
- Crop
- Image
- ImageTransformation
---

# ImageTransformCropRelative
## Documentation
- Class name: `ImageTransformCropRelative`
- Category: `image/transform`
- Output node: `False`

The `ImageTransformCropRelative` node provides functionality for cropping images based on relative positions. It allows for dynamic cropping by specifying start and end points as fractions of the image's dimensions, enabling flexible image manipulation without the need for absolute pixel values.
## Input types
### Required
- **`images`**
    - The `images` parameter represents the collection of images to be cropped. It is crucial for defining the input images on which the cropping operation will be performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`start_x`**
    - Specifies the relative starting x-coordinate for the cropping operation, as a fraction of the image's width. It determines the left boundary of the crop.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - Specifies the relative starting y-coordinate for the cropping operation, as a fraction of the image's height. It determines the top boundary of the crop.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - Specifies the relative ending x-coordinate for the cropping operation, as a fraction of the image's width. It determines the right boundary of the crop.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - Specifies the relative ending y-coordinate for the cropping operation, as a fraction of the image's height. It determines the bottom boundary of the crop.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a cropped version of the input images, adjusted according to the specified relative start and end coordinates.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "start_x": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 0.75,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 0.75,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, start_x, start_y, end_x, end_y):
        height, width = images[0, :, :, 0].shape

        return ImageTransformCropAbsolute().node(
            images,
            width * start_x,
            height * start_y,
            width * end_x,
            height * end_y
        )

```
