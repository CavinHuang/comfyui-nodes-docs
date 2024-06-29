---
tags:
- AlphaChannel
- Image

# AlphaChanelRemove
## 文档说明
### 类名：`AlphaChanelRemove`
### 分类：`image/alpha`
### 输出节点：`False`

`AlphaChanelRemove` 节点旨在处理图像并移除其 alpha 通道。此操作简化了图像数据，适用于不需要透明度的上下文，有效降低了图像维度以供进一步处理或显示。
## 输入类型
### 必需项
- **`images`**
    - `images` 输入表示将要从其中移除 alpha 通道的图像集合。这一操作对于准备不支持或无需透明度的环境中的图像至关重要。
    - Comfy 数据类型：`IMAGE`
    - Python 数据类型：`torch.Tensor`

## 输出类型
- **`image`**
    - Comfy 数据类型：`IMAGE`
    - 输出是输入图像的修改版本，移除了 alpha 通道，将每个图像的通道从四个减少到三个。
    - Python 数据类型：`torch.Tensor`

## 使用提示
- 硬件类型：`GPU`
- 常用节点：未知

## 源代码
```python
class AlphaChanelRemove:
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
        return (images[:, :, :, 0:3],)
```