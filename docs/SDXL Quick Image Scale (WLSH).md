# Documentation
- Class name: WLSH_SDXL_Quick_Image_Scale
- Category: WLSH Nodes/upscaling
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_SDXL_Quick_Image_Scale节点的'upscale'方法旨在高效提升输入图像的分辨率。它提供了多种上采样方法供选择，确保图像根据所需的分辨率和方向进行缩放。该节点还提供了裁剪图像以获得更好构图的灵活性，使其成为图像增强任务的多功能工具。

# Input types
## Required
- original
    - ‘original’参数是需要上采样的输入图像。它是整个操作的关键元素，因为整个操作都围绕着增强这张图像。原始图像的质量和格式直接影响最终上采样的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - ‘upscale_method’参数决定了用于上采样图像的算法。它显著影响最终图像质量和上采样过程的性能。用户可以根据他们的具体需求从‘nearest-exact’、‘bilinear’或‘area’方法中选择。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area']
    - Python dtype: str
- resolution
    - ‘resolution’参数指定了上采样图像的目标分辨率。它至关重要，因为它决定了原始图像将被缩放到的尺寸。分辨率的选择影响细节水平和最终图像大小。
    - Comfy dtype: COMBO['1024x1024', '1152x896', '1216x832', '1344x768', '1536x640']
    - Python dtype: str
- direction
    - ‘direction’参数定义了上采样图像的方向。它对于确保图像根据其预期用途（无论是横向还是纵向观看）正确显示非常重要。
    - Comfy dtype: COMBO['landscape', 'portrait']
    - Python dtype: str
- crop
    - ‘crop’参数允许对上采样图像进行可选裁剪。它可以设置为‘disabled’以不进行裁剪或‘center’以从中心裁剪图像。这个特性可以改善最终图像的构图。
    - Comfy dtype: COMBO['disabled', 'center']
    - Python dtype: str

# Output types
- upscaled_image
    - ‘upscaled_image’输出是上采样过程的结果。它代表了原始图像增强到指定分辨率和方向的结果。这个输出的质量和外观直接反映了输入参数和节点的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_SDXL_Quick_Image_Scale:
    upscale_methods = ['nearest-exact', 'bilinear', 'area']
    resolution = ['1024x1024', '1152x896', '1216x832', '1344x768', '1536x640']
    direction = ['landscape', 'portrait']
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'original': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'resolution': (s.resolution,), 'direction': (s.direction,), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'WLSH Nodes/upscaling'

    def upscale(self, original, upscale_method, resolution, direction, crop):
        (width, height) = resolution.split('x')
        new_width = int(width)
        new_height = int(height)
        if direction == 'portrait':
            (new_width, new_height) = (new_height, new_width)
        old_width = original.shape[2]
        old_height = original.shape[1]
        samples = original.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, new_width, new_height, upscale_method, crop)
        s = s.movedim(1, -1)
        return (s,)
```