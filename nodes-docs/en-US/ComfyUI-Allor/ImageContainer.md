---
tags:
- Image
- ImageTransformation
---

# ImageContainer
## Documentation
- Class name: `ImageContainer`
- Category: `image/container`
- Output node: `False`

The ImageContainer node is designed to create a container image with specified dimensions and background color. It primarily serves the purpose of generating a base image layer, which can be further manipulated or used as a background in image processing tasks.
## Input types
### Required
- **`width`**
    - Specifies the width of the container image to be created. It determines the horizontal dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the container image to be created. It determines the vertical dimension of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - Defines the red component of the background color of the container image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - Defines the green component of the background color of the container image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - Defines the blue component of the background color of the container image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - Specifies the opacity level of the background color of the container image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor representation of the container image with the specified dimensions and background color.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {
                    "default": 512,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 512,
                    "min": 1,
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
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, width, height, red, green, blue, alpha):
        return (create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor().unsqueeze(0),)

```
