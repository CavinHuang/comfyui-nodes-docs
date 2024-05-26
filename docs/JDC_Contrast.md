# Documentation
- Class name: ImageContrast
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点旨在通过调整图像的对比度和亮度来提升其视觉吸引力。它增强图像的对比度以改善其光影元素之间的区分度，从而产生更加醒目的视觉输出。此外，它还调整亮度，允许修改图像的整体明亮度或暗度，这对于各种视觉效果或满足特定的美学要求至关重要。

# Input types
## Required
- IMAGE
    - 图像参数是必需的，因为它是节点处理的主要输入。它是节点应用其对比度和亮度调整的媒介，输入的质量和分辨率直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- contrast
    - 对比度参数在节点操作中扮演重要角色，因为它控制图像对比度的增强。通过调整此参数，节点可以使图像的光暗区域更加分明，从而改善整体视觉冲击。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度参数对于调整图像的整体明亮度或暗度至关重要。它可以用于创造特定的情绪或效果，其调整直接影响图像的最终外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 输出图像是节点处理的结果，反映了对输入图像对比度和亮度所做的调整。它是节点功能的结晶，并作为进一步图像处理或分析的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class ImageContrast:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',), 'contrast': ('FLOAT', {'default': 1, 'min': 0, 'max': 10, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 1, 'min': 0, 'max': 10, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE, contrast, brightness):
        cimg = conv_tensor_pil(IMAGE)
        (w, h) = cimg.size
        pbar = comfy.utils.ProgressBar(2)
        step = 0
        cnt = ImageEnhance.Contrast(cimg)
        cimg = cnt.enhance(contrast)
        step += 1
        pbar.update_absolute(step, h)
        brt = ImageEnhance.Brightness(cimg)
        cimg = brt.enhance(brightness)
        step += 1
        pbar.update_absolute(step, h)
        return conv_pil_tensor(cimg)
```