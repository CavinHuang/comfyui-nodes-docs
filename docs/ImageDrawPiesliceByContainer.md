
# Documentation
- Class name: ImageDrawPiesliceByContainer
- Category: image/draw
- Output node: False

ImageDrawPiesliceByContainer节点专门用于在指定的图像容器内绘制饼图切片。它利用容器的尺寸来精确定位和缩放饼图切片，允许对切片的外观进行详细自定义，包括其轮廓和填充颜色、大小和角度。

# Input types
## Required
- container
    - 绘制饼图切片的图像容器。它定义了绘图操作的空间上下文。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- start_x
    - 容器内饼图切片的起始x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start_y
    - 容器内饼图切片的起始y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_x
    - 饼图切片的结束x坐标，定义其宽度。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_y
    - 饼图切片的结束y坐标，定义其高度。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start
    - 饼图切片的起始角度（以度为单位）。
    - Comfy dtype: INT
    - Python dtype: float
- end
    - 饼图切片的结束角度（以度为单位）。
    - Comfy dtype: INT
    - Python dtype: float
- outline_size
    - 饼图切片轮廓的粗细。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 轮廓颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 轮廓颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 轮廓颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 轮廓颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- fill_red
    - 饼图切片填充颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 饼图切片填充颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 饼图切片填充颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 饼图切片填充颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- SSAA
    - 超采样抗锯齿因子，用于平滑边缘。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 用于绘制饼图切片的方法，影响渲染质量和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 绘制了饼图切片的修改后的图像容器。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPiesliceByContainer:
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
                "start": ("INT", {
                    "default": 0,
                    "max": 360,
                    "step": 1
                }),
                "end": ("INT", {
                    "default": 240,
                    "max": 360,
                    "step": 1
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
            start,
            end,
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
        return ImageDrawPieslice().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            start_x,
            start_y,
            end_x,
            end_y,
            start,
            end,
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
