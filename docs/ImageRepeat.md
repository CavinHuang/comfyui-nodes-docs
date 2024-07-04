
# Documentation
- Class name: ImageRepeat
- Category: Art Venture/Utils
- Output node: False

ImageRepeat节点的设计目的是将给定图像复制指定次数，从而创建一批相同的图像。这个功能对于需要同一图像的多个实例进行批处理或增强的操作非常有用。

# Input types
## Required
- images
    - 指定要重复的图像。它对于定义将在整个批次中复制的基础图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- amount
    - 决定输入图像重复的次数。它直接影响输出批次的大小，允许灵活创建批次。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一批图像，每个图像都与输入图像相同，根据指定的数量重复。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - SetNode



## Source code
```python
class UtilRepeatImages:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "amount": ("INT", {"default": 1, "min": 1, "max": 1024}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "rebatch"

    def rebatch(self, images: torch.Tensor, amount):
        return (images.repeat(amount, 1, 1, 1),)

```
