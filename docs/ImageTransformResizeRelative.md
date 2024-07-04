
# Documentation
- Class name: ImageTransformResizeRelative
- Category: image/transform
- Output node: False

ImageTransformResizeRelative节点通过相对尺度因子动态调整图像尺寸，实现灵活的图像变换。这种方法可以在保持宽高比的同时，按比例调整图像大小。

# Input types
## Required
- images
    - 指定需要调整大小的图像，是变换过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- scale_width
    - 决定图像宽度的缩放比例，影响输出图像的整体尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_height
    - 决定图像高度的缩放比例，影响输出图像的整体尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- method
    - 指定用于调整大小的插值方法，影响调整后图像的质量和特性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 根据指定的宽度和高度相对缩放比例生成调整大小后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_width": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.1
                }),
                "scale_height": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, scale_width, scale_height, method):
        height, width = images[0, :, :, 0].shape

        width = int(width * scale_width)
        height = int(height * scale_height)

        return ImageTransformResizeAbsolute().node(images, width, height, method)

```
