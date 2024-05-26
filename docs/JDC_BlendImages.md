# Documentation
- Class name: BlendImages
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

BlendImages类实现了将两张图片无缝融合的功能，通过调整一张图片的透明度并将其覆盖在另一张图片上，从而创造出在原始元素之间平滑过渡的复合图片。

# Input types
## Required
- IMAGE_A
    - IMAGE_A是作为融合过程基础层的第一张输入图片。其视觉元素对确定最终组合的基础和整体美学起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- IMAGE_B
    - IMAGE_B是要融合到由IMAGE_A提供的基础层上的第二张输入图片。它在为最终图片增加深度和复杂性方面至关重要，有助于合成图像的丰富性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- blend
    - blend参数控制IMAGE_B覆盖在IMAGE_A上时的透明度水平。该参数在平衡两张图片、确保自然和视觉上令人愉悦的融合中至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 输出的IMAGE代表了融合过程的最终结果，将两张输入图片的视觉元素结合成一张单一的、连贯的图片。这证明了该节点将不同的元素融合成一个和谐整体的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class BlendImages:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE_A': ('IMAGE',), 'IMAGE_B': ('IMAGE',), 'blend': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.001})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE_A, IMAGE_B, blend):
        source_a = conv_tensor_pil(IMAGE_A)
        source_b = conv_tensor_pil(IMAGE_B)
        (aw, ah) = (source_a.width, source_a.height)
        (bw, bh) = (source_b.width, source_b.height)
        img_a = Image.new('RGB', (aw, ah))
        img_a.paste(source_a)
        img_b = Image.new('RGB', (bw, bh))
        img_b.paste(source_b)
        if aw != bw or ah != bh:
            img_b.resize((aw, ah), resample=get_pil_resampler('lanczos'))
        return conv_pil_tensor(Image.blend(img_a, img_b, blend))
```