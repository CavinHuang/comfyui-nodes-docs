
# Documentation
- Class name: ImageFilterRank
- Category: image/filter
- Output node: False

ImageFilterRank节点对一组图像应用秩滤波器，通过指定的秩和大小参数来增强或修改图像细节。该节点属于图像滤波类别，旨在通过应用特定的基于秩的滤波操作来处理图像。

# Input types
## Required
- images
    - 将要应用秩滤波器的图像集合。这个参数对于定义将要进行滤波处理的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 指定要应用的滤波器的大小。size参数影响滤波效果在图像上的作用范围。
    - Comfy dtype: INT
    - Python dtype: int
- rank
    - 决定在指定大小内滤波器的秩，影响应用于图像的滤波强度和类型。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是经过基于秩的滤波处理后的图像集合，展示了指定秩和大小参数对原始图像的滤波效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterRank:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {
                    "default": 2,
                    "min": 0,
                    "step": 2
                }),
                "rank": ("INT", {
                    "default": 1,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size, rank):
        return applyImageFilter(images, ImageFilter.RankFilter(int(size) + 1, rank))

```
