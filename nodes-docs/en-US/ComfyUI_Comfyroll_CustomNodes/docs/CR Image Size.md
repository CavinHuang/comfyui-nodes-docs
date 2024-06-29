---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# CR Image Size (Legacy)
## Documentation
- Class name: `CR Image Size`
- Category: `🧩 Comfyroll Studio/✨ Essential/💀 Legacy`
- Output node: `False`

The CR Image Size node is designed to adjust the dimensions of an image according to specified width, height, and upscale factor, providing a link to further help as part of its output. It serves as a utility for image preprocessing in creative projects, allowing for precise control over image size adjustments.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the image. This parameter allows users to define the width dimension to which the image should be resized, playing a crucial role in determining the final image size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the desired height of the image. This parameter is essential for setting the height dimension for the image resizing process, directly influencing the aspect ratio and overall appearance of the final image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_factor`**
    - Determines the factor by which the image should be upscaled. This parameter is key to enhancing the resolution of the image without altering its original width and height proportions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`Width`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`Height`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`upscale_factor`**
    - Comfy dtype: `FLOAT`
    - The factor by which the image has been upscaled.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the CR Image Size node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ImageSize:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 64, "max": 2048}),
                "height": ("INT", {"default": 512, "min": 64, "max": 2048}),
                "upscale_factor": ("FLOAT", {"default": 1, "min": 1, "max": 2000})
            }
        }
    RETURN_TYPES = ("INT", "INT", "FLOAT", "STRING", )
    RETURN_NAMES = ("Width", "Height", "upscale_factor", "show_help", )
    FUNCTION = "ImageSize"
    CATEGORY = icons.get("Comfyroll/Essential/Legacy")

    def ImageSize(self, width, height, upscale_factor):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-image-size"
        return(width, height, upscale_factor, show_help, )

```
