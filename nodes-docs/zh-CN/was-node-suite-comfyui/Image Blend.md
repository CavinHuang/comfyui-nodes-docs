# Documentation
- Class name: WAS_Image_Blend
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Blend 节点的 'image_blend' 方法旨在将两张图片无缝融合。它通过利用 blend_percentage 参数控制融合的程度，创建一个视觉和谐的复合图像，反映出输入图片之间的平衡。

# Input types
## Required
- image_a
    - 要混合的第一张图片。它在确定混合图像的初始视觉上下文方面起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image_b
    - 要与第一张图片混合的第二张图片。它通过在基础图片上叠加视觉元素，为最终的外观做出贡献。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- blend_percentage
    - blend_percentage 参数决定了在最终混合中 image_b 的可见度。它是一个浮点值，范围从 0.0 到 1.0，其中 0.0 表示只有 image_a 是可见的，而 1.0 表示只有 image_b 是可见的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是一个混合图像，根据指定的 blend_percentage 将两个输入图像的元素视觉地结合起来。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Blend:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'blend_percentage': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'image_blend'
    CATEGORY = 'WAS Suite/Image'

    def image_blend(self, image_a, image_b, blend_percentage):
        img_a = tensor2pil(image_a)
        img_b = tensor2pil(image_b)
        blend_mask = Image.new(mode='L', size=img_a.size, color=round(blend_percentage * 255))
        blend_mask = ImageOps.invert(blend_mask)
        img_result = Image.composite(img_a, img_b, blend_mask)
        del img_a, img_b, blend_mask
        return (pil2tensor(img_result),)
```