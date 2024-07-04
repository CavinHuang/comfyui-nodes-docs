
# Documentation
- Class name: ImageEffectsNegative
- Category: image/effects
- Output node: False

ImageEffectsNegative节点通过反转颜色将图像转换为负片效果。这种效果是通过将每个颜色通道的值从最大可能值中减去来实现的，从而有效地反转了色谱，创造出一种摄影底片的效果。

# Input types
## Required
- images
    - 需要转换为负片形式的输入图像。这个参数对节点的操作至关重要，因为它直接影响效果的视觉呈现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 转换后的负片形式图像，每个颜色通道的值都被反转，产生摄影底片效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsNegative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects"

    def node(self, images):
        tensor = images.clone().detach()
        tensor[:, :, :, 0:3] = 1.0 - tensor[:, :, :, 0:3]

        return (tensor,)

```
