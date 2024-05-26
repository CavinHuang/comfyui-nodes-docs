# Documentation
- Class name: AutoContrast
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点通过拉伸图像的强度值范围来增强图像的对比度，使其跨越一个期望的范围，提高了图像的视觉吸引力和清晰度，同时不会改变其基本特征。

# Input types
## Required
- IMAGE
    - 输入图像，其对比度将由节点进行调整，作为增强过程的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- cutoff
    - 该参数控制应用于图像的对比度增强程度，较高的值会导致对比度变化更加明显。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 该参数设置图像中不受对比度调整影响的最小值，保留了阴影部分的细节。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出是对比度提高的图像，适合进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class AutoContrast:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',), 'cutoff': ('FLOAT', {'default': 2, 'min': 0, 'max': 100, 'step': 0.01}), 'min_value': ('INT', {'default': -1, 'min': -1, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE, cutoff, min_value):
        cimg = conv_tensor_pil(IMAGE)
        if min_value >= 0:
            return conv_pil_tensor(ImageOps.autocontrast(cimg, cutoff=cutoff, ignore=min_value))
        else:
            return conv_pil_tensor(ImageOps.autocontrast(cimg, cutoff=cutoff))
```