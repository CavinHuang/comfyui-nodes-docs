# Documentation
- Class name: WAS_Image_Generate_Gradient
- Category: WAS Suite/Image/Generate
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Generate_Gradient 节点旨在从一组给定的颜色停止生成无缝渐变纹理。它智能地处理颜色之间的过渡，以确保平滑的渐变，可以平铺而没有可见的接缝。这对于生成需要无缝图案的游戏或3D建模等应用的背景纹理特别有用。

# Input types
## Required
- gradient_stops
    - gradient_stops 参数定义了用于创建渐变的颜色停止。每个停止点都指定为渐变长度的百分比，后跟RGB颜色值，由冒号分隔。此参数对于确定渐变的颜色和分布至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- width
    - width 参数设置生成的渐变图像的宽度。它是一个重要的参数，因为它决定了输出图像的水平分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height 参数设置生成的渐变图像的高度。它是一个重要的参数，因为它决定了输出图像的垂直分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- direction
    - direction 参数指定渐变的方向。它可以是 'horizontal' 或 'vertical'，影响输出图像中颜色渐变的布局。
    - Comfy dtype: COMBO['horizontal', 'vertical']
    - Python dtype: str
- tolerance
    - tolerance 参数用于调整渐变边缘的混合。更高的容差值可以在颜色之间产生更平滑的过渡，但可能导致渐变不太明显。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - WAS_Image_Generate_Gradient 节点的输出是一个无缝渐变图像，可以用作纹理。它很重要，因为它提供了节点操作的最终视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Generate_Gradient:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        gradient_stops = '0:255,0,0\n25:255,255,255\n50:0,255,0\n75:0,0,255'
        return {'required': {'width': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'direction': (['horizontal', 'vertical'],), 'tolerance': ('INT', {'default': 0, 'max': 255, 'min': 0, 'step': 1}), 'gradient_stops': ('STRING', {'default': gradient_stops, 'multiline': True})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_gradient'
    CATEGORY = 'WAS Suite/Image/Generate'

    def image_gradient(self, gradient_stops, width=512, height=512, direction='horizontal', tolerance=0):
        import io
        WTools = WAS_Tools_Class()
        colors_dict = {}
        stops = io.StringIO(gradient_stops.strip().replace(' ', ''))
        for stop in stops:
            parts = stop.split(':')
            colors = parts[1].replace('\n', '').split(',')
            colors_dict[parts[0].replace('\n', '')] = colors
        image = WTools.gradient((width, height), direction, colors_dict, tolerance)
        return (pil2tensor(image),)
```