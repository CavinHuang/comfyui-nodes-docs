# Documentation
- Class name: ImageOverlay
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

ImageOverlay节点类根据指定的不透明度水平，将前景图像无缝集成到背景图像上，创建一个合成图像，结合了两个来源的视觉元素。

# Input types
## Required
- background_image
    - 背景图像作为应用叠加的基础画布。它对于建立最终合成图像的上下文和尺寸至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- foreground_image
    - 前景图像是要叠加到背景上的元素。其视觉特征和位置对于在合成图像中实现期望效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- opacity
    - 不透明度决定了前景图像与背景图像融合的程度。这是一个关键参数，影响合成图像的整体外观和透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result_img
    - result_img代表最终的合成图像，其中前景图像已根据指定的不透明度叠加到背景图像上。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageOverlay:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'background_image': ('IMAGE', {'default': None}), 'foreground_image': ('IMAGE', {'default': None}), 'opacity': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'overlay'
    CATEGORY = 'Mikey/Image'

    def overlay(self, background_image, foreground_image, opacity):
        background_image = tensor2pil(background_image)
        foreground_image = tensor2pil(foreground_image)
        background_image = background_image.convert('RGB')
        foreground_image = foreground_image.convert('RGB')
        cropped_fg = Image.new('RGB', (background_image.size[0], background_image.size[1]))
        cropped_fg.paste(foreground_image, (int((background_image.size[0] - foreground_image.size[0]) / 2), int((background_image.size[1] - foreground_image.size[1]) / 2)))
        bg_array = np.array(background_image, dtype=np.float32) / 255
        fg_array = np.array(cropped_fg, dtype=np.float32) / 255
        mask = bg_array < 0.5
        overlay = np.zeros_like(bg_array)
        overlay[mask] = 2 * bg_array[mask] * fg_array[mask]
        overlay[~mask] = 1 - 2 * (1 - bg_array[~mask]) * (1 - fg_array[~mask])
        result = (1 - opacity) * bg_array + opacity * overlay
        result_img = Image.fromarray((result * 255).astype(np.uint8))
        result_img = pil2tensor(result_img)
        return (result_img,)
```