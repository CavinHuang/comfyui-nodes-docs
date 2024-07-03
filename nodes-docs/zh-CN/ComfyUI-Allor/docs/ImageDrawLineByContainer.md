
# Documentation
- Class name: ImageDrawLineByContainer
- Category: image/draw
- Output node: False

ImageDrawLineByContainer节点旨在通过指定起点和终点、颜色以及其他绘图参数在图像上绘制线条。它抽象了图像操作的复杂性，使得在图像处理工作流程中轻松集成线条绘制功能成为可能。

# Input types
## Required
- container
    - container参数代表将在其上绘制线条的图像数据。它对确定线条绘制的尺寸和画布至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- size
    - 指定要在图像上绘制的线条粗细。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 线条的起始x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start_y
    - 线条的起始y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_x
    - 线条的结束x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_y
    - 线条的结束y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- red
    - 线条颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 线条颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 线条颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 线条颜色的alpha（透明度）分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- SSAA
    - 指定超采样抗锯齿因子，以提高线条绘制的质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 确定用于线条渲染的绘制方法或算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个带有指定线条的图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawLineByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "size": ("INT", {
                    "default": 1,
                    "min": 1,
                    "step": 1
                }),
                "start_x": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
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
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "SSAA": ("INT", {
                    "default": 4,
                    "min": 1,
                    "max": 16,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/draw"

    # noinspection PyPep8Naming
    def node(self, container, size, start_x, start_y, end_x, end_y, red, green, blue, alpha, SSAA, method):
        return ImageDrawLine().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            size,
            start_x,
            start_y,
            end_x,
            end_y,
            red,
            green,
            blue,
            alpha,
            SSAA,
            method
        )

```
