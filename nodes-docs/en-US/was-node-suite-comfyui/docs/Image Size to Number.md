---
tags:
- ImageSize
- ImageTransformation
---

# Image Size to Number
## Documentation
- Class name: `Image Size to Number`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

This node is designed to convert the dimensions of an image into numerical values, providing both integer and floating-point representations of the image's width and height.
## Input types
### Required
- **`image`**
    - The input image for which the width and height are to be determined and converted into numerical values.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width_num`**
    - Comfy dtype: `NUMBER`
    - The width of the image as a numerical value.
    - Python dtype: `int`
- **`height_num`**
    - Comfy dtype: `NUMBER`
    - The height of the image as a numerical value.
    - Python dtype: `int`
- **`width_float`**
    - Comfy dtype: `FLOAT`
    - The width of the image represented as a floating-point number.
    - Python dtype: `float`
- **`height_float`**
    - Comfy dtype: `FLOAT`
    - The height of the image represented as a floating-point number.
    - Python dtype: `float`
- **`width_int`**
    - Comfy dtype: `INT`
    - The width of the image represented as an integer.
    - Python dtype: `int`
- **`height_int`**
    - Comfy dtype: `INT`
    - The height of the image represented as an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Number Operation](../../was-node-suite-comfyui/Nodes/Number Operation.md)



## Source code
```python
class WAS_Image_Size_To_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("NUMBER", "NUMBER", "FLOAT", "FLOAT", "INT", "INT")
    RETURN_NAMES = ("width_num", "height_num", "width_float", "height_float", "width_int", "height_int")
    FUNCTION = "image_width_height"

    CATEGORY = "WAS Suite/Number/Operations"

    def image_width_height(self, image):
        image = tensor2pil(image)
        if image.size:
            return( image.size[0], image.size[1], float(image.size[0]), float(image.size[1]), image.size[0], image.size[1] )
        return ( 0, 0, 0, 0, 0, 0)

```
