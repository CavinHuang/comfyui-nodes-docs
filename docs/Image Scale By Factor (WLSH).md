# Documentation
- Class name: WLSH_Image_Scale_By_Factor
- Category: WLSH Nodes/upscaling
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Image_Scale_By_Factor 节点的 'upscale' 方法旨在通过指定的因子增加输入图像的尺寸。它支持多种放大方法，以在放大过程中保持或提高图像的质量。此节点在需要放大图像的图像处理工作流程中扮演着关键角色。

# Input types
## Required
- original
    - ‘original’ 参数是需要被缩放的输入图像。它是操作的核心，因为节点的所有操作都围绕这张图像进行。原始图像的质量和内容直接影响缩放后输出的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - ‘upscale_method’ 参数决定了用于缩放图像的算法。它对于控制放大图像的质量和特性至关重要。不同的方法可能会产生不同的结果，方法的选择可以显著影响最终的外观。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area']
    - Python dtype: str
- factor
    - ‘factor’ 参数定义了原始图像尺寸乘以的缩放比例。它是一个关键参数，因为它决定了放大图像的最终大小。因子的选择将直接影响细节水平和整体尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- upscaled_image
    - ‘upscaled_image’ 输出是放大过程的结果，反映了按指定因子缩放的输入图像。它很重要，因为它代表了节点操作的直接结果，并用于进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_Image_Scale_By_Factor:
    upscale_methods = ['nearest-exact', 'bilinear', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'original': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'factor': ('FLOAT', {'default': 2.0, 'min': 0.1, 'max': 8.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'WLSH Nodes/upscaling'

    def upscale(self, original, upscale_method, factor):
        old_width = original.shape[2]
        old_height = original.shape[1]
        new_width = int(old_width * factor)
        new_height = int(old_height * factor)
        print('Processing image with shape: ', old_width, 'x', old_height, 'to ', new_width, 'x', new_height)
        samples = original.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, new_width, new_height, upscale_method, crop='disabled')
        s = s.movedim(1, -1)
        return (s,)
```