# Documentation
- Class name: ResizeImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ResizeImage节点旨在根据指定要求调整图像尺寸。它能够巧妙地将图像调整到所需的宽度和高度，同时保持视觉内容的完整性。该节点还提供根据任一维度缩放图像的选项，或者在保持长宽比的同时缩放到适应给定尺寸，或者在缩放后居中图像。此外，它还可以生成图像的平均颜色表示，并将其转换为十六进制代码，为图像预处理和操作提供了一套多功能的工具。

# Input types
## Required
- width
    - ‘width’参数对于定义调整尺寸后的图像的新宽度至关重要。它在确定图像的最终尺寸中起着关键作用，这可能显著影响视觉输出和长宽比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数指定了调整尺寸后的图像的新高度。它对于控制图像的垂直尺寸至关重要，并与‘width’参数协同工作以保持预期的长宽比。
    - Comfy dtype: INT
    - Python dtype: int
- scale_option
    - ‘scale_option’参数指示应如何调整图像大小。它允许根据宽度、高度、整体大小或在新尺寸内的居中进行缩放，提供了在保持或改变图像长宽比方面的灵活性。
    - Comfy dtype: COMBO['width', 'height', 'overall', 'center']
    - Python dtype: str
- image
    - ‘image’参数用于输入需要调整大小的图像。它是节点操作的核心，因为这是将要被操作和转换的实际内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- average_color
    - ‘average_color’参数决定是否计算并返回图像的平均颜色。这对于创建简化的表示或基于颜色的设计决策非常有用。
    - Comfy dtype: COMBO['on', 'off']
    - Python dtype: str
- fill_color
    - ‘fill_color’参数指定了在将图像调整到大于其原始尺寸的大小后，用于填充任何空白空间的颜色。它确保了一致的背景外观。
    - Comfy dtype: STRING
    - Python dtype: str
- mask
    - ‘mask’参数用于在调整大小过程中对图像应用遮罩。这对于根据需要保持图像的特定区域可见或隐藏非常重要。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image

# Output types
- image
    - ‘image’输出提供了调整尺寸后的图像。这是节点操作的主要结果，反映了根据输入参数应用的转换。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- average_image
    - ‘average_image’输出是从输入图像计算出的平均颜色的图像。它作为图像颜色组成的视觉摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- average_hex
    - ‘average_hex’输出返回图像平均颜色的十六进制表示，可以用于各种设计和与颜色相关的应用。
    - Comfy dtype: STRING
    - Python dtype: str
- mask
    - ‘mask’输出提供了调整尺寸后的遮罩图像。当节点用于操作和完善图像内特定区域的可见性时特别有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ResizeImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 8, 'display': 'number'}), 'height': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 8, 'display': 'number'}), 'scale_option': (['width', 'height', 'overall', 'center'],)}, 'optional': {'image': ('IMAGE',), 'average_color': (['on', 'off'],), 'fill_color': ('STRING', {'multiline': False, 'default': '#FFFFFF', 'dynamicPrompts': False}), 'mask': ('MASK',)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'STRING', 'MASK')
    RETURN_NAMES = ('image', 'average_image', 'average_hex', 'mask')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True, True, True)

    def run(self, width, height, scale_option, image=None, average_color=['on'], fill_color=['#FFFFFF'], mask=None):
        w = width[0]
        h = height[0]
        scale_option = scale_option[0]
        average_color = average_color[0]
        fill_color = fill_color[0]
        imgs = []
        masks = []
        average_images = []
        hexs = []
        if image == None:
            im = create_noisy_image(w, h, 'RGB')
            (a_im, hex) = get_average_color_image(im)
            im = pil2tensor(im)
            imgs.append(im)
            a_im = pil2tensor(a_im)
            average_images.append(a_im)
            hexs.append(hex)
        else:
            for ims in image:
                for im in ims:
                    im = tensor2pil(im)
                    im = resize_image(im, scale_option, w, h, fill_color)
                    im = im.convert('RGB')
                    (a_im, hex) = get_average_color_image(im)
                    im = pil2tensor(im)
                    imgs.append(im)
                    a_im = pil2tensor(a_im)
                    average_images.append(a_im)
                    hexs.append(hex)
            try:
                for mas in mask:
                    for ma in mas:
                        ma = tensor2pil(ma)
                        ma = ma.convert('RGB')
                        ma = resize_image(ma, scale_option, w, h, fill_color)
                        ma = ma.convert('L')
                        ma = pil2tensor(ma)
                        masks.append(ma)
            except:
                print('')
        return (imgs, average_images, hexs, masks)
```