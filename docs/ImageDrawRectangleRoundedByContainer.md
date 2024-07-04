
# Documentation
- Class name: `ImageDrawRectangleRoundedByContainer`
- Category: `image/draw`
- Output node: `False`

ImageDrawRectangleRoundedByContainer 节点专门用于在指定容器内绘制圆角矩形。它利用容器的尺寸来确定绘图区域，并允许对矩形的外观进行详细定制，包括其大小、边框、填充颜色和圆角程度。

# Input types
## Required
- **`container`**
    - 用于绘制圆角矩形的容器。它定义了绘图操作的边界和上下文。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- **`start_x`**
    - 矩形的起始 x 坐标，定义了形状的左边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`start_y`**
    - 矩形的起始 y 坐标，定义了形状的上边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`end_x`**
    - 矩形的结束 x 坐标，定义了形状的右边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`end_y`**
    - 矩形的结束 y 坐标，定义了形状的下边界。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`radius`**
    - 圆角的半径，决定了矩形corners的圆润程度。
    - Comfy dtype: INT
    - Python dtype: float
- **`outline_size`**
    - 矩形轮廓的粗细。
    - Comfy dtype: INT
    - Python dtype: float
- **`outline_red`**
    - 轮廓颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`outline_green`**
    - 轮廓颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`outline_blue`**
    - 轮廓颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`outline_alpha`**
    - 轮廓颜色的透明度（alpha）分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`fill_red`**
    - 矩形填充颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`fill_green`**
    - 矩形填充颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`fill_blue`**
    - 矩形填充颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: float
- **`fill_alpha`**
    - 矩形填充颜色的透明度（alpha）分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`top_left_corner`**
    - 指定左上角是否应该是圆角。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- **`top_right_corner`**
    - 指定右上角是否应该是圆角。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- **`bottom_right_corner`**
    - 指定右下角是否应该是圆角。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- **`bottom_left_corner`**
    - 指定左下角是否应该是圆角。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- **`SSAA`**
    - 超级采样抗锯齿因子，用于提高绘图质量。
    - Comfy dtype: INT
    - Python dtype: int
- **`method`**
    - 用于绘图的方法，影响渲染技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- **`image`**
    - 在指定容器内绘制了圆角矩形的结果图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangleRoundedByContainer:
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
                "radius": ("INT", {
                    "default": 180,
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
                "top_left_corner": (["true", "false"],),
                "top_right_corner": (["true", "false"],),
                "bottom_right_corner": (["true", "false"],),
                "bottom_left_corner": (["true", "false"],),
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

    # noinspection PyPep8Naming, PyUnresolvedReferences, PyArgumentList
    def node(
            self,
            container,
            start_x,
            start_y,
            end_x,
            end_y,
            radius,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            top_left_corner,
            top_right_corner,
            bottom_right_corner,
            bottom_left_corner,
            SSAA,
            method
    ):
        return ImageDrawRectangleRounded().image_draw_rounded(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            start_x,
            start_y,
            end_x,
            end_y,
            radius,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            top_left_corner,
            top_right_corner,
            bottom_right_corner,
            bottom_left_corner,
            SSAA,
            method
        )

```
