# Documentation
- Class name: WAS_Image_Padding
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Padding 节点旨在通过向图像边缘添加填充来增强图像，这对于各种图像处理任务（如数据增强或为机器学习模型准备图像）非常有用。它提供了一个高级功能，允许添加填充并可选地应用羽化效果，平滑地将填充边缘与原始图像混合。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入图像。它在节点的操作中起着核心作用，因为整个填充和羽化过程都应用于此图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- feathering
    - 羽化参数决定了应用于图像填充边缘的羽化效果的程度。这是一个可选参数，可以增强填充的视觉平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- feather_second_pass
    - feather_second_pass 参数控制是否对图像应用第二次羽化。这可以为填充的边缘增加额外的平滑度层。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- left_padding
    - left_padding 参数指定要添加到图像左侧的填充量。它是一个重要参数，因为它直接影响图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- right_padding
    - right_padding 参数指定要添加到图像右侧的填充量。它对于控制填充图像的总宽度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- top_padding
    - top_padding 参数确定要添加到图像顶部的填充量。它是调整图像垂直尺寸的关键参数。
    - Comfy dtype: INT
    - Python dtype: int
- bottom_padding
    - bottom_padding 参数设置要添加到图像底部的填充量。它对于修改图像的总高度至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- padded_image
    - padded_image 参数是节点的输出，即应用了指定填充的原始图像。它代表了图像填充过程的最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- padding_mask
    - padding_mask 参数是额外的输出，提供了应用于图像的填充的视觉表示。它可以用于进一步处理或视觉检查。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Padding:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'feathering': ('INT', {'default': 120, 'min': 0, 'max': 2048, 'step': 1}), 'feather_second_pass': (['true', 'false'],), 'left_padding': ('INT', {'default': 512, 'min': 8, 'max': 48000, 'step': 1}), 'right_padding': ('INT', {'default': 512, 'min': 8, 'max': 48000, 'step': 1}), 'top_padding': ('INT', {'default': 512, 'min': 8, 'max': 48000, 'step': 1}), 'bottom_padding': ('INT', {'default': 512, 'min': 8, 'max': 48000, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    FUNCTION = 'image_padding'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_padding(self, image, feathering, left_padding, right_padding, top_padding, bottom_padding, feather_second_pass=True):
        padding = self.apply_image_padding(tensor2pil(image), left_padding, right_padding, top_padding, bottom_padding, feathering, second_pass=True)
        return (pil2tensor(padding[0]), pil2tensor(padding[1]))

    def apply_image_padding(self, image, left_pad=100, right_pad=100, top_pad=100, bottom_pad=100, feather_radius=50, second_pass=True):
        mask = Image.new('L', image.size, 255)
        draw = ImageDraw.Draw(mask)
        draw.rectangle((0, 0, feather_radius * 2, image.height), fill=0)
        draw.rectangle((image.width - feather_radius * 2, 0, image.width, image.height), fill=0)
        draw.rectangle((0, 0, image.width, feather_radius * 2), fill=0)
        draw.rectangle((0, image.height - feather_radius * 2, image.width, image.height), fill=0)
        mask = mask.filter(ImageFilter.GaussianBlur(radius=feather_radius))
        if second_pass:
            mask2 = Image.new('L', image.size, 255)
            draw2 = ImageDraw.Draw(mask2)
            feather_radius2 = int(feather_radius / 4)
            draw2.rectangle((0, 0, feather_radius2 * 2, image.height), fill=0)
            draw2.rectangle((image.width - feather_radius2 * 2, 0, image.width, image.height), fill=0)
            draw2.rectangle((0, 0, image.width, feather_radius2 * 2), fill=0)
            draw2.rectangle((0, image.height - feather_radius2 * 2, image.width, image.height), fill=0)
            mask2 = mask2.filter(ImageFilter.GaussianBlur(radius=feather_radius2))
            feathered_im = Image.new('RGBA', image.size, (0, 0, 0, 0))
            feathered_im.paste(image, (0, 0), mask)
            feathered_im.paste(image, (0, 0), mask)
            feathered_im.paste(image, (0, 0), mask2)
            feathered_im.paste(image, (0, 0), mask2)
        else:
            feathered_im = Image.new('RGBA', image.size, (0, 0, 0, 0))
            feathered_im.paste(image, (0, 0), mask)
        new_size = (feathered_im.width + left_pad + right_pad, feathered_im.height + top_pad + bottom_pad)
        new_im = Image.new('RGBA', new_size, (0, 0, 0, 0))
        new_im.paste(feathered_im, (left_pad, top_pad))
        padding_mask = Image.new('L', new_size, 0)
        gradient = [int(255 * (1 - p[3] / 255)) if p[3] != 0 else 255 for p in new_im.getdata()]
        padding_mask.putdata(gradient)
        return (new_im, padding_mask.convert('RGB'))
```