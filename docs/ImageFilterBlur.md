
# Documentation
- Class name: ImageFilterBlur
- Category: image/filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageFilterBlur节点通过指定的水平和垂直尺寸为图像应用简单的模糊效果。该节点旨在软化图像，通过平均定义的核心大小内的像素来减少细节和噪音。这种模糊处理可以用于多种目的，如减少图像噪声、创造柔和效果或为进一步的图像处理做准备。

# Input types
## Required
- images
    - 需要进行模糊处理的输入图像。这个参数对于定义将要应用模糊效果的源图像至关重要。它直接影响模糊操作的结果和效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size_x
    - 指定模糊核心的水平尺寸。这个尺寸决定了水平方向上模糊的程度。较大的值会产生更强的水平模糊效果。
    - Comfy dtype: INT
    - Python dtype: int
- size_y
    - 指定模糊核心的垂直尺寸。这个尺寸决定了垂直方向上模糊的程度。较大的值会产生更强的垂直模糊效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用模糊效果后的输出图像。这展示了对输入图像进行模糊处理的结果。输出的图像将保持原始图像的尺寸，但细节会根据指定的模糊参数被软化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y):
        return (cv2_layer(images, lambda x: cv2.blur(x, (size_x, size_y))),)

```
