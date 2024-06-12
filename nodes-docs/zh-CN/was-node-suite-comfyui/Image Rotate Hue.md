# Documentation
- Class name: WAS_Image_Rotate_Hue
- Category: WAS Suite/Image/Adjustment
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Rotate_Hue节点旨在调整图像的色相，提供了一种改变图像整体色调的方法，而不会改变图像的亮度或饱和度。它特别适用于为视觉效果或颜色校正目的创建图像的变体。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将进行色相调整的输入。它是节点将处理以实现所需颜色转换的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- hue_shift
    - hue_shift参数允许微调图像中的颜色旋转。它是一个浮点数，影响色相偏移的程度，从而影响图像的最终视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- rotated_image
    - rotated_image输出代表了将色相旋转应用于输入图像的结果。它是经过颜色调整的转换图像，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Rotate_Hue:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'hue_shift': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'rotate_hue'
    CATEGORY = 'WAS Suite/Image/Adjustment'

    def rotate_hue(self, image, hue_shift=0.0):
        if hue_shift > 1.0 or hue_shift < 0.0:
            cstr(f'The hue_shift `{cstr.color.LIGHTYELLOW}{hue_shift}{cstr.color.END}` is out of range. Valid range is {cstr.color.BOLD}0.0 - 1.0{cstr.color.END}').error.print()
            hue_shift = 0.0
        shifted_hue = pil2tensor(self.hue_rotation(image, hue_shift))
        return (shifted_hue,)

    def hue_rotation(self, image, hue_shift=0.0):
        import colorsys
        if hue_shift > 1.0 or hue_shift < 0.0:
            print(f"The hue_shift '{hue_shift}' is out of range. Valid range is 0.0 - 1.0")
            hue_shift = 0.0
        pil_image = tensor2pil(image)
        (width, height) = pil_image.size
        rotated_image = Image.new('RGB', (width, height))
        for x in range(width):
            for y in range(height):
                (r, g, b) = pil_image.getpixel((x, y))
                (h, l, s) = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
                h = (h + hue_shift) % 1.0
                (r, g, b) = colorsys.hls_to_rgb(h, l, s)
                (r, g, b) = (int(r * 255), int(g * 255), int(b * 255))
                rotated_image.putpixel((x, y), (r, g, b))
        return rotated_image
```