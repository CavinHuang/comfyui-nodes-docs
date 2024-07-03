
# Documentation
- Class name: ImageGridComposite3x3
- Category: KJNodes/image
- Output node: False

ImageGridComposite3x3节点设计用于将九张输入图像拼接成一个3x3的网格，有效地创建一个复合图像，以结构化布局展示所有输入。

# Input types
## Required
- image1
    - 将被放置在3x3网格左上角的第一张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 将被放置在3x3网格顶行，紧邻第一张图像的第二张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image3
    - 将被放置在3x3网格顶行，紧邻第二张图像的第三张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image4
    - 将被放置在3x3网格中间行，从左侧开始的第四张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image5
    - 3x3网格的中央图像，被其他八张图像包围。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image6
    - 将被放置在3x3网格中间行，紧邻第五张图像的第六张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image7
    - 将被放置在3x3网格底行，从左侧开始的第七张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image8
    - 将被放置在3x3网格底行，紧邻第七张图像的第八张图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image9
    - 将被放置在3x3网格右下角的第九张也是最后一张图像，完成整个复合图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 通过将九张输入图像拼接成3x3网格而形成的复合图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageGridComposite3x3:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image1": ("IMAGE",),
            "image2": ("IMAGE",),
            "image3": ("IMAGE",),
            "image4": ("IMAGE",),
            "image5": ("IMAGE",),
            "image6": ("IMAGE",),
            "image7": ("IMAGE",),
            "image8": ("IMAGE",),
            "image9": ("IMAGE",),     
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compositegrid"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Concatenates the 9 input images into a 3x3 grid. 
"""

    def compositegrid(self, image1, image2, image3, image4, image5, image6, image7, image8, image9):
        top_row = torch.cat((image1, image2, image3), dim=2)
        mid_row = torch.cat((image4, image5, image6), dim=2)
        bottom_row = torch.cat((image7, image8, image9), dim=2)
        grid = torch.cat((top_row, mid_row, bottom_row), dim=1)
        return (grid,)

```
