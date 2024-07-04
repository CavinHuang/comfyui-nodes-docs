
# Documentation
- Class name: ImageTextMultiline
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageTextMultiline节点用于在图像画布上渲染多行文本，支持自定义字体、对齐方式、大小、颜色和边距。它还支持为文本添加轮廓，以增强可视性和美观性。

# Input types
## Required
- text
    - text参数允许多行输入，可用于在图像上渲染段落或多行文本。它在定义要显示的内容方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 指定要用于文本的字体，影响渲染文本的样式和可读性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- align
    - 决定文本在图像中的对齐方式，可以是左对齐、居中或右对齐，影响文本的布局和呈现。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- size
    - 控制文本的字体大小，直接影响其可见性和在图像上占用的空间。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 定义文本颜色的红色分量，对文本的整体颜色构成有贡献。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 定义文本颜色的绿色分量，对文本的整体颜色构成有贡献。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 定义文本颜色的蓝色分量，对文本的整体颜色构成有贡献。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 控制文本的不透明度，可以调整文本的可见度和叠加效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- margin_x
    - 指定文本周围的水平边距，影响文本在图像中的定位。
    - Comfy dtype: INT
    - Python dtype: int
- margin_y
    - 指定文本周围的垂直边距，影响文本在图像中的定位。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 返回一个包含渲染文本的图像张量，可以进行进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageTextMultiline:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}),
                "font": (folder_paths.get_filename_list("fonts"),),
                "align": (["left", "center", "right"],),
                "size": ("INT", {
                    "default": 28,
                    "min": 1,
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
                "margin_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "margin_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/draw"

    def node(self, text, font, align, size, red, green, blue, alpha, margin_x, margin_y):
        outline_size = 0
        outline_red = 255
        outline_green = 255
        outline_blue = 255

        return ImageTextMultilineOutlined().node(
            text,
            font,
            align,
            size,
            red,
            green,
            blue,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            alpha,
            margin_x,
            margin_y
        )

```
