
# Documentation
- Class name: ImageGridComposite2x2
- Category: KJNodes/image
- Output node: False

ImageGridComposite2x2节点旨在将四张输入图像拼接成一个2x2的网格，有效地创建一个以视觉结构化方式组合这些输入的复合图像。

# Input types
## Required
- image1
    - 第一张图像，将被放置在2x2网格的左上角。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 第二张图像，将被放置在2x2网格的右上角。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image3
    - 第三张图像，将被放置在2x2网格的左下角。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image4
    - 第四张图像，将被放置在2x2网格的右下角。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 将四张输入图像拼接成2x2网格后得到的复合图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageGridComposite2x2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image1": ("IMAGE",),
            "image2": ("IMAGE",),
            "image3": ("IMAGE",),
            "image4": ("IMAGE",),   
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compositegrid"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Concatenates the 4 input images into a 2x2 grid. 
"""

    def compositegrid(self, image1, image2, image3, image4):
        top_row = torch.cat((image1, image2), dim=2)
        bottom_row = torch.cat((image3, image4), dim=2)
        grid = torch.cat((top_row, bottom_row), dim=1)
        return (grid,)

```
