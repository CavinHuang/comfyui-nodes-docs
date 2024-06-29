# Documentation
- Class name: WAS_Image_Color_Palette
- Category: WAS Suite/Image/Analyze
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Color_Palette 节点旨在分析和处理图像数据以生成颜色调色板。它接受一个图像作为输入，并返回一个转换后的图像以及从原始图像中提取的颜色调色板列表。该节点特别适用于需要从图像中提取和表示颜色数据的应用场景，例如设计、图像编辑或任何需要图像颜色数据的过程。

# Input types
## Required
- image
    - 要生成颜色调色板的输入图像。该图像将由节点处理以提取颜色信息并创建调色板的视觉表示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- colors
    - 生成调色板中要包含的颜色数量。它提供了一种控制从图像派生的颜色方案的粒度的方法。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 颜色调色板的显示模式。它决定了调色板的视觉展示方式，提供了诸如图表或背靠背排列的选项。
    - Comfy dtype: COMBO['Chart', 'back_to_back']
    - Python dtype: str

# Output types
- image
    - 转换后的图像，其中颜色调色板根据输入图像和提供的参数以视觉方式嵌入或更改。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- color_palettes
    - 从输入图像中提取的颜色调色板列表。列表中的每个条目代表一个颜色，以字符串十六进制代码的形式表示。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Color_Palette:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'colors': ('INT', {'default': 16, 'min': 8, 'max': 256, 'step': 1}), 'mode': (['Chart', 'back_to_back'],)}}
    RETURN_TYPES = ('IMAGE', 'LIST')
    RETURN_NAMES = ('image', 'color_palettes')
    FUNCTION = 'image_generate_palette'
    CATEGORY = 'WAS Suite/Image/Analyze'

    def image_generate_palette(self, image, colors=16, mode='chart'):
        WTools = WAS_Tools_Class()
        res_dir = os.path.join(WAS_SUITE_ROOT, 'res')
        font = os.path.join(res_dir, 'font.ttf')
        if not os.path.exists(font):
            font = None
        elif mode == 'Chart':
            cstr(f'Found font at `{font}`').msg.print()
        if len(image) > 1:
            palette_strings = []
            palette_images = []
            for img in image:
                img = tensor2pil(img)
                (palette_image, palette) = WTools.generate_palette(img, colors, 128, 10, font, 15, mode.lower())
                palette_images.append(pil2tensor(palette_image))
                palette_strings.append(palette)
            palette_images = torch.cat(palette_images, dim=0)
            return (palette_images, palette_strings)
        else:
            image = tensor2pil(image)
            (palette_image, palette) = WTools.generate_palette(image, colors, 128, 10, font, 15, mode.lower())
            return (pil2tensor(palette_image), [palette])
```