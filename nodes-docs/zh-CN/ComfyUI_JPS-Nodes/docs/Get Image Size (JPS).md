
# Documentation
- Class name: Get Image Size (JPS)
- Category: JPS Nodes/Image
- Output node: False

Get Image Size (JPS)节点旨在获取图像的尺寸信息,具体来说就是图像的宽度和高度。它将分析图像大小的过程抽象化,提供了一种简单直接的方式来获取这些基本属性。

# Input types
## Required
- image
    - 需要确定尺寸的图像。这个输入至关重要,因为它直接影响输出结果,提供了计算图像尺寸所需的必要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 输入图像的宽度,以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输入图像的高度,以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Get_Image_Size:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("width", "height",)
    CATEGORY = "JPS Nodes/Image"

    FUNCTION = 'get_imagesize'

    def get_imagesize(self, image):
        samples = image.movedim(-1,1)
        size_w = samples.shape[3]
        size_h = samples.shape[2]

        return (size_w, size_h, )

```
