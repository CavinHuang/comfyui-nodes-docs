# Documentation
- Class name: ImageResizeCalculator
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

ImageResizeCalculator节点旨在在保持图像纵横比的同时智能调整图像大小，满足特定要求，如目标尺寸和对齐到8的倍数，这对于某些图像处理任务至关重要。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点操作的主要输入。它决定了将要处理的源材料，影响节点的输出尺寸和计算。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_size
    - 目标尺寸参数指定了调整大小后的图像的期望尺寸。它在调整大小的过程中起着至关重要的作用，直接影响最终的尺寸和缩放计算。
    - Comfy dtype: INT
    - Python dtype: int
- force_8x
    - force_8x参数决定调整后的尺寸是否应该对齐到8的倍数。这对于某些从这种对齐中受益的图像处理算法来说尤其重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- width
    - 宽度输出提供了调整大小后图像的新宽度，这是节点调整大小计算的直接结果。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出对应于调整大小后图像的新高度，这是调整大小过程的另一个关键结果。
    - Comfy dtype: INT
    - Python dtype: int
- min
    - 最小值输出指示调整大小后的两个维度中较小的一个，提供了调整大小后图像的宽高比的洞察。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - 缩放输出表示从原始宽度到新宽度的缩放因子，对于理解调整大小变换来说是一个关键值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_r
    - scale_r输出表示从原始高度到新高度的缩放因子的倒数，提供了对垂直调整大小方面的全面理解。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class ImageResizeCalculator:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE', {}), 'target_size': ('INT', {'default': 512, 'min': 1, 'step': 1}), 'force_8x': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'FLOAT', 'FLOAT')
    RETURN_NAMES = ('width', 'height', 'min', 'scale', 'scale_r')
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, image: Tensor, target_size: int, force_8x: bool):
        w = image[0].shape[1]
        h = image[0].shape[0]
        ratio = h * 1.0 / w
        if w >= h:
            w_new = target_size
            h_new = target_size * ratio
            if force_8x:
                w_new = int(w_new / 8) * 8
                h_new = int(h_new / 8) * 8
            return (w_new, int(h_new), h_new, w_new * 1.0 / w, w * 1.0 / w_new)
        else:
            w_new = target_size / ratio
            h_new = target_size
            if force_8x:
                w_new = int(w_new / 8) * 8
                h_new = int(h_new / 8) * 8
            return (int(w_new), h_new, w_new, h_new * 1.0 / h, h * 1.0 / h_new)
```