
# Documentation
- Class name: ImageDrawArcByContainer
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageDrawArcByContainer节点用于在给定的图像容器上绘制弧形。它利用容器的尺寸和属性来精确绘制弧形，通过各种参数如尺寸、起始和结束点、颜色以及绘制方法来自定义输出效果。

# Input types
## Required
- container
    - 容器输入指定了要在其上绘制弧形的图像，提供绘图操作所需的基本尺寸和属性信息。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- size
    - 定义要在图像上绘制的弧形的粗细。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 弧形起点的x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start_y
    - 弧形起点的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_x
    - 弧形终点的x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_y
    - 弧形终点的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start
    - 弧形的起始角度。
    - Comfy dtype: INT
    - Python dtype: float
- end
    - 弧形的结束角度。
    - Comfy dtype: INT
    - Python dtype: float
- red
    - 弧形颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 弧形颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 弧形颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 弧形颜色的透明度。
    - Comfy dtype: FLOAT
    - Python dtype: int
- SSAA
    - 指定应用于弧形的超采样抗锯齿(SSAA)级别，用于提高视觉质量。
    - Comfy dtype: INT
    - Python dtype: bool
- method
    - 用于绘制弧形的方法，影响渲染技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个包含指定弧形的图像，反映了输入参数和修改的结果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawArcByContainer:
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
                "start": ("INT", {
                    "default": 0,
                    "max": 360,
                    "step": 1
                }),
                "end": ("INT", {
                    "default": 180,
                    "max": 360,
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
    def node(self, container, size, start_x, start_y, end_x, end_y, start, end, red, green, blue, alpha, SSAA, method):
        return ImageDrawArc().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            size,
            start_x,
            start_y,
            end_x,
            end_y,
            start,
            end,
            red,
            green,
            blue,
            alpha,
            SSAA,
            method
        )

```
