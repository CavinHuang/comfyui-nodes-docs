
# Documentation
- Class name: ImageFilterEdgeEnhanceMore
- Category: image/filter
- Output node: False

ImageFilterEdgeEnhanceMore节点应用边缘增强滤镜来强化图像中的边缘，使其更加突出。该节点是一系列图像滤镜节点中的一员，旨在通过应用特定的滤镜效果来修改和增强图像的视觉外观。

# Input types
## Required
- images
    - 需要应用边缘增强滤镜的图像。这个输入对于定义将要进行增强处理的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是经过边缘增强滤镜处理后的图像，其边缘更加突出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEdgeEnhanceMore:
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
        return applyImageFilter(images, ImageFilter.EDGE_ENHANCE_MORE)

```
