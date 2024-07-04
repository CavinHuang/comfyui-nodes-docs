---
tags:
- AlphaChannel
- Image

# AlphaChanelAsMask
## 文档说明
### 类名：`AlphaChanelAsMask`
### 分类：`image/alpha`
### 输出节点：`False`

`AlphaChanelAsMask`节点用于处理图像以提取或反转其alpha通道，有效地将alpha通道转换为掩模。此操作允许通过方法参数自定义对图像透明度的操纵，支持标准和反转alpha通道提取。
## 输入类型
### 必需项
- **`images`**
    - `images` 参数表示要处理以提取或修改其透明度特性的输入图像。它决定了要提取或操作的图像中的透明部分。
    - Comfy dtype：`IMAGE`
    - Python dtype：`torch.Tensor`
- **`method`**
    - `method` 参数规定了alpha通道处理模式，允许进行标准的alpha通道提取或其反转。此选择影响结果掩模对透明度的表示方式。
    - Comfy dtype：`COMBO[STRING]`
    - Python dtype：`str`
## 输出类型
- **`mask`**
    - Comfy dtype：`MASK`
    - 输出是从输入图像的alpha通道中提取的掩模，可以代表直接的alpha通道或其反转，具体取决于选择的处理方法。
    - Python dtype：`torch.Tensor`

## 使用提示
- 硬件类型：`GPU`
- 常用节点：未知

## 源代码
```python
class AlphaChanelAsMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "method": (["default", "invert"],),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "node"
    CATEGORY = "image/alpha"

    def node(self, images, method):
        if images[0, 0, 0].shape[0] != 4:
            raise ValueError("Alpha chanel not exist.")

        if method == "default":
            return (1.0 - images[0, :, :, 3],)
        elif method == "invert":
            return (images[0, :, :, 3],)
        else:
            raise ValueError("Unexpected method.")
```