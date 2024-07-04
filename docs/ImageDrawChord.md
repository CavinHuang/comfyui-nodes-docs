
# Documentation
- Class name: ImageDrawChord
- Category: image/draw
- Output node: False

ImageDrawChord节点专门用于在图像上绘制弦。它利用几何和颜色参数在指定的图像画布上渲染弦（即圆周的一部分），从而增强图像的定制和操作能力。

# Input types
## Required
- width
    - 指定绘制弦的图像画布宽度，决定绘图区域的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定绘制弦的图像画布高度，决定绘图区域的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- size
    - 定义弦的轮廓厚度，允许调整弦在图像中的视觉突出程度。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 弦的起始x坐标，标记弦在图像画布上的一个端点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 弦的起始y坐标，标记弦在图像画布上的一个端点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 弦的结束x坐标，标记弦在图像画布上的另一个端点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 弦的结束y坐标，标记弦在图像画布上的另一个端点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start
    - 弦的起始角度（以度为单位），定义弧段的开始。
    - Comfy dtype: INT
    - Python dtype: int
- end
    - 弦的结束角度（以度为单位），定义弧段的结束。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 弦的红色分量，contributes to 构成弦的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 弦的绿色分量，contributes to 构成弦的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 弦的蓝色分量，contributes to 构成弦的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 弦的alpha（透明度）分量，允许调整不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 指定超级采样抗锯齿因子，通过减少锯齿效应来增强弦的视觉质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 决定绘制弦后使用的调整大小方法，影响最终图像的视觉质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一个带有绘制弦的图像张量，展示了应用于原始图像的视觉修改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawChord:
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
        draw.chord(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            start, end, (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
