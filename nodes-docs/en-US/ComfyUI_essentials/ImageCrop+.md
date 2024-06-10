---
tags:
- Crop
- Image
- ImageTransformation
---

# 🔧 Image Crop
## Documentation
- Class name: `ImageCrop+`
- Category: `essentials`
- Output node: `False`

The ImageCrop+ node is designed for cropping images to specified dimensions and coordinates, allowing for precise control over the portion of the image to be retained or discarded.
## Input types
### Required
- **`image`**
    - The image to be cropped, serving as the primary input for the cropping operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - Specifies the width of the cropped image area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the cropped image area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`position`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`x_offset`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`y_offset`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The cropped portion of the input image.
    - Python dtype: `torch.Tensor`
- **`x`**
    - Comfy dtype: `INT`
    - The x-coordinate of the top-left corner of the resulting cropped area, reflecting any adjustments made during the cropping process.
    - Python dtype: `int`
- **`y`**
    - Comfy dtype: `INT`
    - The y-coordinate of the top-left corner of the resulting cropped area, reflecting any adjustments made during the cropping process.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageSharpen](../../Comfy/Nodes/ImageSharpen.md)
    - SetNode
    - IPAdapterApply
    - Reroute
    - [DWPreprocessor](../../comfyui_controlnet_aux/Nodes/DWPreprocessor.md)
    - [LineArtPreprocessor](../../comfyui_controlnet_aux/Nodes/LineArtPreprocessor.md)
    - [MiDaS-DepthMapPreprocessor](../../comfyui_controlnet_aux/Nodes/MiDaS-DepthMapPreprocessor.md)
    - IPAdapterApplyFaceID



## Source code
```python
class ImageCrop:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "width": ("INT", { "default": 256, "min": 0, "max": MAX_RESOLUTION, "step": 8, }),
                "height": ("INT", { "default": 256, "min": 0, "max": MAX_RESOLUTION, "step": 8, }),
                "position": (["top-left", "top-center", "top-right", "right-center", "bottom-right", "bottom-center", "bottom-left", "left-center", "center"],),
                "x_offset": ("INT", { "default": 0, "min": -99999, "step": 1, }),
                "y_offset": ("INT", { "default": 0, "min": -99999, "step": 1, }),
            }
        }

    RETURN_TYPES = ("IMAGE","INT","INT",)
    RETURN_NAMES = ("IMAGE","x","y",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, width, height, position, x_offset, y_offset):
        _, oh, ow, _ = image.shape

        width = min(ow, width)
        height = min(oh, height)

        if "center" in position:
            x = round((ow-width) / 2)
            y = round((oh-height) / 2)
        if "top" in position:
            y = 0
        if "bottom" in position:
            y = oh-height
        if "left" in position:
            x = 0
        if "right" in position:
            x = ow-width

        x += x_offset
        y += y_offset

        x2 = x+width
        y2 = y+height

        if x2 > ow:
            x2 = ow
        if x < 0:
            x = 0
        if y2 > oh:
            y2 = oh
        if y < 0:
            y = 0

        image = image[:, y:y2, x:x2, :]

        return(image, x, y, )

```
