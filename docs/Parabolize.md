# Documentation
- Class name: Parabolize
- Category: postprocessing/Color Adjustments
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

Parabolize节点旨在对图像应用抛物线变换，通过调整其颜色和对比度来增强其视觉特征。它通过应用一个数学函数来实现这一点，该函数基于给定的系数和顶点参数来操作像素值，从而产生可用于各种创意或分析目的的风格化输出。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入图像。它对节点的操作至关重要，因为它是抛物线变换的对象。图像的内容和格式直接影响节点执行的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- coeff
    - 系数参数决定了应用于图像的抛物线效果的程度。它是一个可选参数，允许用户控制变换的强度，默认值提供了一个平衡的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vertex_x
    - vertex_x参数指定了抛物线函数顶点的x坐标。它是一个可选参数，影响图像内抛物线曲线的位置，影响变换像素值的分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vertex_y
    - vertex_y参数定义了抛物线函数顶点的y坐标。它是一个可选参数，调整抛物线曲线的垂直位置，从而影响变换图像的整体亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- parabolized_image
    - parabolized_image输出是将抛物线变换应用于输入图像的结果。它代表了一个新的图像，其像素值经过调整，反映了所选择的系数和顶点参数的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Parabolize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'coeff': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.1}), 'vertex_x': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.1}), 'vertex_y': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'parabolize_image'
    CATEGORY = 'postprocessing/Color Adjustments'

    def parabolize_image(self, image: torch.Tensor, coeff: float, vertex_x: float, vertex_y: float):
        parabolized_image = coeff * torch.pow(image - vertex_x, 2) + vertex_y
        parabolized_image = torch.clamp(parabolized_image, 0, 1)
        return (parabolized_image,)
```