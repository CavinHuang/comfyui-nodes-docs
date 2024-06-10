# Documentation
- Class name: WAS_Image_Select_Color
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Select_Color 节点旨在通过选择与指定颜色及其容差范围内匹配的像素来处理图像。它通过专注于所需的颜色范围来增强图像，允许对特定视觉元素进行主题或风格上的强调。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将要被处理的输入。它决定了节点将根据指定的颜色标准分析和操作的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- red
    - 红色参数定义了图像中要选取的颜色的红色分量。它通过指定要考虑的红色值范围，在确定最终视觉结果方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 绿色参数指定了目标颜色的绿色分量。它对于实现所需的颜色选择很重要，并有助于整体颜色过滤过程。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 蓝色参数设置要选取的颜色的蓝色分量。它是颜色选择过程中的一个关键因素，确保只有处于指定蓝色范围内的像素被包含。
    - Comfy dtype: INT
    - Python dtype: int
- variance
    - 容差参数通过定义可接受的颜色偏差范围，允许颜色选择具有一定的灵活性。它对于处理图像内颜色强度的轻微变化具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- selected_image
    - 选定的图像输出代表了处理后的图像，其中仅保留了符合指定颜色标准的像素。它是节点操作的成果，并反映了预期的主题焦点。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Select_Color:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'red': ('INT', {'default': 255.0, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'green': ('INT', {'default': 255.0, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'blue': ('INT', {'default': 255.0, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'variance': ('INT', {'default': 10, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'select_color'
    CATEGORY = 'WAS Suite/Image/Process'

    def select_color(self, image, red=255, green=255, blue=255, variance=10):
        image = self.color_pick(tensor2pil(image), red, green, blue, variance)
        return (pil2tensor(image),)

    def color_pick(self, image, red=255, green=255, blue=255, variance=10):
        image = image.convert('RGB')
        selected_color = Image.new('RGB', image.size, (0, 0, 0))
        (width, height) = image.size
        for x in range(width):
            for y in range(height):
                pixel = image.getpixel((x, y))
                (r, g, b) = pixel
                if r >= red - variance and r <= red + variance and (g >= green - variance) and (g <= green + variance) and (b >= blue - variance) and (b <= blue + variance):
                    selected_color.putpixel((x, y), (r, g, b))
        return selected_color
```