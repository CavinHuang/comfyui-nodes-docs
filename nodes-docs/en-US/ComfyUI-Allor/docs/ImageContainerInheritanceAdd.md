---
tags:
- Image
- ImageTransformation
---

# ImageContainerInheritanceAdd
## Documentation
- Class name: `ImageContainerInheritanceAdd`
- Category: `image/container`
- Output node: `False`

This node is designed to perform an additive operation on a collection of images, adjusting their dimensions and applying color transformations based on specified parameters. It encapsulates the functionality to scale and modify images in a batch, leveraging inheritance to extend or customize the image processing workflow.
## Input types
### Required
- **`images`**
    - The collection of images to be processed. It serves as the primary input for the node, determining the base content for subsequent operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`add_width`**
    - The additional width to be added to the images, affecting the overall size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`add_height`**
    - The additional height to be added to the images, affecting the overall size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - The red color component to be added to each image, influencing the final color balance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component to be added to each image, influencing the final color balance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component to be added to each image, influencing the final color balance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) value to be applied to each image, affecting its opacity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`method`**
    - Specifies the method to be used for the additive operation, potentially altering how colors and dimensions are adjusted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image or a collection of images that have been processed according to the specified parameters, including dimension adjustments and color transformations.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceAdd:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "add_width": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "add_height": ("INT", {
                    "default": 0,
                    "step": 1
                }),
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
                "method": (["single", "for_each"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images, add_width, add_height, red, green, blue, alpha, method):
        width, height = images[0, :, :, 0].shape

        width = width + add_width
        height = height + add_height

        image = create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor()

        if method == "single":
            return (image.unsqueeze(0),)
        else:
            length = len(images)

            images = torch.zeros(length, height, width, 4)
            images[:, :, :] = image
            return (images,)

```
