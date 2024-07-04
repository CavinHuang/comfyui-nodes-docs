
# Documentation
- Class name: ImageFilterSmoothMore
- Category: image/filter
- Output node: False

ImageFilterSmoothMore节点应用更强烈的平滑滤镜处理图像,将图像的视觉柔和度提升到基本平滑级别之上。

# Input types
## Required
- images
    - 指定需要应用增强平滑滤镜处理的图像,目的是提高其视觉柔和度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 返回经过增强平滑处理的图像,呈现出更加柔和的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterSmoothMore:
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
        return applyImageFilter(images, ImageFilter.SMOOTH_MORE)

```
