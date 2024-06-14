# Documentation
- Class name: TextJoin
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

从文字生成图片以及遮罩。支持字间距行间距调整，横排竖排调整，可设置文字的随机变化，包括大小和位置的随机变化。

*仅限输入image和mask, 如果强制接入其他类型输入，将导致节点错误。 **font文件夹在resource_dir.ini中定义，这个文件位于插件根目录下, 默认名字是resource_dir.ini.example, 初次使用这个文件需将文件后缀改为.ini。用文本编辑软件打开，找到“FONT_dir=”开头的这一行，编辑“=”之后为自定义文件夹路径名。这个文件夹里面所有的.ttf和.otf文件将在ComfyUI初始化时被收集并显示在节点的列表中。如果ini中设定的文件夹无效，将启用插件自带的font文件夹。*

# Input types

## Required

- text
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

- font_file
    - 这里列出了font文件夹中可用的字体文件列表，选中的字体文件将被用来生成图像。
    - Comfy dtype: STRING
    - Python dtype: str

- spacing
    - 字间距,以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int

- leading
    - 行间距,以像素为单位。
    - Comfy dtype: INT
    - Python dtype: int

- horizontal_border
    - 侧边边距。此处数值表示的是百分比，例如50表示起点位于两侧的正中央。如果文字是横排，是左侧边距，竖排则是右侧边距。
    - Comfy dtype: FLOAT
    - Python dtype: float

- vertical_border
    - 顶部边距。此处数值表示的是百分比，例如10表示起点位于距顶部10%的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float

- scale
    - 文字总体大小。文字的初始大小是根据画面尺寸和文字内容自动计算，默认以最长的行或者列适配画面宽或者高。调整此处数值将整体放大和缩小文字。此处数值表示的是百分比，例如60表示缩放到60%。
    - Comfy dtype: FLOAT
    - Python dtype: float

- variation_range
    - 字符随机变化范围。此数值大于0时，字符将产生大小和位置的随机变化，数值越大，变化幅度越大。
    - Comfy dtype: INT
    - Python dtype: int

- variation_seed
    - 随机变化的种子。固定此数值，每次产生的单个文字的变化不会改变。
    - Comfy dtype: INT
    - Python dtype: int

- layout
    - 文字排版。有横排和竖排可选择。
    - Comfy dtype: STRING
    - Python dtype: str

- width
    - 画面的宽度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 画面的高度。如果有size_as输入，此设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- text_color
    - 文字颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- background_color
    - 背景颜色。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional

- size_as
    - 此处输入图像或遮罩，将按照其尺寸生成输出图像和遮罩。注意，此输入优先级高于下面的width和height。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class TextImage:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        layout_list = ['horizontal', 'vertical']
        random_seed = int(time.time())
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "default": "Text"}),
                "font_file": (FONT_LIST,),
                "spacing": ("INT", {"default": 0, "min": -9999, "max": 9999, "step": 1}),
                "leading": ("INT", {"default": 0, "min": -9999, "max": 9999, "step": 1}),
                "horizontal_border": ("FLOAT", {"default": 5, "min": -100, "max": 100, "step": 0.1}), # 左右距离百分比，横排为距左侧，竖排为距右侧
                "vertical_border": ("FLOAT", {"default": 5, "min": -100, "max": 100, "step": 0.1}),  # 上距离百分比
                "scale": ("FLOAT", {"default": 80, "min": 0.1, "max": 999, "step": 0.01}),  # 整体大小与画面长宽比，横排与宽比，竖排与高比
                "variation_range": ("INT", {"default": 0, "min": 0, "max": 100, "step": 1}), # 随机大小和位置范围
                "variation_seed": ("INT", {"default": random_seed, "min": 0, "max": 999999999999, "step": 1}),  # 随机种子
                "layout": (layout_list,),  # 横排or竖排
                "width": ("INT", {"default": 512, "min": 4, "max": 999999, "step": 1}),
                "height": ("INT", {"default": 512, "min": 4, "max": 999999, "step": 1}),
                "text_color": ("STRING", {"default": "#FFA000"}),  # 文字颜色
                "background_color": ("STRING", {"default": "#FFFFFF"}),  # 背景颜色
            },
            "optional": {
                "size_as": (any, {}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    RETURN_NAMES = ("image", "mask",)
    FUNCTION = 'text_image'
    CATEGORY = '😺dzNodes/LayerUtility'

    def text_image(self, text, font_file, spacing, leading, horizontal_border, vertical_border, scale,
                  variation_range, variation_seed, layout, width, height, text_color, background_color,
                  size_as=None
                  ):

        # spacing -= 20
        # leading += 20
        # scale *= 0.7
        if size_as is not None:
            width, height = tensor2pil(size_as).size
        text_table = []
        max_char_in_line = 0
        total_char = 0
        spacing = int(spacing * scale / 100)
        leading = int(leading * scale / 100)
        lines = []
        text_lines = text.split("\n")
        for l in text_lines:
            if len(l) > 0:
                lines.append(l)
                total_char += len(l)
                if len(l) > max_char_in_line:
                    max_char_in_line = len(l)
            else:
                lines.append(" ")
        if layout == 'vertical':
            char_horizontal_size = width // len(lines)
            char_vertical_size = height // max_char_in_line
            char_size = min(char_horizontal_size, char_vertical_size)
            if char_size < 1:
                char_size = 1
            start_x = width - int(width * horizontal_border/100) - char_size
        else:
            char_horizontal_size = width // max_char_in_line
            char_vertical_size = height // len(lines)
            char_size = min(char_horizontal_size, char_vertical_size)
            if char_size < 1:
                char_size = 1
            start_x = int(width * horizontal_border/100)
        start_y = int(height * vertical_border/100)

        # calculate every char position and size to a table list
        for i in range(len(lines)):
            _x = start_x
            _y = start_y
            line_table = []
            line_random = random_numbers(total=len(lines[i]),
                                         random_range=int(char_size * variation_range / 25),
                                         seed=variation_seed, sum_of_numbers=0)
            for j in range(0, len(lines[i])):
                offset = int((char_size + line_random[j]) * variation_range / 250)
                offset = int(offset * scale / 100)
                font_size = char_size + line_random[j]
                font_size = int(font_size * scale / 100)
                if font_size < 4:
                    font_size = 4
                axis_x = _x + offset // 3 if random.random() > 0.5 else _x - offset // 3
                axis_y = _y + offset // 3 if random.random() > 0.5 else _y - offset // 3
                char_dict = {'char':lines[i][j],
                             'axis':(axis_x, axis_y),
                             'size':font_size}
                line_table.append(char_dict)
                if layout == 'vertical':
                    _y += char_size + line_random[j] + spacing
                else:
                    _x += char_size + line_random[j] + spacing
            if layout == 'vertical':
                start_x -= leading * (i+1) + char_size
            else:
                start_y += leading * (i+1) + char_size
            text_table.append(line_table)

        # draw char
        _mask = Image.new('RGB', size=(width, height), color='black')
        draw = ImageDraw.Draw(_mask)
        for l in range(len(lines)):
            for c in range(len(lines[l])):
                font_path = FONT_DICT.get(font_file)
                font_size = text_table[l][c].get('size')
                font = ImageFont.truetype(font_path, font_size)
                draw.text(text_table[l][c].get('axis'), text_table[l][c].get('char'), font=font, fill='white')
        _canvas = Image.new('RGB', size=(width, height), color=background_color)
        _color = Image.new('RGB', size=(width, height), color=text_color)
        _canvas.paste(_color, mask=_mask.convert('L'))
        _canvas = RGB2RGBA(_canvas, _mask)
        log(f"{NODE_NAME} Processed.", message_type='finish')
        return (pil2tensor(_canvas), image2mask(_mask),)
```