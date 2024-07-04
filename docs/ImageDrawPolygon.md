
# Documentation
- Class name: ImageDrawPolygon
- Category: image/draw
- Output node: False

ImageDrawPolygon节点用于在图像画布上绘制规则多边形。它允许自定义多边形的大小、边数、旋转角度、轮廓和填充颜色，包括透明度。该节点利用超采样技术实现高质量渲染，并支持不同的调整方法来修改最终图像大小。

# Input types
## Required
- size
    - 指定要绘制的多边形的大小，影响其高度和宽度。
    - Comfy dtype: INT
    - Python dtype: int
- sides
    - 确定正多边形的边数，定义其形状。
    - Comfy dtype: INT
    - Python dtype: int
- rotation
    - 设置多边形的旋转角度（以度为单位），允许调整方向。
    - Comfy dtype: INT
    - Python dtype: float
- outline_size
    - 定义多边形轮廓的粗细。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 指定轮廓颜色的红色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 指定轮廓颜色的绿色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 指定轮廓颜色的蓝色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- outline_alpha
    - 确定轮廓的透明度，允许半透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fill_red
    - 指定填充颜色的红色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 指定填充颜色的绿色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 指定填充颜色的蓝色分量，属于RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 确定填充的透明度，允许半透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 设置超采样抗锯齿因子，用于高质量渲染。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 选择绘制多边形后调整图像大小的方法，影响最终图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出带有绘制多边形的图像张量，可用于进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPolygon:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "size": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "sides": ("INT", {
                    "default": 5,
                    "min": 3,
                    "step": 1
                }),
                "rotation": ("INT", {
                    "default": 0,
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(
            self,
            size,
            sides,
            rotation,
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
        canvas = Image.new("RGBA", (size * SSAA, size * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.regular_polygon(
            (size * SSAA / 2, size * SSAA / 2, size * SSAA / 2),
            sides, rotation,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            # TODO: Uncomment after the release of PIL 9.6.0
            # outline_size * SSAA
        )

        canvas = canvas.resize((size, size), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
