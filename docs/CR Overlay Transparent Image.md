# Documentation
- Class name: CR_OverlayTransparentImage
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_OverlayTransparentImage 节点旨在将一个透明的覆盖图像与背景图像混合。它调整覆盖层的透明度、位置、旋转和缩放，以实现所需的视觉效果，为图像处理中的创意应用提供了广泛的可能性。

# Input types
## Required
- back_image
    - 背景图像，覆盖图像将放置在其上。它作为合成图像创建的画布。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- overlay_image
    - 将带有透明度覆盖在背景上的图像。它是最终输出中将被操作的主要视觉元素。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- transparency
    - 应用于覆盖图像的透明度级别，0.0表示完全不透明，1.0表示完全透明。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- offset_x
    - 应用于覆盖图像的水平偏移量，从其中心位置开始，允许精确放置。
    - Comfy dtype: INT
    - Python dtype: int
- offset_y
    - 应用于覆盖图像的垂直偏移量，从其中心位置开始，允许精确放置。
    - Comfy dtype: INT
    - Python dtype: int
- rotation_angle
    - 覆盖图像将旋转的角度，以度数为单位，提供一种按需定向图像的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- overlay_scale_factor
    - 覆盖图像将被缩放的因子；大于1.0的值放大图像，而小于1.0的值缩小图像。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 最终合成图像，覆盖图像应用于背景，反映了通过节点参数进行的所有修改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CR_OverlayTransparentImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'back_image': ('IMAGE',), 'overlay_image': ('IMAGE',), 'transparency': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.1}), 'offset_x': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'offset_y': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'rotation_angle': ('FLOAT', {'default': 0.0, 'min': -360.0, 'max': 360.0, 'step': 0.1}), 'overlay_scale_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.001})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'overlay_image'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def overlay_image(self, back_image, overlay_image, transparency, offset_x, offset_y, rotation_angle, overlay_scale_factor=1.0):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-overlay-transparent-image'
        back_image = tensor2pil(back_image)
        overlay_image = tensor2pil(overlay_image)
        overlay_image.putalpha(int(255 * (1 - transparency)))
        overlay_image = overlay_image.rotate(rotation_angle, expand=True)
        (overlay_width, overlay_height) = overlay_image.size
        new_size = (int(overlay_width * overlay_scale_factor), int(overlay_height * overlay_scale_factor))
        overlay_image = overlay_image.resize(new_size, Image.Resampling.LANCZOS)
        center_x = back_image.width // 2
        center_y = back_image.height // 2
        position_x = center_x - overlay_image.width // 2 + offset_x
        position_y = center_y - overlay_image.height // 2 + offset_y
        back_image.paste(overlay_image, (position_x, position_y), overlay_image)
        return (pil2tensor(back_image),)
```