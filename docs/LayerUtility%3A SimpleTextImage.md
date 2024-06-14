# Documentation
- Class name: SimpleTextImage
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

从文字生成简单排版的图片以及遮罩。这个节点参考了[ZHO-ZHO-ZHO/ComfyUI-Text_Image-Composite](https://github.com/ZHO-ZHO-ZHO/ComfyUI-Text_Image-Composite)的部分功能和代码，感谢原作者。

*仅限输入image和mask, 如果强制接入其他类型输入，将导致节点错误。 **font文件夹在resource_dir.ini中定义，这个文件位于插件根目录下, 默认名字是resource_dir.ini.example, 初次使用这个文件需将文件后缀改为.ini。用文本编辑软件打开，找到“FONT_dir=”开头的这一行，编辑“=”之后为自定义文件夹路径名。这个文件夹里面所有的.ttf和.otf文件将在ComfyUI初始化时被收集并显示在节点的列表中。如果ini中设定的文件夹无效，将启用插件自带的font文件夹。

# Input types

## Required

- text
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

- font_file
    - 字体文件。
    - Comfy dtype: FONT_LIST
    - Python dtype: str

- align
    - 对齐方式。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str

- char_per_line
    - 每行字符数。
    - Comfy dtype: INT
    - Python dtype: int

- leading
    - 行距。
    - Comfy dtype: INT
    - Python dtype: int

- font_size
    - 字体大小。
    - Comfy dtype: INT
    - Python dtype: int

- text_color
    - 文本颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- stroke_width
    - 描边宽度。
    - Comfy dtype: INT
    - Python dtype: int

- stroke_color
    - 描边颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- x_offset
    - x偏移量。
    - Comfy dtype: INT
    - Python dtype: int

- y_offset
    - y偏移量。
    - Comfy dtype: INT
    - Python dtype: int

- width
    - 画面的宽度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 画面的高度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- size_as
    - 此处输入图像或遮罩，将按照其尺寸生成输出图像和遮罩。注意，此输入优先级高于下面的width和height。
    - Comfy dtype: ANY
    - Python dtype: torch.Tensor

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code

```python
class SimpleTextImage:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "text": ("STRING",{"default": "text", "multiline": True},
                ),
                "font_file": (FONT_LIST,),
                "align": (["center", "left", "right"],),
                "char_per_line": ("INT", {"default": 80, "min": 1, "max": 8096, "step": 1},),
                "leading": ("INT",{"default": 8, "min": 0, "max": 8096, "step": 1},),
                "font_size": ("INT",{"default": 72, "min": 1, "max": 2500, "step": 1},),
                "text_color": ("STRING", {"default": "#FFFFFF"},),
                "stroke_width": ("INT",{"default": 0, "min": 0, "max": 8096, "step": 1},),
                "stroke_color": ("STRING",{"default": "#FF8000"},),
                "x_offset": ("INT", {"default": 0, "min": 0, "max": 8096, "step": 1},),
                "y_offset": ("INT", {"default": 0, "min": 0, "max": 8096, "step": 1},),
                "width": ("INT", {"default": 512, "min": 1, "max": 8096, "step": 1},),
                "height": ("INT", {"default": 512, "min": 1, "max": 8096, "step": 1},),
            },
            "optional": {
                "size_as": (any, {}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    RETURN_NAMES = ("image", "mask",)
    FUNCTION = 'simple_text_image'
    CATEGORY = '😺dzNodes/LayerUtility'

    def simple_text_image(self, text, font_file, align, char_per_line,
                          leading, font_size, text_color,
                          stroke_width, stroke_color, x_offset, y_offset,
                          width, height, size_as=None
                          ):

        ret_images = []
        ret_masks = []
        if size_as is not None:
            if size_as.dim() == 2:
                size_as_image = torch.unsqueeze(mask, 0)
            if size_as.shape[0] > 0:
                size_as_image = torch.unsqueeze(size_as[0], 0)
            else:
                size_as_image = copy.deepcopy(size_as)
            width, height = tensor2pil(size_as_image).size
        font_path = FONT_DICT.get(font_file)
        (_, top, _, _) = ImageFont.truetype(font=font_path, size=font_size, encoding='unic').getbbox(text)
        font = cast(ImageFont.FreeTypeFont, ImageFont.truetype(font_path, font_size))
        if char_per_line == 0:
            char_per_line = int(width / font_size)
        paragraphs = text.split('\n')

        img_height = height  # line_height * len(lines)
        img_width = width  # max(font.getsize(line)[0] for line in lines)

        img = Image.new("RGBA", size=(img_width, img_height), color=(0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        y_text = y_offset + stroke_width
        for paragraph in paragraphs:
            lines = textwrap.wrap(paragraph, width=char_per_line, expand_tabs=False,
                                  replace_whitespace=False, drop_whitespace=False)
            for line in lines:
                width = font.getbbox(line)[2] - font.getbbox(line)[0]
                height = font.getbbox(line)[3] - font.getbbox(line)[1]
                # 根据 align 参数重新计算 x 坐标
                if align == "left":
                    x_text = x_offset
                elif align == "center":
                    x_text = (img_width - width) // 2
                elif align == "right":
                    x_text = img_width - width - x_offset
                else:
                    x_text = x_offset  # 默认为左对齐

                draw.text(
                    xy=(x_text, y_text),
                    text=line,
                    fill=text_color,
                    font=font,
                    stroke_width=stroke_width,
                    stroke_fill=stroke_color,
                    )
                y_text += height + leading
            y_text += leading * 2

        if size_as is not None:
            for i in size_as:
                ret_images.append(pil2tensor(img))
                ret_masks.append(image2mask(img.split()[3]))
        else:
            ret_images.append(pil2tensor(img))
            ret_masks.append(image2mask(img.split()[3]))

        log(f"{NODE_NAME} Processed.", message_type='finish')
        return (torch.cat(ret_images, dim=0),torch.cat(ret_masks, dim=0),)
```