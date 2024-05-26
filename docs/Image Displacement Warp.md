# Documentation
- Class name: WAS_Image_Displacement_Warp
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Displacement_Warp节点旨在对给定的一组图像应用位移变形效果。它使用位移映射和振幅因子来确定变形的程度，从而产生视觉上扭曲的输出，可以用于各种创意和技术应用。

# Input types
## Required
- images
    - 要应用位移变形效果的输入图像。这些图像构成了变换过程的基础层。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- displacement_maps
    - 位移映射指示应用于输入图像的变形效果的方向和强度。地图中的每个像素值对应一个位移向量。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- amplitude
    - 振幅参数控制位移效果的强度。值越高，变形越明显；值越低，效果越微妙。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- images
    - 输出图像是将位移变形效果应用于输入图像的结果，使用指定的位移映射和振幅。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Displacement_Warp:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'displacement_maps': ('IMAGE',), 'amplitude': ('FLOAT', {'default': 25.0, 'min': -4096, 'max': 4096, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'displace_image'
    CATEGORY = 'WAS Suite/Image/Transform'

    def displace_image(self, images, displacement_maps, amplitude):
        WTools = WAS_Tools_Class()
        displaced_images = []
        for i in range(len(images)):
            img = tensor2pil(images[i])
            if i < len(displacement_maps):
                disp = tensor2pil(displacement_maps[i])
            else:
                disp = tensor2pil(displacement_maps[-1])
            disp = self.resize_and_crop(disp, img.size)
            displaced_images.append(pil2tensor(WTools.displace_image(img, disp, amplitude)))
        displaced_images = torch.cat(displaced_images, dim=0)
        return (displaced_images,)

    def resize_and_crop(self, image, target_size):
        (width, height) = image.size
        (target_width, target_height) = target_size
        aspect_ratio = width / height
        target_aspect_ratio = target_width / target_height
        if aspect_ratio > target_aspect_ratio:
            new_height = target_height
            new_width = int(new_height * aspect_ratio)
        else:
            new_width = target_width
            new_height = int(new_width / aspect_ratio)
        image = image.resize((new_width, new_height))
        left = (new_width - target_width) // 2
        top = (new_height - target_height) // 2
        right = left + target_width
        bottom = top + target_height
        image = image.crop((left, top, right, bottom))
        return image
```