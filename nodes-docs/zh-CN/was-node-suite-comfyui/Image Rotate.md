# Documentation
- Class name: WAS_Image_Rotate
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

图像旋转方法旨在对一批图像应用指定的旋转。它通过将角度调整到最近的90度来智能处理旋转，并使用指定的重采样过滤器以保持图像质量。该节点的功能在图像预处理和需要进行方向调整的图像操作任务中至关重要。

# Input types
## Required
- images
    - 参数 'images' 是将要旋转的图像批次。它起着至关重要的作用，因为节点的所有操作都围绕这个输入进行。这些图像的质量和格式直接影响旋转过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- rotation
    - 参数 'rotation' 指定旋转角度，单位为度。它至关重要，因为它决定了应用于图像的旋转程度。任何不能被90整除的旋转值都将调整为最近的90的倍数以进行标准处理。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mode
    - 参数 'mode' 确定旋转策略：'internal' 用于标准旋转，'transpose' 用于使用图像转置方法的旋转。它很重要，因为它决定了旋转所使用的底层算法。
    - Comfy dtype: COMBO['transpose', 'internal']
    - Python dtype: str
- sampler
    - 参数 'sampler' 定义了旋转期间使用的重采样过滤器。它很重要，因为它影响旋转后图像的质量。不同的采样器在速度和图像保真度之间提供不同的权衡。
    - Comfy dtype: COMBO['nearest', 'bilinear', 'bicubic']
    - Python dtype: str

# Output types
- images
    - 输出 'images' 包含旋转后的图像批次。它是节点操作的主要结果，很重要，因为它代表了可以用于进一步处理或分析的转换后数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Rotate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'mode': (['transpose', 'internal'],), 'rotation': ('INT', {'default': 0, 'min': 0, 'max': 360, 'step': 90}), 'sampler': (['nearest', 'bilinear', 'bicubic'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'image_rotate'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_rotate(self, images, mode, rotation, sampler):
        batch_tensor = []
        for image in images:
            image = tensor2pil(image)
            if rotation > 360:
                rotation = int(360)
            if rotation % 90 != 0:
                rotation = int(rotation // 90 * 90)
            if sampler:
                if sampler == 'nearest':
                    sampler = Image.NEAREST
                elif sampler == 'bicubic':
                    sampler = Image.BICUBIC
                elif sampler == 'bilinear':
                    sampler = Image.BILINEAR
                else:
                    sampler == Image.BILINEAR
            if mode == 'internal':
                image = image.rotate(rotation, sampler)
            else:
                rot = int(rotation / 90)
                for _ in range(rot):
                    image = image.transpose(2)
            batch_tensor.append(pil2tensor(image))
        batch_tensor = torch.cat(batch_tensor, dim=0)
        return (batch_tensor,)
```