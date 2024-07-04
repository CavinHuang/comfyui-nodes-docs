
# Documentation
- Class name: ImageFilterMode
- Category: image/filter
- Output node: False

ImageFilterMode节点应用模式滤波器处理图像。该滤波器会将每个像素的值替换为其指定大小邻域内最频繁出现的值，从而增强图像的均匀性或降低噪声。

# Input types
## Required
- images
    - 指定要处理的图像，作为模式滤波操作的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 确定计算模式时考虑的每个像素周围邻域的大小，影响滤波的程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 返回应用模式滤波器后的图像，展示增强的均匀性或降低的噪声。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMode:
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
        return applyImageFilter(images, ImageFilter.ModeFilter(int(size) + 1))

```
