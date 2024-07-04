
# Documentation
- Class name: ImageDrawEllipse
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageDrawEllipse节点用于在图像上绘制椭圆。它允许用户自定义椭圆的外观，包括轮廓和填充颜色，以及椭圆在画布上的大小和位置。该节点利用超采样抗锯齿（SSAA）技术来实现更高质量的渲染效果。

# Input types
## Required
- width
    - 指定绘制椭圆的画布宽度，影响图像的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定画布高度，影响图像的垂直维度和椭圆的潜在大小。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 指定椭圆在图像上的起始x坐标，对定义椭圆位置至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 指定椭圆的起始y坐标，对椭圆在图像上的定位至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 定义椭圆的结束x坐标，决定其宽度并影响其整体形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 定义椭圆的结束y坐标，决定其高度并影响其整体形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- outline_size
    - 决定椭圆轮廓的粗细，影响椭圆在图像上的视觉突出程度。
    - Comfy dtype: INT
    - Python dtype: float
- outline_red
    - 指定椭圆轮廓颜色的红色分量，用于颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 指定椭圆轮廓颜色的绿色分量，用于颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 指定椭圆轮廓颜色的蓝色分量，用于颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 决定椭圆轮廓的不透明度，允许设置透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fill_red
    - 指定椭圆填充颜色的红色分量，用于填充颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 指定椭圆填充颜色的绿色分量，用于填充颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 指定椭圆填充颜色的蓝色分量，用于填充颜色自定义。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 决定椭圆填充的不透明度，允许在填充颜色中设置透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 指定应用的超采样抗锯齿（SSAA）级别，提高椭圆渲染的质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 定义绘制椭圆后调整图像大小的方法，影响最终图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 返回带有绘制椭圆的图像张量，展示根据输入参数自定义的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawEllipse:
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
        draw.ellipse(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
