# Documentation
- Class name: ImageBatchJoin
- Category: `image/batch`
- Output node: `False`

ImageBatchJoin是一个用于沿批次维度连接两个图像批次的节点，确保在连接之前，两个批次中的图像具有匹配的尺寸。它提供了一种机制，将来自不同来源或处理阶段的图像数据组合成单个批次进行进一步处理或分析。

## Input types
### Required
- **`images_a`**
    - 第一批次要连接的图像。这些图像必须与`images_b`中的图像具有相同的尺寸，以确保操作成功。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_b`**
    - 用于与第一批次连接的第二个批次的图像。这些图像的尺寸必须与`images_a`匹配，以便在不出现错误的情况下进行连接。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`

## Output types
### `image`
- Comfy dtype: `IMAGE`
- 连接后的图像批次，将`images_a`和`images_b`沿批次维度组合在一起。
- Python dtype: `torch.Tensor`

## Usage tips
- Infra type: `GPU`
- Common nodes: 未知

## Source code
```python
class ImageBatchJoin:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images_a, images_b):
        height_a, width_a, channels_a = images_a[0].shape
        height_b, width_b, channels_b = images_b[0].shape

        if height_a != height_b:
            raise ValueError("高度不匹配。images_a 和 images_b 的高度不同，您可以通过使用 ImageTransformResize 进行修复。")

        if width_a != width_b:
            raise ValueError("宽度不匹配。images_a 和 images_b 的宽度不同，您可以通过使用 ImageTransformResize 进行修复。")

        if channels_a != channels_b:
            raise ValueError("通道数不匹配。images_a 和 images_b 的通道数不同，您可以使用 AlphaChanel 模块添加或删除 alpha 通道。")

        return (torch.cat((images_a, images_b)),)

```