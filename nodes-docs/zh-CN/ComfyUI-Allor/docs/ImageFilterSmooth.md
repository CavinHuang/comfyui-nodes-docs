
# Documentation
- Class name: ImageFilterSmooth
- Category: image/filter
- Output node: False

ImageFilterSmooth节点应用平滑滤镜处理图像，通过减少噪点和细微瑕疵来提升图像视觉质量，同时不会显著改变图像内容。这种处理方式能有效增强图像的整体观感，使图像看起来更加柔和清晰。

# Input types
## Required
- images
    - 指定需要应用平滑滤镜的图像。这个参数的目的是为了通过减少噪点和细微瑕疵来改善图像的整体外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 返回经过平滑滤镜处理后的图像。处理后的图像噪点和细微瑕疵得到减少，视觉效果得到增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterSmooth:
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
        return applyImageFilter(images, ImageFilter.SMOOTH)

```
