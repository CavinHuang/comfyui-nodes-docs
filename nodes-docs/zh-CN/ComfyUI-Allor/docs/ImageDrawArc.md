
# Documentation
- Class name: ImageDrawArc
- Category: image/draw
- Output node: False

ImageDrawArc节点用于在图像上绘制弧线。它利用诸如尺寸、颜色和弧线具体参数等来直接在给定的图像画布上渲染弧线，便于创建图形表示和注释。

# Input types
## Required
- width
    - 指定将绘制弧线的图像画布的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定将绘制弧线的图像画布的高度。
    - Comfy dtype: INT
    - Python dtype: int
- size
    - 决定弧线的粗细。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 弧线在图像画布上的起始x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 弧线在图像画布上的起始y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 弧线在图像画布上的结束x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 弧线在图像画布上的结束y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start
    - 弧线的起始角度。
    - Comfy dtype: INT
    - Python dtype: float
- end
    - 弧线的结束角度。
    - Comfy dtype: INT
    - Python dtype: float
- red
    - 弧线颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 弧线颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 弧线颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 弧线颜色的透明度分量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 超级采样抗锯齿因子，用于更高质量的渲染。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 绘制弧线后用于调整图像大小的方法，影响最终图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 返回带有绘制弧线的图像张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawArc:
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(self, width, height, size, start_x, start_y, end_x, end_y, start, end, red, green, blue, alpha, SSAA, method):
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.arc(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            start, end, (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
