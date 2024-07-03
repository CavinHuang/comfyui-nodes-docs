
# Documentation
- Class name: ImageContainerInheritanceScale
- Category: image/container
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageContainerInheritanceScale节点旨在根据指定的宽度和高度缩放因子来调整图像大小。它不仅调整输入图像的尺寸，还通过后续节点应用额外的图像处理操作，如颜色调整。这个节点在图像预处理和后期处理中起着关键作用，能够灵活地调整图像尺寸并进行基本的颜色修正。

# Input types
## Required
- images
    - 需要进行缩放的输入图像。这个参数至关重要，因为它提供了缩放操作的原始数据。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- scale_width
    - 输入图像宽度的缩放因子。这直接影响最终图像的宽度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_height
    - 输入图像高度的缩放因子。这直接影响最终图像的高度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- red
    - 应用于图像的红色分量。这会影响输出图像的整体色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 应用于图像的绿色分量。这会影响输出图像的整体色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 应用于图像的蓝色分量。这会影响输出图像的整体色彩平衡。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 应用于图像的alpha（透明度）值。这决定了输出图像的不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: int
- method
    - 用于缩放和应用颜色调整的方法。这个参数决定了使用的具体算法或技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 节点的输出是一个或一组已经根据指定参数进行了缩放和颜色调整的图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceScale:
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
                "red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "alpha": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "method": (["single", "for_each"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images, scale_width, scale_height, red, green, blue, alpha, method):
        height, width = images[0, :, :, 0].shape

        width = int((width * scale_width) - width)
        height = int((height * scale_height) - height)

        return ImageContainerInheritanceAdd() \
            .node(images, width, height, red, green, blue, alpha, method)

```
