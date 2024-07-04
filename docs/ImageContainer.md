
# Documentation
- Class name: ImageContainer
- Category: image/container
- Output node: False

ImageContainer节点用于创建具有指定尺寸和背景颜色的容器图像。它主要用于生成一个基础图像层，可以进一步对其进行操作或在图像处理任务中用作背景。

# Input types
## Required
- width
    - 指定要创建的容器图像的宽度。它决定了生成图像的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定要创建的容器图像的高度。它决定了生成图像的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 定义容器图像背景颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 定义容器图像背景颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 定义容器图像背景颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 指定容器图像背景颜色的不透明度级别。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是具有指定尺寸和背景颜色的容器图像的张量表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {
                    "default": 512,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 512,
                    "min": 1,
                    "step": 1
                }),
                "red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "alpha": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, width, height, red, green, blue, alpha):
        return (create_rgba_image(width, height, (red, green, blue, int(alpha * 255))).image_to_tensor().unsqueeze(0),)

```
