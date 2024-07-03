
# Documentation
- Class name: DF_Get_image_size
- Category: Derfuu_Nodes/Functions
- Output node: False

该节点旨在计算并返回图像的尺寸，具体为图像的宽度和高度。它简化了处理图像数据结构的复杂性，提供了一种直接获取图像尺寸信息的简便方法。

# Input types
## Required
- image
    - 'image'参数至关重要，因为它代表了将用于确定尺寸的图像数据。这个参数直接影响节点计算和返回正确图像尺寸的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- WIDTH
    - 表示图像的宽度，以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int
- HEIGHT
    - 表示图像的高度，以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetImageSize:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("WIDTH", "HEIGHT")
    CATEGORY = TREE_FUNCTIONS

    FUNCTION = 'get_size'

    def get_size(self, image):
        size = sizes.get_image_size(image)
        return (size[0], size[1], )

```
