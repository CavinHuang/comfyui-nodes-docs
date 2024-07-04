
# Documentation
- Class name: ImageConcanate
- Category: KJNodes/image
- Output node: False

ImageConcanate节点旨在将两张图片按指定方向拼接，可选择调整第二张图片的尺寸以匹配第一张图片。这个功能对于创建合成图像或扩展现有图像的视觉上下文非常有用。

# Input types
## Required
- image1
    - 作为拼接基础的第一张图片。它在拼接过程中扮演基准图像的角色。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 要拼接到第一张图片上的第二张图片。如果指定，这张图片可以被调整大小以匹配第一张图片的尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- direction
    - 指定第二张图片将被拼接到第一张图片的方向。选项包括'right'（右）、'down'（下）、'left'（左）和'up'（上）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- match_image_size
    - 一个布尔标志，用于决定是否在拼接前将第二张图片的尺寸调整为与第一张图片相匹配。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 将第二张图片按指定方向拼接到第一张图片后的结果。这个输出是一张单一的合成图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageConcanate:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image1": ("IMAGE",),
            "image2": ("IMAGE",),
            "direction": (
            [   'right',
                'down',
                'left',
                'up',
            ],
            {
            "default": 'right'
             }),
            "match_image_size": ("BOOLEAN", {"default": False}),
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "concanate"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Concatenates the image2 to image1 in the specified direction.
"""

    def concanate(self, image1, image2, direction, match_image_size):
        if match_image_size:
            image2 = torch.nn.functional.interpolate(image2, size=(image1.shape[2], image1.shape[3]), mode="bilinear")
        if direction == 'right':
            row = torch.cat((image1, image2), dim=2)
        elif direction == 'down':
            row = torch.cat((image1, image2), dim=1)
        elif direction == 'left':
            row = torch.cat((image2, image1), dim=2)
        elif direction == 'up':
            row = torch.cat((image2, image1), dim=1)
        return (row,)

```
