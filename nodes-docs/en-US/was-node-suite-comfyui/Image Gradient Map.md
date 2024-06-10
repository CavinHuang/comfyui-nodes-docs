---
tags:
- Image
- VisualEffects
---

# Image Gradient Map
## Documentation
- Class name: `Image Gradient Map`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node applies a gradient map to an image, optionally flipping the gradient map horizontally. It transforms the input image by mapping its grayscale values to colors defined in the gradient map, creating a visually appealing effect that retains the original image's structure while altering its color scheme.
## Input types
### Required
- **`image`**
    - The original image to which the gradient map will be applied. It serves as the base for the transformation, dictating the structure of the output image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`gradient_image`**
    - The gradient map image that defines the color transformation. This image's colors are mapped to the grayscale values of the original image, determining the output image's color scheme.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`flip_left_right`**
    - A boolean flag indicating whether the gradient map should be flipped horizontally before being applied. This can alter the visual effect of the gradient mapping on the original image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after applying the gradient map to the original image. This output retains the structure of the original image but features the colors defined by the gradient map.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Gradient_Map:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "gradient_image": ("IMAGE",),
                "flip_left_right": (["false", "true"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_gradient_map"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_gradient_map(self, image, gradient_image, flip_left_right='false'):

        # Convert images to PIL
        image = tensor2pil(image)
        gradient_image = tensor2pil(gradient_image)

        # WAS Filters
        WTools = WAS_Tools_Class()

        image = WTools.gradient_map(image, gradient_image, (True if flip_left_right == 'true' else False))

        return (pil2tensor(image), )

```
