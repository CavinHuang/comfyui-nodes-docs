
# Documentation
- Class name: ImageScaleDownBy
- Category: Art Venture/Utils
- Output node: False

ImageScaleDownBy节点用于按指定的缩放因子对图像进行缩小，同时保持原始图像的宽高比。它提供了一种简单直接的方法来降低图像的分辨率，这对于优化性能或为特定显示需求准备图像非常有用。

# Input types
## Required
- images
    - images参数代表要进行缩小的图像。它对于定义将要进行缩放处理的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- scale_by
    - scale_by参数指定图像将被缩小的比例因子。它直接影响输出图像的新尺寸，同时保持其宽高比。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是输入图像的缩小版本，其尺寸根据scale_by因子进行了调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageScaleDownBy(UtilImageScaleDown):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_by": (
                    "FLOAT",
                    {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_scale_down_by"

    def image_scale_down_by(self, images, scale_by):
        width = images.shape[2]
        height = images.shape[1]
        new_width = int(width * scale_by)
        new_height = int(height * scale_by)
        return self.image_scale_down(images, new_width, new_height, "center")

```
