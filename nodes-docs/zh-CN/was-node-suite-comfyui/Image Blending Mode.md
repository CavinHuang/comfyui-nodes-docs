# Documentation
- Class name: WAS_Image_Blending_Mode
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Blending_Mode 节点旨在使用各种混合模式将两张图像混合在一起，提供了一种多功能的方式来组合视觉元素。它强调图像处理的创造性方面，允许通过选择不同的混合技术实现广泛的效果。

# Input types
## Required
- image_a
    - 图像A是将与图像B混合的第一个输入图像。它在确定混合结果的最终外观中起着至关重要的作用，因为它是被组合的主要视觉元素之一。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image_b
    - 图像B是将与图像A混合的第二个输入图像。它在影响最终输出方面同样重要，有助于整体外观和感觉的混合图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- mode
    - 混合模式决定了图像A和图像B的颜色如何混合。每种模式都提供了不同的视觉效果，允许在混合过程中进行高度定制。
    - Comfy dtype: COMBO['add', 'color', 'color_burn', 'color_dodge', 'darken', 'difference', 'exclusion', 'hard_light', 'hue', 'lighten', 'multiply', 'overlay', 'screen', 'soft_light']
    - Python dtype: str
- blend_percentage
    - 混合百分比控制混合效果的强度。它允许微调混合效果，从而可以实现两个图像的微妙或显著混合。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出图像是使用指定的混合模式和混合百分比混合图像A和图像B的结果。它封装了输入图像的组合视觉元素，反映了混合操作的创意意图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Blending_Mode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'mode': (['add', 'color', 'color_burn', 'color_dodge', 'darken', 'difference', 'exclusion', 'hard_light', 'hue', 'lighten', 'multiply', 'overlay', 'screen', 'soft_light'],), 'blend_percentage': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'image_blending_mode'
    CATEGORY = 'WAS Suite/Image'

    def image_blending_mode(self, image_a, image_b, mode='add', blend_percentage=1.0):
        if 'pilgram' not in packages():
            install_package('pilgram')
        import pilgram
        img_a = tensor2pil(image_a)
        img_b = tensor2pil(image_b)
        if mode:
            if mode == 'color':
                out_image = pilgram.css.blending.color(img_a, img_b)
            elif mode == 'color_burn':
                out_image = pilgram.css.blending.color_burn(img_a, img_b)
            elif mode == 'color_dodge':
                out_image = pilgram.css.blending.color_dodge(img_a, img_b)
            elif mode == 'darken':
                out_image = pilgram.css.blending.darken(img_a, img_b)
            elif mode == 'difference':
                out_image = pilgram.css.blending.difference(img_a, img_b)
            elif mode == 'exclusion':
                out_image = pilgram.css.blending.exclusion(img_a, img_b)
            elif mode == 'hard_light':
                out_image = pilgram.css.blending.hard_light(img_a, img_b)
            elif mode == 'hue':
                out_image = pilgram.css.blending.hue(img_a, img_b)
            elif mode == 'lighten':
                out_image = pilgram.css.blending.lighten(img_a, img_b)
            elif mode == 'multiply':
                out_image = pilgram.css.blending.multiply(img_a, img_b)
            elif mode == 'add':
                out_image = pilgram.css.blending.normal(img_a, img_b)
            elif mode == 'overlay':
                out_image = pilgram.css.blending.overlay(img_a, img_b)
            elif mode == 'screen':
                out_image = pilgram.css.blending.screen(img_a, img_b)
            elif mode == 'soft_light':
                out_image = pilgram.css.blending.soft_light(img_a, img_b)
            else:
                out_image = img_a
        out_image = out_image.convert('RGB')
        blend_mask = Image.new(mode='L', size=img_a.size, color=round(blend_percentage * 255))
        blend_mask = ImageOps.invert(blend_mask)
        out_image = Image.composite(img_a, out_image, blend_mask)
        return (pil2tensor(out_image),)
```