# Documentation
- Class name: WAS_Image_Transpose
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Transpose节点旨在执行图像操作任务，特别通过旋转和调整大小来转换图像。它允许将一个图像叠加到另一个图像上，可以指定输出的宽度和高度、叠加的位置以及旋转的程度。此外，它还提供了羽化功能，用于软化叠加层的边缘，以实现更自然的混合效果。此节点对于创建具有精确控制元素位置和外观的复合图像至关重要。

# Input types
## Required
- image
    - 作为将应用叠加的基础图像。它作为合成图像创建的画布。选择此图像显著影响输出的最终外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_overlay
    - 将叠加在基础图像上的图像。根据指定的参数对其进行操作，以便与基础图像无缝融合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- width
    - 输出图像的期望宽度。它决定了基础和叠加图像的缩放，以适应指定的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输出图像的期望高度。与宽度一起，它决定了最终合成图像的大小。
    - Comfy dtype: INT
    - Python dtype: int
- X
    - 叠加图像放置在基础图像上的位置的X坐标。
    - Comfy dtype: INT
    - Python dtype: int
- Y
    - 叠加图像放置在基础图像上的位置的Y坐标。
    - Comfy dtype: INT
    - Python dtype: int
- rotation
    - 在叠加图像放置到基础图像上之前要应用的旋转度数。
    - Comfy dtype: INT
    - Python dtype: int
- feathering
    - 应用于叠加图像边缘的羽化量，以便与基础图像更平滑地混合。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 根据指定的参数，由基础图像和叠加图像转换得到的最终合成图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Transpose:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'image_overlay': ('IMAGE',), 'width': ('INT', {'default': 512, 'min': -48000, 'max': 48000, 'step': 1}), 'height': ('INT', {'default': 512, 'min': -48000, 'max': 48000, 'step': 1}), 'X': ('INT', {'default': 0, 'min': -48000, 'max': 48000, 'step': 1}), 'Y': ('INT', {'default': 0, 'min': -48000, 'max': 48000, 'step': 1}), 'rotation': ('INT', {'default': 0, 'min': -360, 'max': 360, 'step': 1}), 'feathering': ('INT', {'default': 0, 'min': 0, 'max': 4096, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_transpose'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_transpose(self, image: torch.Tensor, image_overlay: torch.Tensor, width: int, height: int, X: int, Y: int, rotation: int, feathering: int=0):
        return (pil2tensor(self.apply_transpose_image(tensor2pil(image), tensor2pil(image_overlay), (width, height), (X, Y), rotation, feathering)),)

    def apply_transpose_image(self, image_bg, image_element, size, loc, rotate=0, feathering=0):
        image_element = image_element.rotate(rotate, expand=True)
        image_element = image_element.resize(size)
        if feathering > 0:
            mask = Image.new('L', image_element.size, 255)
            draw = ImageDraw.Draw(mask)
            for i in range(feathering):
                alpha_value = int(255 * (i + 1) / feathering)
                draw.rectangle((i, i, image_element.size[0] - i, image_element.size[1] - i), fill=alpha_value)
            alpha_mask = Image.merge('RGBA', (mask, mask, mask, mask))
            image_element = Image.composite(image_element, Image.new('RGBA', image_element.size, (0, 0, 0, 0)), alpha_mask)
        new_image = Image.new('RGBA', image_bg.size, (0, 0, 0, 0))
        new_image.paste(image_element, loc)
        image_bg = image_bg.convert('RGBA')
        image_bg.paste(new_image, (0, 0), new_image)
        return image_bg
```