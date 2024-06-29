---
tags:
- Image
- ImageTransformation
---

# ImageCompositeAbsolute
## Documentation
- Class name: `ImageCompositeAbsolute`
- Category: `image/composite`
- Output node: `False`

This node is designed for creating composite images by absolutely positioning two input images within a specified container. It handles the precise placement and blending of these images based on given coordinates, dimensions of the container, and a specified compositing method, facilitating the creation of complex visual layouts.
## Input types
### Required
- **`images_a`**
    - The first image to be composited within the container. It plays a crucial role in the layering order and visual outcome of the composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`images_b`**
    - The second image to be composited within the container, contributing to the complexity and depth of the final composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`images_a_x`**
    - The x-coordinate for the top-left corner of the first image within the container, defining its horizontal placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`images_a_y`**
    - The y-coordinate for the top-left corner of the first image within the container, defining its vertical placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`images_b_x`**
    - The x-coordinate for the top-left corner of the second image within the container, defining its horizontal placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`images_b_y`**
    - The y-coordinate for the top-left corner of the second image within the container, defining its vertical placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`container_width`**
    - Specifies the width of the container within which the input images are to be composited. It determines the horizontal boundary for the composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`container_height`**
    - Specifies the height of the container within which the input images are to be composited. It determines the vertical boundary for the composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background`**
    - Determines which of the input images (images_a or images_b) is used as the background in the composite. This choice affects the layering and visual outcome of the final image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`method`**
    - Specifies the compositing method to be used, influencing how the images are blended together within the container.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after compositing the input images according to the specified parameters and method.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageCompositeAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "images_a_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_a_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "container_width": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "container_height": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "background": (["images_a", "images_b"],),
                "method": (["pair", "matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/composite"

    def node(
            self,
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            container_width,
            container_height,
            background,
            method
    ):
        def clip(value: float):
            return value if value >= 0 else 0

        # noinspection PyUnresolvedReferences
        def composite(image_a, image_b):
            img_a_height, img_a_width, img_a_dim = image_a.shape
            img_b_height, img_b_width, img_b_dim = image_b.shape

            if img_a_dim == 3:
                image_a = torch.stack([
                    image_a[:, :, 0],
                    image_a[:, :, 1],
                    image_a[:, :, 2],
                    torch.ones((img_a_height, img_a_width))
                ], dim=2)

            if img_b_dim == 3:
                image_b = torch.stack([
                    image_b[:, :, 0],
                    image_b[:, :, 1],
                    image_b[:, :, 2],
                    torch.ones((img_b_height, img_b_width))
                ], dim=2)

            container_x = max(img_a_width, img_b_width) if container_width == 0 else container_width
            container_y = max(img_a_height, img_b_height) if container_height == 0 else container_height

            container_a = torch.zeros((container_y, container_x, 4))
            container_b = torch.zeros((container_y, container_x, 4))

            img_a_height_c, img_a_width_c = [
                clip((images_a_y + img_a_height) - container_y),
                clip((images_a_x + img_a_width) - container_x)
            ]

            img_b_height_c, img_b_width_c = [
                clip((images_b_y + img_b_height) - container_y),
                clip((images_b_x + img_b_width) - container_x)
            ]

            if img_a_height_c <= img_a_height and img_a_width_c <= img_a_width:
                container_a[
                    images_a_y:img_a_height + images_a_y - img_a_height_c,
                    images_a_x:img_a_width + images_a_x - img_a_width_c
                ] = image_a[
                    :img_a_height - img_a_height_c,
                    :img_a_width - img_a_width_c
                ]

            if img_b_height_c <= img_b_height and img_b_width_c <= img_b_width:
                container_b[
                    images_b_y:img_b_height + images_b_y - img_b_height_c,
                    images_b_x:img_b_width + images_b_x - img_b_width_c
                ] = image_b[
                    :img_b_height - img_b_height_c,
                    :img_b_width - img_b_width_c
                ]

            if background == "images_a":
                return ImageF.alpha_composite(
                    container_a.tensor_to_image(),
                    container_b.tensor_to_image()
                ).image_to_tensor()
            else:
                return ImageF.alpha_composite(
                    container_b.tensor_to_image(),
                    container_a.tensor_to_image()
                ).image_to_tensor()

        if method == "pair":
            if len(images_a) != len(images_b):
                raise ValueError("Size of image_a and image_b not equals for pair batch type.")

            return (torch.stack([
                composite(images_a[i], images_b[i]) for i in range(len(images_a))
            ]),)
        elif method == "matrix":
            return (torch.stack([
                composite(images_a[i], images_b[j]) for i in range(len(images_a)) for j in range(len(images_b))
            ]),)

        return None

```
