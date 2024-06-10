---
tags:
- Image
- ImageTransformation
---

# ImageContainerInheritanceSum
## Documentation
- Class name: `ImageContainerInheritanceSum`
- Category: `image/container`
- Output node: `False`

This node is designed to handle the summation of image dimensions within a container, facilitating operations that require combining multiple images into a single composite image. It abstracts the complexity of image dimension calculations and adjustments, making it easier to work with image collections in a unified manner.
## Input types
### Required
- **`images_a`**
    - One of the collections of images to be processed, playing a key role in determining the overall dimensions of the resulting composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_b`**
    - The other collection of images to be processed, contributing to the overall dimensions of the resulting composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`red`**
    - The red color component value used in the image processing, affecting the visual outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component value used in the image processing, affecting the visual outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component value used in the image processing, affecting the visual outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) value used in the image processing, affecting the visual outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`container_size_type`**
    - Specifies the method for calculating the container size, influencing the dimensions of the resulting composite image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`method`**
    - Specifies the method of image processing to be applied, influencing how images are combined or manipulated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting composite image after processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceSum:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "alpha": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "container_size_type": (["sum", "sum_width", "sum_height"],),
                "method": (["single", "for_each_pair", "for_each_matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images_a, images_b, red, green, blue, alpha, container_size_type, method):
        img_a_height, img_a_width = images_a[0, :, :, 0].shape
        img_b_height, img_b_width = images_b[0, :, :, 0].shape

        if container_size_type == "sum":
            width = img_a_width + img_b_width
            height = img_a_height + img_b_height
        elif container_size_type == "sum_width":
            if img_a_height != img_b_height:
                raise ValueError()

            width = img_a_width + img_b_width
            height = img_a_height
        elif container_size_type == "sum_height":
            if img_a_width != img_b_width:
                raise ValueError()

            width = img_a_width
            height = img_a_height + img_b_height
        else:
            raise ValueError()

        image = create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor()

        if method == "single":
            return (image.unsqueeze(0),)
        elif method == "for_each_pair":
            length = len(images_a)
            images = torch.zeros(length, height, width, 4)
        else:
            length = len(images_a) * len(images_b)
            images = torch.zeros(length, height, width, 4)

        images[:, :, :] = image
        return (images,)

```
