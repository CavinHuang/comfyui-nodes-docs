---
tags:
- AlphaChannel
- Image

# AlphaChanelRestore
## 文档说明
### 类名：`AlphaChanelRestore`
### 分类：`image/alpha`
### 输出节点：`False`

`AlphaChanelRestore` 节点旨在处理图像，确保所有图像都具有 alpha 通道。这一操作通过添加或恢复缺失的 alpha 通道来修复图像，对于需要保持图像数据一致性的工作流程至关重要，尤其是当处理要求图像具有相同数量通道的图像处理管道时。
## 输入类型
### 必需项
- **`images`**
    - `images` 输入表示要处理的一批图像。它对于确定哪些图像缺少 alpha 通道并随后添加一个以确保批次中的所有图像都有四个通道至关重要。
    - Comfy 数据类型：`IMAGE`
    - Python 数据类型：`torch.Tensor`

## 输出类型
- **`image`**
    - Comfy 数据类型：`IMAGE`
    - 输出是一批具有必要时添加的 alpha 通道的图像，确保所有图像都拥有四个通道。
    - Python 数据类型：`torch.Tensor`

## 使用提示
- 硬件类型：`GPU`
- 常用节点：未知

## 源代码
```python
class AlphaChanelRestore:
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
            return (images,) 

        tensor = images.clone().detach()

        tensor[:, :, :, 3] = torch.ones((batch, height, width))

        return (tensor,)
```