# Documentation
- Class name: VividSharpen
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

VividSharpen 节点旨在通过应用锐化算法增强图像的清晰度和锐利度。它调整视觉细节以创造更加生动和清晰的外观，适用于图像编辑中的后期处理任务。

# Input types
## Required
- images
    - ‘images’参数是锐化过程的输入。它至关重要，因为它决定了将要被增强的内容。输入图像的质量和分辨率直接影响锐化的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- radius
    - ‘radius’参数控制锐化前应用的模糊效果的范围。这是一个重要的调整因素，它影响输出图像中锐度的程度，允许对最终视觉外观进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - ‘strength’参数定义了锐化效果的强度。它很重要，因为它允许用户控制锐化的激进程度，从而产生具有不同细节和清晰度级别的图像。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- images
    - 输出的‘images’是经过锐化算法处理后具有增强锐度和清晰度的图像。它们已准备好用于进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class VividSharpen:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'radius': ('FLOAT', {'default': 1.5, 'min': 0.01, 'max': 64.0, 'step': 0.01}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'sharpen'
    CATEGORY = 'image/postprocessing'

    def sharpen(self, images, radius, strength):
        results = []
        if images.size(0) > 1:
            for image in images:
                image = tensor2pil(image)
                results.append(pil2tensor(vivid_sharpen(image, radius=radius, strength=strength)))
            results = torch.cat(results, dim=0)
        else:
            results = pil2tensor(vivid_sharpen(tensor2pil(images), radius=radius, strength=strength))
        return (results,)
```