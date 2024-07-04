
# Documentation
- Class name: ImageDrawChordByContainer
- Category: image/draw
- Output node: False

ImageDrawChordByContainer节点用于在指定的容器图像内绘制弦。它通过使用大小、起始和结束坐标、颜色以及绘图方法等参数来定义弦的外观。

# Input types
## Required
- container
    - 作为绘制弦的画布，这个容器图像是弦将被绘制的基础。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- size
    - 指定在容器内绘制的弦的大小。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 弦在容器内的起始x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start_y
    - 弦在容器内的起始y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_x
    - 弦在容器内的结束x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- end_y
    - 弦在容器内的结束y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: int
- start
    - 弦的起始角度（以度为单位）。
    - Comfy dtype: INT
    - Python dtype: float
- end
    - 弦的结束角度（以度为单位）。
    - Comfy dtype: INT
    - Python dtype: float
- red
    - 弦颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 弦颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 弦颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 弦颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: int
- SSAA
    - 指定超采样抗锯齿因子，用于提高绘图质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 用于绘制弦的方法，影响渲染技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 在指定容器内绘制了弦的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawChordByContainer:
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
        return ImageDrawChord().node(
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
