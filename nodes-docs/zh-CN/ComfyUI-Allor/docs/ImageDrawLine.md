
# Documentation
- Class name: ImageDrawLine
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageDrawLine 节点用于在图像上绘制线条。它利用提供的尺寸和颜色规格在图像上的两点之间渲染一条线，支持通过线条粗细、颜色和抗锯齿设置等参数进行自定义。

# Input types
## Required
- width
    - 指定图像画布的宽度，对确定线条的绘制区域至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定图像画布的高度，对确定线条的绘制区域至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- size
    - 指定要绘制的线条的粗细，对线条在图像上的视觉效果起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- start_x
    - 线条的起始 x 坐标，标记图像上线条的一端。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 线条的起始 y 坐标，与 start_x 一起定义线条的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_x
    - 线条的结束 x 坐标，标记图像上线条的另一端。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_y
    - 线条的结束 y 坐标，与 end_x 一起定义线条的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- red
    - 线条的红色分量，构成绘制在图像上的线条的最终颜色。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 线条的绿色分量，构成绘制在图像上的线条的最终颜色。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 线条的蓝色分量，构成绘制在图像上的线条的最终颜色。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 线条颜色的 alpha（透明度）分量，允许在图像上绘制的线条产生透明效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SSAA
    - 线条的超采样抗锯齿因子，通过减少锯齿边缘来提高线条的视觉质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 绘制线条后用于调整图像大小的方法，影响线条的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 绘制了线条的修改后的图像，以张量形式返回。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawLine:
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
    def node(self, width, height, size, start_x, start_y, end_x, end_y, red, green, blue, alpha, SSAA, method):
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.line(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
