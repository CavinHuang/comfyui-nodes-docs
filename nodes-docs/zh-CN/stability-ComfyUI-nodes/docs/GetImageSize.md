
# Documentation
- Class name: GetImageSize
- Category: stability/image
- Output node: False

这个节点旨在通过分析图像的形状来确定图像的尺寸,具体是其宽度和高度。

# Input types
## Required
- image
    - 需要确定尺寸的图像。这个输入对于计算图像尺寸至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 输入图像的宽度,从其形状中派生。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输入图像的高度,从其形状中派生。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - Reroute



## Source code
```python
class GetImageSize:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")

    FUNCTION = "get_size"

    CATEGORY = "stability/image"

    def get_size(self, image):
        _, height, width, _ = image.shape
        return (width, height)

```
