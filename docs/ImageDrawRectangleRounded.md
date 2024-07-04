
# Documentation
- Class name: `ImageDrawRectangleRounded`
- Category: `image/draw`
- Output node: `False`

ImageDrawRectangleRounded节点用于在图像上绘制圆角矩形。它允许对矩形的外观进行详细定制，包括大小、边框颜色、填充颜色和角半径，从而创建具有圆角的视觉吸引力图形。

# Input types
## Required
- **`width`**
    - 绘制圆角矩形的画布宽度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - 绘制圆角矩形的画布高度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - 矩形起点的x坐标，定义矩形在x轴上的位置。
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start_y`**
    - 矩形起点的y坐标，定义矩形在y轴上的位置。
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_x`**
    - 矩形终点的x坐标，决定矩形的宽度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_y`**
    - 矩形终点的y坐标，决定矩形的高度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`radius`**
    - 角的半径，指定圆角的程度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_size`**
    - 矩形轮廓的粗细，用于自定义边框的外观。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - 轮廓颜色的红色分量，影响矩形边框的整体颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - 轮廓颜色的绿色分量，影响矩形边框的整体颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - 轮廓颜色的蓝色分量，影响矩形边框的整体颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - 轮廓的透明度值，用于调整边框的不透明度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - 矩形填充颜色的红色分量，决定矩形内部的主要颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - 矩形填充颜色的绿色分量，决定矩形内部的主要颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - 矩形填充颜色的蓝色分量，决定矩形内部的主要颜色。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - 填充的透明度值，用于调整矩形内部的不透明度。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`top_left_corner`**
    - 指示左上角是否应为圆角的标志。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`top_right_corner`**
    - 指示右上角是否应为圆角的标志。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`bottom_right_corner`**
    - 指示右下角是否应为圆角的标志。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`bottom_left_corner`**
    - 指示左下角是否应为圆角的标志。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`SSAA`**
    - 超级采样抗锯齿因子，通过减少锯齿效应来提高绘图质量。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - 用于调整图像大小的方法，影响最终输出的质量。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`

# Output types
- **`image`**
    - 带有绘制的圆角矩形的输出图像，展示了应用的自定义效果。
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangleRounded:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
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
            width,
            height,
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
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle(
            (
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ),
            radius * SSAA,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA,
            corners=(
                True if top_left_corner == "true" else False,
                True if top_right_corner == "true" else False,
                True if bottom_right_corner == "true" else False,
                True if bottom_left_corner == "true" else False
            )
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
