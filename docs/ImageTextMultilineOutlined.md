
# Documentation
- Class name: ImageTextMultilineOutlined
- Category: image/draw
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageTextMultilineOutlined节点专门用于创建支持多行文本和轮廓文字的图像。它允许对文本外观进行详细自定义，包括字体选择、对齐方式、大小、颜色和轮廓属性，以及文本在图像中的位置。

# Input types
## Required
- text
    - 文本参数允许输入要在图像上渲染的多行文本。它支持包含换行符以将文本分成多行，从而可以创建文本块或段落。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 字体参数指定用于文本的字体样式。它从可用字体列表中选择，允许对文本外观进行美学定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- align
    - 对齐参数决定了文本在图像中的水平对齐方式。它支持"左对齐"、"居中"和"右对齐"等选项，使文本能够根据设计要求进行定位。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- size
    - 大小参数控制文本的字体大小，允许调整文本在图像中的视觉突出度和可读性。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 红色参数指定文本颜色的红色分量，能够自定义文本的颜色外观。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 绿色参数指定文本颜色的绿色分量，有助于自定义文本的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 蓝色参数指定文本颜色的蓝色分量，允许微调文本的视觉颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_size
    - 轮廓大小参数指定文本轮廓的粗细，允许增强可见性和美学定制。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 轮廓红色参数定义文本轮廓颜色的红色分量，能够进一步自定义文本的轮廓外观。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 轮廓绿色参数定义文本轮廓颜色的绿色分量，有助于自定义轮廓的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 轮廓蓝色参数定义文本轮廓颜色的蓝色分量，允许对轮廓的视觉外观进行详细定制。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - alpha参数控制文本的不透明度，使文本能够以不同的透明度级别进行渲染。
    - Comfy dtype: FLOAT
    - Python dtype: float
- margin_x
    - margin_x参数指定文本周围的水平边距，影响文本相对于图像边缘的定位。
    - Comfy dtype: INT
    - Python dtype: int
- margin_y
    - margin_y参数指定文本周围的垂直边距，影响文本在图像中的垂直间距和定位。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 图像输出类型表示生成的带有渲染文本的图像，包括任何指定的轮廓和自定义设置。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageTextMultilineOutlined:
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

    def node(
            self, text, font, align, size, red, green, blue, outline_size, outline_red, outline_green, outline_blue,
            alpha, margin_x, margin_y
    ):
        font_path = folder_paths.get_full_path("fonts", font)
        font = ImageFont.truetype(font_path, size, encoding="unic")

        lines = text.split('\n').__len__()
        (_, top, _, _) = font.getbbox(text)

        canvas = Image.new("RGBA", (0, 0))
        draw = ImageDraw.Draw(canvas)
        text_size = draw.multiline_textbbox((0, 0), text, font)

        canvas = Image.new("RGBA", (
            text_size[2] + (margin_x + outline_size) * 2,
            text_size[3] - top + (margin_y + (outline_size * lines)) * 2
        ), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)

        draw.text(
            (margin_x + outline_size, margin_y + outline_size - top),
            text=text, fill=(red, green, blue, int(alpha * 255)),
            stroke_fill=(outline_red, outline_green, outline_blue, int(alpha * 255)),
            stroke_width=outline_size, font=font, align=align
        )

        return (canvas.image_to_tensor().unsqueeze(0),)

```
