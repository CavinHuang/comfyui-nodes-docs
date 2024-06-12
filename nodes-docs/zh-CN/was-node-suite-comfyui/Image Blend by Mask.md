# Documentation
- Class name: WAS_Image_Blend_Mask
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Blend_Mask 节点旨在使用提供的遮罩和混合百分比无缝混合两张图像。它利用图像合成的能力，创建一个视觉上连贯的结果，其中一个图像的遮罩区域根据指定的混合级别被另一个图像的相应区域替换。

# Input types
## Required
- image_a
    - 图像 A 是将与图像 B 混合的主图像。它是一个关键输入，因为它构成了最终合成图像的基础层。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- image_b
    - 图像 B 是次要图像，其遮罩区域将被混合到图像 A 上。它通过将特定部分覆盖在基础图像上，从而对最终外观做出贡献。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- mask
    - 遮罩是一个二进制图像，它定义了图像 B 的哪些部分应在最终混合中可见。它在确定要被图像 B 替换的图像 A 的区域方面起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- blend_percentage
    - 混合百分比确定了图像 B 的遮罩区域与图像 A 混合的程度。它是一个可选参数，允许微调混合效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result_image
    - 结果图像是混合过程的最终输出，它根据遮罩和混合百分比结合了图像 A 和图像 B。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Blend_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'mask': ('IMAGE',), 'blend_percentage': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_blend_mask'
    CATEGORY = 'WAS Suite/Image'

    def image_blend_mask(self, image_a, image_b, mask, blend_percentage):
        img_a = tensor2pil(image_a)
        img_b = tensor2pil(image_b)
        mask = ImageOps.invert(tensor2pil(mask).convert('L'))
        masked_img = Image.composite(img_a, img_b, mask.resize(img_a.size))
        blend_mask = Image.new(mode='L', size=img_a.size, color=round(blend_percentage * 255))
        blend_mask = ImageOps.invert(blend_mask)
        img_result = Image.composite(img_a, masked_img, blend_mask)
        del img_a, img_b, blend_mask, mask
        return (pil2tensor(img_result),)
```