
# Documentation
- Class name: ImageTransformCropAbsolute
- Category: image/transform
- Output node: False

ImageTransformCropAbsolute节点对一批图像执行绝对裁剪操作，根据指定的绝对像素坐标将图像裁剪为特定的矩形大小。它旨在通过移除不需要的外部部分来精确调整图像尺寸，从而聚焦于特定区域。

# Input types
## Required
- images
    - 需要裁剪的图像批次。这个参数至关重要，因为它直接影响输出，决定了哪些图像将undergo裁剪过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- start_x
    - 裁剪的起始x坐标（包含），定义裁剪矩形的左边界。它决定了从图像左侧移除多少部分。
    - Comfy dtype: INT
    - Python dtype: int
- start_y
    - 裁剪的起始y坐标（包含），定义裁剪矩形的上边界。它影响将被裁剪掉的图像顶部部分。
    - Comfy dtype: INT
    - Python dtype: int
- end_x
    - 裁剪的结束x坐标（不包含），定义裁剪矩形的右边界。它指定了裁剪后图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- end_y
    - 裁剪的结束y坐标（不包含），定义裁剪矩形的下边界。它指定了裁剪后图像的高度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 裁剪后的图像，通过移除定义的矩形区域外的部分来调整到指定尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "start_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "start_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "end_x": ("INT", {
                    "default": 128,
                    "step": 1
                }),
                "end_y": ("INT", {
                    "default": 128,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, start_x, start_y, end_x, end_y):
        def resize_tensor(tensor):
            return tensor.tensor_to_image().crop([start_x, start_y, end_x, end_y]).image_to_tensor()

        return (torch.stack([
            resize_tensor(images[i]) for i in range(len(images))
        ]),)

```
