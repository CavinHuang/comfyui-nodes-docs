---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Crop Image Pipe (JPS)
## Documentation
- Class name: `Crop Image Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The Crop Image Pipe node is designed to process image cropping settings, applying specified cropping positions, offsets, and interpolation methods to images. It abstracts the complexity of image cropping operations, enabling users to define how images should be cropped and resized for further processing or visualization.
## Input types
### Required
- **`cropimage_settings`**
    - Specifies the settings for cropping an image, including the positions, offsets, and interpolation method to be used. This parameter is crucial for determining how the image will be cropped and resized, affecting the final output.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[str, int, str, int, str]`
## Output types
- **`source_crop_pos`**
    - Comfy dtype: `COMBO[STRING]`
    - The position from which the source image should be cropped.
    - Python dtype: `str`
- **`source_crop_offset`**
    - Comfy dtype: `INT`
    - The offset applied to the source image cropping position.
    - Python dtype: `int`
- **`support_crop_pos`**
    - Comfy dtype: `COMBO[STRING]`
    - The position from which the support image should be cropped.
    - Python dtype: `str`
- **`support_crop_offset`**
    - Comfy dtype: `INT`
    - The offset applied to the support image cropping position.
    - Python dtype: `int`
- **`crop_intpol`**
    - Comfy dtype: `COMBO[STRING]`
    - The interpolation method used for cropping the image.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CropImage_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cropimage_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = (["center","top", "bottom", "left", "right"],"INT",["center","top", "bottom", "left", "right"],"INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],)
    RETURN_NAMES = ("source_crop_pos", "source_crop_offset", "support_crop_pos", "support_crop_offset", "crop_intpol",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,cropimage_settings):
        
        source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol = cropimage_settings

        return(source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol,)

```
