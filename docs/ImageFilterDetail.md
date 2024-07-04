
# Documentation
- Class name: ImageFilterDetail
- Category: image/filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageFilterDetail节点用于对一组图像应用细节增强滤镜，以提高图像的视觉清晰度和定义。这个处理可以有效地增强图像的细节，使图像看起来更加清晰和精细。

# Input types
## Required
- images
    - 这是需要处理的图像集合。该输入对于将细节增强滤镜应用于集合中的每张图像至关重要。通过这个输入，用户可以批量处理多张图像，提高工作效率。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是经过细节增强处理后的图像。这些图像具有更高的清晰度和更丰富的细节，视觉效果得到显著提升。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterDetail:
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
        return applyImageFilter(images, ImageFilter.DETAIL)

```
