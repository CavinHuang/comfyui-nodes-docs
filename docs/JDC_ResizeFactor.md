# Documentation
- Class name: ResizeFactor
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

ResizeFactor节点旨在调整图像的尺寸，通过指定的因子进行放大或缩小。这一过程对于使图像适应不同的显示要求或后续图像处理任务的输入规格至关重要。

# Input types
## Required
- IMAGE
    - IMAGE参数是必需的，因为它提供了将被节点调整大小的源图像。它直接影响输出，并决定了图像的初始分辨率和格式。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- factor
    - factor参数对于定义图像的缩放比例至关重要。它决定了图像将被放大或缩小多少，从而改变最终的尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- resampler
    - resampler参数对于在调整大小过程中选择使用的插值方法很重要。它影响调整大小后的图像质量和外观。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- IMAGE
    - 输出的IMAGE是调整大小过程的结果，反映了新的尺寸和基于所选重采样方法的潜在质量变化。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class ResizeFactor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',), 'factor': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 10, 'step': 0.01}), 'resampler': (['nearest', 'box', 'bilinear', 'bicubic', 'hamming', 'lanczos'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE, factor, resampler):
        cimg = conv_tensor_pil(IMAGE)
        (w, h) = (int(cimg.width * factor), int(cimg.height * factor))
        sampler = get_pil_resampler(resampler)
        return conv_pil_tensor(cimg.resize((w, h), resample=sampler))
```