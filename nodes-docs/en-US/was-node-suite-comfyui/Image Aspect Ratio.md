---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# Image Aspect Ratio
## Documentation
- Class name: `Image Aspect Ratio`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node calculates the aspect ratio of an image, determining whether it is landscape, portrait, or square based on its width and height. It provides both numerical and common aspect ratio formats, and identifies the image orientation.
## Input types
### Required
### Optional
- **`image`**
    - The image tensor for which the aspect ratio is to be calculated. If not provided, width and height must be specified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`width`**
    - The width of the image. Required if the image tensor is not provided.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Optional[int]`
- **`height`**
    - The height of the image. Required if the image tensor is not provided.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Optional[int]`
## Output types
- **`aspect_number`**
    - Comfy dtype: `NUMBER`
    - The numerical aspect ratio of the image.
    - Python dtype: `float`
- **`aspect_float`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the image's aspect ratio.
    - Python dtype: `float`
- **`is_landscape_bool`**
    - Comfy dtype: `NUMBER`
    - A boolean indicating if the image is in landscape orientation.
    - Python dtype: `bool`
- **`aspect_ratio_common`**
    - Comfy dtype: `STRING`
    - The aspect ratio in common format (e.g., '16:9').
    - Python dtype: `str`
- **`aspect_type`**
    - Comfy dtype: `STRING`
    - A string indicating the type of aspect ratio ('landscape', 'portrait', 'square').
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Image Input Switch](../../was-node-suite-comfyui/Nodes/Image Input Switch.md)



## Source code
```python
class WAS_Image_Aspect_Ratio:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "image": ("IMAGE",),
                "width": ("NUMBER",),
                "height": ("NUMBER",),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "NUMBER", TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ("aspect_number", "aspect_float", "is_landscape_bool", "aspect_ratio_common", "aspect_type")
    FUNCTION = "aspect"

    CATEGORY = "WAS Suite/Logic"

    def aspect(self, boolean=True, image=None, width=None, height=None):

        if width and height:
            width = width; height = height
        elif image is not None:
            width, height = tensor2pil(image).size
        else:
            raise Exception("WAS_Image_Aspect_Ratio must have width and height provided if no image tensori supplied.")

        aspect_ratio = width / height
        aspect_type = "landscape" if aspect_ratio > 1 else "portrait" if aspect_ratio < 1 else "square"

        landscape_bool = 0
        if aspect_type == "landscape":
            landscape_bool = 1

        gcd = math.gcd(width, height)
        gcd_w = width // gcd
        gcd_h = height // gcd
        aspect_ratio_common = f"{gcd_w}:{gcd_h}"

        return aspect_ratio, aspect_ratio, landscape_bool, aspect_ratio_common, aspect_type

```
