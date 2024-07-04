
# Documentation
- Class name: `ImageDrawPieslice`
- Category: `image/draw`
- Output node: `False`
- Repo Ref: ComfyUI_Custom_Nodes\imagetools\nodes.py

ImageDrawPieslice节点的主要作用是在图像画布上绘制一个扇形。它可以自定义扇形的尺寸、起始和结束角度、轮廓以及填充颜色。这个节点为在图像中可视化表示数据部分或创建图形元素提供了一种方式。

# Input types
## Required
- width
    - 指定图像画布的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定图像画布的高度。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 扇形边界框左上角的x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 扇形边界框左上角的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 扇形边界框右下角的x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 扇形边界框右下角的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start
    - 扇形的起始角度，以度为单位。
    - Comfy dtype: INT
    - Python dtype: float
- end
    - 扇形的结束角度，以度为单位。
    - Comfy dtype: INT
    - Python dtype: float
- outline_size
    - 扇形轮廓的粗细。
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
    - Python dtype: float
- fill_red
    - 填充颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_green
    - 填充颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_blue
    - 填充颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- fill_alpha
    - 填充颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 超采样抗锯齿因子，用于提高渲染质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 绘制扇形后用于调整图像大小的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出为包含绘制扇形的图像张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPieslice:
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(
            self,
            width,
            height,
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
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.pieslice(
            (
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ),
            start, end,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
