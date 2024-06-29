# Documentation
- Class name: ImageBatchTestPattern
- Category: KJNodes/text
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

ImageBatchTestPattern 节点旨在生成一批带有文本模式的图像。它通过使用指定的字体和字号在黑色背景上绘制数字来创建图像。该节点特别适用于测试和可视化不同字体和大小如何影响图像中文本的外观。

# Input types
## Required
- batch_size
    - batch_size 参数决定了要生成的图像数量。它对于控制输出数据的体积至关重要，并且与节点执行的计算负载直接相关。
    - Comfy dtype: INT
    - Python dtype: int
- start_from
    - start_from 参数设置了要在图像上绘制的数字序列的起始数字。它对于定义将在生成的模式中显示的数字范围具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
- text_x
    - text_x 参数指定了文本将在图像上绘制的 x 坐标。它是一个重要的参数，因为它决定了文本在图像中的水平位置。
    - Comfy dtype: INT
    - Python dtype: int
- text_y
    - text_y 参数指定了文本将在图像上绘制的 y 坐标。它控制文本的垂直位置，对于在图像内对齐文本至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - width 参数定义了生成图像的宽度。它是一个关键参数，影响输出图像的整体尺寸，并与文本的纵横比和视觉呈现密切相关。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height 参数定义了生成图像的高度。它与 width 参数一起工作，以确定输出图像的整体大小和形状。
    - Comfy dtype: INT
    - Python dtype: int
- font
    - font 参数选择用于图像中文本的字体类型。它是一个关键参数，因为它显著影响图像中文本的风格和可读性。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - font_size 参数设置了图像中文本使用的字体大小。它是确定图像中文本的突出性和可见性的重要因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - IMAGE 输出包含一批具有指定文本模式的生成图像。每个图像是一个表示视觉数据的张量，可以用于进一步处理或可视化。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageBatchTestPattern:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 255, 'step': 1}), 'start_from': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'text_x': ('INT', {'default': 256, 'min': 0, 'max': 4096, 'step': 1}), 'text_y': ('INT', {'default': 256, 'min': 0, 'max': 4096, 'step': 1}), 'width': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1}), 'font': (folder_paths.get_filename_list('kjnodes_fonts'),), 'font_size': ('INT', {'default': 255, 'min': 8, 'max': 4096, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'generatetestpattern'
    CATEGORY = 'KJNodes/text'

    def generatetestpattern(self, batch_size, font, font_size, start_from, width, height, text_x, text_y):
        out = []
        numbers = np.arange(start_from, start_from + batch_size)
        font_path = folder_paths.get_full_path('kjnodes_fonts', font)
        for number in numbers:
            image = Image.new('RGB', (width, height), color='black')
            draw = ImageDraw.Draw(image)
            font_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            font = ImageFont.truetype(font_path, font_size)
            text = str(number)
            try:
                draw.text((text_x, text_y), text, font=font, fill=font_color, features=['-liga'])
            except:
                draw.text((text_x, text_y), text, font=font, fill=font_color)
            image_np = np.array(image).astype(np.float32) / 255.0
            image_tensor = torch.from_numpy(image_np).unsqueeze(0)
            out.append(image_tensor)
        out_tensor = torch.cat(out, dim=0)
        return (out_tensor,)
```