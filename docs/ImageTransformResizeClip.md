
# Documentation
- Class name: ImageTransformResizeClip
- Category: image/transform
- Output node: False

该节点用于在指定的最大和最小尺寸范围内调整图像大小，使用各种插值方法来保持图像质量。它能动态计算缩放比例，确保调整后的图像符合给定的约束条件，为图像调整大小提供了灵活的方法。

# Input types
## Required
- images
    - 需要调整大小的图像集合。这个参数至关重要，因为它直接影响输出，决定哪些图像会经过调整大小的处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- max_width
    - 调整大小操作的最大宽度约束。它为调整后图像的宽度设置了一个上限。
    - Comfy dtype: INT
    - Python dtype: int
- max_height
    - 调整大小操作的最大高度约束。它为调整后图像的高度设置了一个上限。
    - Comfy dtype: INT
    - Python dtype: int
- min_width
    - 调整大小操作的最小宽度约束。它确保调整后的图像宽度不会低于这个值。
    - Comfy dtype: INT
    - Python dtype: int
- min_height
    - 调整大小操作的最小高度约束。它确保调整后的图像高度不会低于这个值。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 用于调整大小的插值方法。这会影响调整过程的质量和算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 在指定的最大和最小尺寸范围内调整后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeClip:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "max_width": ("INT", {
                    "default": 1024,
                }),
                "max_height": ("INT", {
                    "default": 1024,
                }),
                "min_width": ("INT", {
                    "default": 0,
                }),
                "min_height": ("INT", {
                    "default": 0,
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, max_width, max_height, min_width, min_height, method):
        height, width = images[0, :, :, 0].shape

        if min_width >= max_width or min_height >= max_height:
            return (images,)

        scale_min = max(min_width / width, min_height / height)
        scale_max = min(max_width / width, max_height / height)

        scale = max(scale_min, scale_max)

        return ImageTransformResizeRelative().node(images, scale, scale, method)

```
