
# Documentation
- Class name: ImageDrawEllipseByContainer
- Category: image/draw
- Output node: False

ImageDrawEllipseByContainer 节点用于在指定的容器内绘制椭圆。它通过位置、大小、颜色和抗锯齿等参数来自定义椭圆的外观。该节点简化了绘图操作的复杂性，为在图像中创建椭圆提供了一个简洁的接口。

# Input types
## Required
- container
    - 容器指定了椭圆将被绘制的图像或画布区域。它决定了绘图操作的边界和上下文。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- start_x
    - 椭圆的起始 x 坐标，定义其边界框的一个轴。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 椭圆的起始 y 坐标，定义其边界框的一个轴。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 椭圆的结束 x 坐标，定义其边界框的对应轴。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 椭圆的结束 y 坐标，定义其边界框的对应轴。
    - Comfy dtype: FLOAT
    - Python dtype: float
- outline_size
    - 指定椭圆轮廓的粗细。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 椭圆轮廓颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 椭圆轮廓颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 椭圆轮廓颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 椭圆轮廓颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- fill_red
    - 椭圆填充颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 椭圆填充颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 椭圆填充颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 椭圆填充颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- SSAA
    - 超采样抗锯齿因子，用于提高绘图质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 指定用于渲染椭圆的绘图方法或算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个包含在容器内绘制的指定椭圆的图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawEllipseByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
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
        return ImageDrawEllipse().node(
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
