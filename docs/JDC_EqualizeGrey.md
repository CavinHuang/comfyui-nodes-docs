# Documentation
- Class name: Equalize
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

该节点类旨在通过调整图像的直方图来增强对比度，这通过分散像素强度值来改善图像的视觉清晰度和细节，使其更适合进一步分析或可视化，确保结果更加清晰和视觉上吸引人。

# Input types
## Required
- IMAGE
    - IMAGE参数是必不可少的，因为它提供了将由节点处理的输入图像。它直接影响输出，决定了增强图像的质量和外观。没有这个输入，节点无法执行其预期功能。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- IMAGE
    - 输出的IMAGE代表输入的加工版本，具有更好的对比度和视觉清晰度。它是节点功能直接的结果，对后续的图像分析或显示至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class Equalize:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'IMAGE': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process_image'
    CATEGORY = 'image/postprocessing'

    def process_image(self, IMAGE):
        cimg = conv_tensor_pil(IMAGE)
        return conv_pil_tensor(ImageOps.equalize(cimg))
```