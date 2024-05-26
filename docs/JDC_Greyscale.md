# Documentation
- Class name: GreyScale
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点旨在将输入的彩色图像转换为灰度图像，通过关注亮度变化来增强视觉细节的清晰度。它是图像处理流程中的基础步骤，使得后续的任务，如特征提取和图像分析，能够在简化的灰度数据上更有效地进行。

# Input types
## Required
- IMAGE
    - IMAGE参数是必要的，因为它提供了灰度转换过程的原始输入。它影响节点的整体操作，决定了输出图像的尺寸和质量。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- IMAGE
    - 输出的IMAGE是输入图像的灰度处理版本，对于后续的图像分析任务至关重要，并作为图像处理栈中的基础层。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class GreyScale:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE):
        cimg = conv_tensor_pil(IMAGE)
        gimg = ImageOps.grayscale(cimg)
        rgbimg = Image.new('RGB', (gimg.width, gimg.height))
        rgbimg.paste(gimg)
        return conv_pil_tensor(rgbimg)
```