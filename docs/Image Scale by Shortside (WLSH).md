# Documentation
- Class name: WLSH_Image_Scale_By_Shortside
- Category: WLSH Nodes/upscaling
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Image_Scale_By_Shortside 节点的 'upscale' 方法旨在通过指定的短边长度来调整图像大小。它基于图像的原始尺寸智能确定缩放因子，并应用所选的上采样方法以保持或提高图像质量。

# Input types
## Required
- original
    - “original”参数代表要上采样的图像。它至关重要，因为它是节点执行其操作的来源。节点处理此图像以实现所需的短边长度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - “upscale_method”参数定义了用于上采样图像的算法。它显著影响缩放处理后生成的图像的质量和特性。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area']
    - Python dtype: str
- shortside
    - “shortside”参数决定了上采样后图像较短边的目标长度。它是缩放过程中的关键决定因素，直接影响图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 'IMAGE' 输出是上采样过程的结果，提供了具有指定短边长度的变换图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- width
    - 'width' 输出表示上采样图像的新宽度，是缩放操作的结果。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height' 输出表示上采样图像的新高度，也是缩放过程的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Image_Scale_By_Shortside:
    upscale_methods = ['nearest-exact', 'bilinear', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'original': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'shortside': ('INT', {'default': 512, 'min': 32, 'max': 4096, 'step': 32})}}
    RETURN_TYPES = ('IMAGE', 'INT', 'INT')
    RETURN_NAMES = ('IMAGE', 'width', 'height')
    FUNCTION = 'upscale'
    CATEGORY = 'WLSH Nodes/upscaling'

    def upscale(self, original, upscale_method, shortside):
        old_width = original.shape[2]
        old_height = original.shape[1]
        old_shortside = min(old_width, old_height)
        factor = shortside / max(1, old_shortside)
        new_width = int(old_width * factor)
        new_height = int(old_height * factor)
        print('Processing image with shape: ', old_width, 'x', old_height, 'to ', new_width, 'x', new_height)
        samples = original.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, new_width, new_height, upscale_method, crop='disabled')
        s = s.movedim(1, -1)
        return (s, new_width, new_height)
```