
# Documentation
- Class name: ImageFilterEmboss
- Category: image/filter
- Output node: False

ImageFilterEmboss节点对图像应用浮雕滤镜，通过突出边缘和纹理来创造三维效果。这种滤镜能增强图像的立体感，使其看起来像是凸起或凹陷的雕刻效果。

# Input types
## Required
- images
    - 需要应用浮雕滤镜的图像。这个输入对于定义将要进行变换的视觉内容至关重要。它是滤镜效果的基础，决定了最终浮雕效果的细节和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是经过浮雕效果处理后的图像，其纹理和边缘得到增强。这种处理后的图像通常会呈现出独特的立体感和质感，使原本平面的图像产生深度和层次感。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEmboss:
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
        return applyImageFilter(images, ImageFilter.EMBOSS)

```
