
# Documentation
- Class name: ImageDrawRectangleByContainer
- Category: image/draw
- Output node: False

ImageDrawRectangleByContainer 节点用于在指定的容器内绘制矩形，可精确控制矩形的尺寸和样式。通过指定起始点和终点，以及颜色和样式属性，该节点能够在图像中创建图形元素。

# Input types
## Required
- container
    - 用于绘制矩形的容器，定义了绘图操作的边界和上下文。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- start_x
    - 矩形的起始 x 坐标，标记矩形水平边界的起点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 矩形的起始 y 坐标，标记矩形垂直边界的起点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 矩形的结束 x 坐标，定义矩形水平边界的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 矩形的结束 y 坐标，定义矩形垂直边界的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- outline_size
    - 指定矩形轮廓的粗细，用于自定义矩形边框。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 轮廓颜色的红色分量，contributes to 矩形边框的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 轮廓颜色的绿色分量，contributes to 矩形边框的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 轮廓颜色的蓝色分量，contributes to 矩形边框的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 轮廓颜色的透明度分量，用于矩形边框的透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fill_red
    - 矩形填充颜色的红色分量，决定矩形内部的主要颜色。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 矩形填充颜色的绿色分量，决定矩形内部的主要颜色。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 矩形填充颜色的蓝色分量，决定矩形内部的主要颜色。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 矩形填充颜色的透明度分量，用于矩形内部的透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 指定超采样抗锯齿因子，通过减少锯齿效果来提高图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 定义用于绘图操作的方法，影响渲染质量和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - Comfy dtype: IMAGE
    - 在指定容器内绘制了矩形的结果图像，反映了所有指定的样式和尺寸。
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangleByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "start_x": ("FLOAT", {
                    "default": 0.1,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.2,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 0.9,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 0.8,
                    "max": 1.0,
                    "step": 0.01
                }),
                "outline_size": ("INT", {
                    "default": 1,
                    "step": 1
                }),
                "outline_red": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_green": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_blue": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_alpha": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "fill_red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_alpha": ("FLOAT", {
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
    def node(
            self,
            container,
            start_x,
            start_y,
            end_x,
            end_y,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            SSAA,
            method
    ):
        return ImageDrawRectangle().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            start_x,
            start_y,
            end_x,
            end_y,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            SSAA,
            method
        )

```
