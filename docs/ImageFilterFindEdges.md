
# Documentation
- Class name: ImageFilterFindEdges
- Category: image/filter
- Output node: False

ImageFilterFindEdges节点对一组图像应用边缘检测滤镜，突出显示每张图像中的边缘。这个处理过程增强了边界和线条的视觉区分度，使得更容易识别形状和特征。

# Input types
## Required
- images
    - images参数代表将要应用边缘检测滤镜的图像集合。它对于定义将要进行转换的输入数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是一组经过边缘检测滤镜处理的图像，其中边缘和线条的可见度得到了增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterFindEdges:
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
        return applyImageFilter(images, ImageFilter.FIND_EDGES)

```
