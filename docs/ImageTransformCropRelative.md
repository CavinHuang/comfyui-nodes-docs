
# Documentation
- Class name: ImageTransformCropRelative
- Category: image/transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageTransformCropRelative 节点提供了基于相对位置裁剪图像的功能。它允许通过指定图像尺寸的分数作为起始和结束点来进行动态裁剪，从而实现灵活的图像操作，无需使用绝对像素值。

# Input types
## Required
- images
    - images 参数表示要裁剪的图像集合。它对定义将要进行裁剪操作的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- start_x
    - 指定裁剪操作的相对起始 x 坐标，表示为图像宽度的分数。它决定了裁剪的左边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 指定裁剪操作的相对起始 y 坐标，表示为图像高度的分数。它决定了裁剪的上边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 指定裁剪操作的相对结束 x 坐标，表示为图像宽度的分数。它决定了裁剪的右边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 指定裁剪操作的相对结束 y 坐标，表示为图像高度的分数。它决定了裁剪的下边界。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是输入图像的裁剪版本，根据指定的相对起始和结束坐标进行调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "start_x": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 0.75,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 0.75,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, start_x, start_y, end_x, end_y):
        height, width = images[0, :, :, 0].shape

        return ImageTransformCropAbsolute().node(
            images,
            width * start_x,
            height * start_y,
            width * end_x,
            height * end_y
        )

```
