# Documentation
- Class name: GaussianBlur
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点对图像应用高斯模糊，常用于降低噪声或创建柔和效果。它强调节点在提高图像质量以及通过平滑图像外观为进一步处理做准备的作用。

# Input types
## Required
- IMAGE
    - 图像参数是必需的，因为它是高斯模糊操作的主要输入。它决定了处理后输出的质量和特征。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- blur_radius
    - 模糊半径参数控制模糊效果的程度。它影响最终图像的平滑度，较大的半径会导致更明显的模糊。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 输出图像是应用高斯模糊后的结果。它代表了输入图像的转换，现在具有减少的噪声和更柔和的外观。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class GaussianBlur:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',), 'blur_radius': ('FLOAT', {'default': 1, 'min': 1, 'max': 1024, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE, blur_radius):
        img = conv_tensor_pil(IMAGE)
        return conv_pil_tensor(img.filter(ImageFilter.GaussianBlur(blur_radius)))
```