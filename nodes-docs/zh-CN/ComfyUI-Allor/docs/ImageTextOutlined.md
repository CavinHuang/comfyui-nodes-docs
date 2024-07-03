
# Documentation
- Class name: ImageTextOutlined
- Category: image/draw
- Output node: False

ImageTextOutlined节点用于创建带有轮廓的文本图像。它允许用户自定义文本的外观，包括字体、大小、颜色和轮廓属性，以及文本在图像中的位置。这个节点特别适用于在图像上添加视觉上清晰可辨的文本，可应用于图形设计、水印或内容创作等多种场景。

# Input types
## Required
- text
    - 要渲染到图像上的文本。这个参数至关重要，因为它定义了生成图像的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 指定用于文本的字体。这个参数影响图像中文本的风格和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- size
    - 决定文本的字体大小，影响其在图像中的可见度和占用空间。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - 文本颜色的红色分量，用于自定义文本颜色。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 文本颜色的绿色分量，用于调整文本的颜色。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 文本颜色的蓝色分量，用于定制文本的外观。
    - Comfy dtype: INT
    - Python dtype: int
- outline_size
    - 指定文本轮廓的粗细，增强文本在复杂背景下的可见度。
    - Comfy dtype: INT
    - Python dtype: int
- outline_red
    - 轮廓颜色的红色分量，用于自定义轮廓颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_green
    - 轮廓颜色的绿色分量，用于调整轮廓的颜色。
    - Comfy dtype: INT
    - Python dtype: int
- outline_blue
    - 轮廓颜色的蓝色分量，用于定制轮廓的外观。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - 控制文本的不透明度，允许创建半透明的文本效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- margin_x
    - 文本到图像水平边缘的边距，影响文本的水平定位。
    - Comfy dtype: INT
    - Python dtype: int
- margin_y
    - 文本到图像垂直边缘的边距，影响文本在图像中的垂直位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个图像张量，其中包含渲染的指定文本，包括文本周围的轮廓效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTextOutlined:
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
            self, text, font, size, red, green, blue, outline_size, outline_red, outline_green, outline_blue, alpha,
            margin_x, margin_y
    ):
        font_path = folder_paths.get_full_path("fonts", font)
        font = ImageFont.truetype(font_path, size, encoding="unic")

        (left, top, right, bottom) = font.getbbox(text)

        canvas = Image.new("RGBA", (
            right + (margin_x + outline_size) * 2,
            bottom - top + (margin_y + outline_size) * 2
        ), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)

        draw.text(
            (margin_x + outline_size, margin_y + outline_size - top),
            text=text, fill=(red, green, blue, int(alpha * 255)),
            stroke_fill=(outline_red, outline_green, outline_blue, int(alpha * 255)),
            stroke_width=outline_size, font=font
        )

        return (canvas.image_to_tensor().unsqueeze(0),)

```
