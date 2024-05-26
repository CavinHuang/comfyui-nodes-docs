# Documentation
- Class name: PowerImage
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点通过根据指定的幂因子和模式调整图像的亮度和对比度来增强图像，允许操纵视觉元素以满足特定的美学或分析需求。

# Input types
## Required
- IMAGE
    - 将由节点处理的源图像，作为所有增强操作的基本输入。
    - Comfy dtype: PIL.Image
    - Python dtype: PIL.Image
- power_of
    - 该参数控制应用于图像的增强程度，较高的值会导致更显著的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 确定要应用的增强类型，例如提亮、变暗或同时强调图像的两个方面。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- IMAGE
    - 经过处理的图像，已应用增强，准备进一步使用或分析。
    - Comfy dtype: PIL.Image
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class PowerImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',), 'power_of': ('FLOAT', {'default': 1, 'min': 1, 'max': 65536, 'step': 0.01}), 'mode': (['darken', 'lighten', 'emphasize both'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE, power_of, mode):
        cimg = conv_tensor_pil(IMAGE)
        (w, h) = cimg.size
        pbar = comfy.utils.ProgressBar(h)
        step = 0
        for y in range(h):
            for x in range(w):
                (r, g, b) = cimg.getpixel((x, y))
                if mode == 'lighten':
                    r *= 1 + pow(r / 255, power_of)
                    g *= 1 + pow(g / 255, power_of)
                    b *= 1 + pow(b / 255, power_of)
                elif mode == 'emphasize both':
                    r *= 0.5 + pow(r / 255, power_of)
                    g *= 0.5 + pow(g / 255, power_of)
                    b *= 0.5 + pow(b / 255, power_of)
                else:
                    r *= pow(r / 255, power_of)
                    g *= pow(g / 255, power_of)
                    b *= pow(b / 255, power_of)
                r = clamp(r, 0, 255)
                g = clamp(g, 0, 255)
                b = clamp(b, 0, 255)
                cimg.putpixel((x, y), (int(r), int(g), int(b)))
            step += 1
            pbar.update_absolute(step, h)
        return conv_pil_tensor(cimg)
```