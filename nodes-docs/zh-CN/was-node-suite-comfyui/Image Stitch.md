# Documentation
- Class name: WAS_Image_Stitch
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Stitch 节点旨在根据指定的缝合方向无缝地组合两张图像。它应用羽化效果以在图像之间创建平滑过渡，这对于创建全景图像或纹理特别有用。该节点能够处理不同的缝合模式，例如'top'、'left'、'bottom'和'right'，允许灵活的图像组合。

# Input types
## Required
- image_a
    - 要缝合的第一张图像。它作为缝合操作的基础层，并决定了最终缝合图像的初始部分。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image_b
    - 要缝合的第二张图像。它将根据指定的缝合模式与第一张图像对齐，并混合以创建无缝的组合。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- stitch
    - 两张图像应缝合在一起的方向。可以是'top'、'left'、'bottom'或'right'，定义了缝合的方向以及图像组合的方式。
    - Comfy dtype: COMBO[top, left, bottom, right]
    - Python dtype: str
- feathering
    - 在缝合边界应用的羽化量。更高的值会在图像之间产生更柔和、更渐进的过渡，但也会减小输出图像的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- stitched_image
    - 缝合过程后的结果图像。它根据指定的缝合模式和羽化将两个输入图像组合成单个、无缝的图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Stitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'stitch': (['top', 'left', 'bottom', 'right'],), 'feathering': ('INT', {'default': 50, 'min': 0, 'max': 2048, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_stitching'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_stitching(self, image_a, image_b, stitch='right', feathering=50):
        valid_stitches = ['top', 'left', 'bottom', 'right']
        if stitch not in valid_stitches:
            cstr(f"The stitch mode `{stitch}` is not valid. Valid sitch modes are {', '.join(valid_stitches)}").error.print()
        if feathering > 2048:
            cstr(f'The stitch feathering of `{feathering}` is too high. Please choose a value between `0` and `2048`').error.print()
        WTools = WAS_Tools_Class()
        stitched_image = WTools.stitch_image(tensor2pil(image_a), tensor2pil(image_b), stitch, feathering)
        return (pil2tensor(stitched_image),)
```