
# Documentation
- Class name: ImageDrawRectangle
- Category: image/draw
- Output node: False

ImageDrawRectangle 节点提供了在图像上绘制矩形的功能。它允许用户自定义矩形的尺寸、轮廓和填充属性，使用户能够为各种目的（如突出显示区域、创建边框或添加视觉注释）在图像上添加简单的几何形状。

# Input types
## Required
- width
    - 指定绘制矩形的画布宽度，影响图像的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定绘制矩形的画布高度，影响图像的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 指定矩形的起始 x 坐标，影响矩形绘制开始的水平位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 指定矩形的起始 y 坐标，影响矩形绘制开始的垂直位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 指定矩形的结束 x 坐标，决定矩形的水平范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 指定矩形的结束 y 坐标，决定矩形的垂直范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- outline_size
    - 确定矩形轮廓的粗细，允许自定义矩形边框的外观。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 指定轮廓颜色的红色分量，contributes to the overall color of the rectangle's border.
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 指定轮廓颜色的绿色分量，contributes to the overall color of the rectangle's border.
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 指定轮廓颜色的蓝色分量，contributes to the overall color of the rectangle's border.
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 指定轮廓颜色的 alpha（透明度）分量，允许控制矩形边框的不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fill_red
    - 指定填充颜色的红色分量，contributes to the overall color inside the rectangle.
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 指定填充颜色的绿色分量，contributes to the overall color inside the rectangle.
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 指定填充颜色的蓝色分量，contributes to the overall color inside the rectangle.
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 指定填充颜色的 alpha（透明度）分量，允许控制矩形内部颜色的不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 超级采样抗锯齿因子，通过减少锯齿效应来提高图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - method 参数指定调整图像大小时使用的重新缩放算法，影响最终输出的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是带有绘制矩形的图像张量，反映了对原始图像所做的修改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangle:
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(
            self,
            width,
            height,
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
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.rectangle(
            (
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ),
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
