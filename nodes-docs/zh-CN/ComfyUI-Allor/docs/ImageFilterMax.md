
# Documentation
- Class name: ImageFilterMax
- Category: image/filter
- Output node: False

ImageFilterMax节点对图像应用最大值滤波，增强最亮的区域，可能有助于降噪或突出特征。

# Input types
## Required
- images
    - 指定要处理的图像，作为滤波操作的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- size
    - 决定滤波器核的大小，影响最大值滤波效果的程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出应用最大值滤波后的处理图像，突出最亮的区域。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMax:
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
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size):
        return applyImageFilter(images, ImageFilter.MaxFilter(int(size) + 1))

```
