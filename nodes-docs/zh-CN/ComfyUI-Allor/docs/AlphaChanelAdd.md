# Documentation
- Class name: AlphaChanelAdd
- Category: `image/alpha`
- Output node: False

AlphaChanelAdd节点旨在为缺少alpha通道的图像添加一个，确保批次中的所有图像都有四个通道。此操作对于在需要透明度或其它效果的图像处理任务中保持数据一致性至关重要。

## Input types
### Required
- **`images`**
    - 'images'参数表示将要添加alpha通道的一批图像。这是节点操作的关键决定因素，因为它确定了需要修改的输入图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: torch.Tensor

## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - 输出是输入图像的修改版本，每个图像都添加了一个alpha通道，确保所有图像都有四个通道。
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: GPU
- Common nodes:
    - [SplitImageWithAlpha](../../Comfy/Nodes/SplitImageWithAlpha.md)

## Source code
```python
class AlphaChanelAdd:
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
    CATEGORY = "image/alpha"

    def node(self, images):
        batch, height, width, channels = images.shape

        if channels == 4:
            return images

        alpha = torch.ones((batch, height, width, 1))

        return (torch.cat((images, alpha), dim=-1),)
```