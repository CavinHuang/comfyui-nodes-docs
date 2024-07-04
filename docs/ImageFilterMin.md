
# Documentation
- Class name: ImageFilterMin
- Category: image/filter
- Output node: False

ImageFilterMin节点是一种图像处理工具，它通过应用最小值滤波器来增强图像的暗区域并可能减少噪声。该滤波器在由滤波器大小定义的邻域内选择最小像素值，这使其在需要减少高频噪声或强调较暗区域的图像处理任务中非常有用。

# Input types
## Required
- images
    - 指定要处理的图像。这个参数至关重要，因为它决定了最小值滤波器将应用于哪些输入，直接影响输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 定义每个像素周围考虑进行最小值滤波的邻域大小。较大的尺寸可能会导致更显著的平滑和降噪效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用最小值滤波器后处理得到的图像，这种处理强调了较暗的区域并减少了噪声。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMin:
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
        return applyImageFilter(images, ImageFilter.MinFilter(int(size) + 1))

```
