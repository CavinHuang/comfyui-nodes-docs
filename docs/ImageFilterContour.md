
# Documentation
- Class name: ImageFilterContour
- Category: image/filter
- Output node: False

ImageFilterContour节点是一种图像处理工具，它能够为图像应用轮廓滤镜，增强图像边缘以创造出清晰的轮廓效果。这个节点主要用于那些旨在强调图像中物体边界和特征的图像处理任务。

# Input types
## Required
- images
    - images参数代表将要应用轮廓滤镜的图像集合。它是定义输入数据的关键，这些数据将undergo变换以突出边缘和特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是输入图像的修改版本。每张图像都经过处理以强调其轮廓，使边缘和特征更加突出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterContour:
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
        return applyImageFilter(images, ImageFilter.CONTOUR)

```
