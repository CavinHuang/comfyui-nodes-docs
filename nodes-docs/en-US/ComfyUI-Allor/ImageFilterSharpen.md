---
tags:
- ImageEnhancement
- VisualEffects
---

# ImageFilterSharpen
## Documentation
- Class name: `ImageFilterSharpen`
- Category: `image/filter`
- Output node: `False`

The ImageFilterSharpen node applies a sharpen filter to images, enhancing their details and making them appear more crisp and defined.
## Input types
### Required
- **`images`**
    - The images to be processed with the sharpen filter. This input is crucial for defining the visual content that will undergo enhancement to appear more defined and crisp.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed images after applying the sharpen filter, resulting in enhanced sharpness and detail.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImageExtended](../../save-image-extended-comfyui/Nodes/SaveImageExtended.md)
    - [PlaySound|pysssss](../../ComfyUI-Custom-Scripts/Nodes/PlaySound|pysssss.md)



## Source code
```python
class ImageFilterSharpen:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images):
        return applyImageFilter(images, ImageFilter.SHARPEN)

```
