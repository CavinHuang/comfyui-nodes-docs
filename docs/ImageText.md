
# Documentation
- Class name: ImageText
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageText节点用于在图像画布上渲染文本，支持自定义字体、大小、颜色、对齐方式和边距。它允许创建具有指定样式和布局的基于文本的图像，包括轮廓文本的选项。这个节点对于在图像中添加标题、水印或其他文本元素特别有用，为图像处理和设计工作流程提供了灵活的文本渲染功能。

# Input types
## Required
- text
    - 要在图像上渲染的文本。它定义了图像的内容，是节点操作的核心。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 指定用于文本的字体样式，影响渲染文本的视觉外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- size
    - 文本的字体大小，决定了文本相对于图像的比例。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 文本的红色分量，是用于定义文本颜色的RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 文本的绿色分量，是文本颜色定义的RGBA颜色模型的一部分。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 文本的蓝色分量，完成文本颜色规格的RGB部分。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 文本和轮廓颜色的alpha（透明度）分量，允许调整不透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- margin_x
    - 水平边距大小，影响文本从图像左右边缘的定位。
    - Comfy dtype: INT
    - Python dtype: int
- margin_y
    - 垂直边距大小，影响文本从图像上下边缘的定位。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个带有渲染文本的图像张量，可以进行进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageText:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": False}),
                "font": (folder_paths.get_filename_list("fonts"),),
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

    def node(self, text, font, size, red, green, blue, alpha, margin_x, margin_y):
        outline_size = 0
        outline_red = 255
        outline_green = 255
        outline_blue = 255

        return ImageTextOutlined().node(
            text,
            font,
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
