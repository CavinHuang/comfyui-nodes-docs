# Documentation
- Class name: ConvertColorSpace
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

ConvertColorSpace节点旨在将图像从一个颜色空间转换到另一个颜色空间。它提供了一个高级接口，用于在RGB、HSV和HSL颜色空间之间无缝转换图像，允许更有效地操作和分析图像数据。

# Input types
## Required
- in_space
    - ‘in_space’参数定义了输入图像的当前颜色空间，这对于确定适当的转换算法至关重要。它通过指定颜色空间转换的起点来影响节点的执行。
    - Comfy dtype: COMBO['RGB', 'HSV', 'HSL']
    - Python dtype: str
- out_space
    - ‘out_space’参数指定了输出图像所需的颜色空间。它是节点操作的关键决定因素，因为它决定了颜色空间转换过程的目标格式。
    - Comfy dtype: COMBO['RGB', 'HSV', 'HSL']
    - Python dtype: str
- image
    - ‘image’参数表示需要转换的输入图像数据。它对节点的功能至关重要，因为它是颜色空间转换的主要数据对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- IMAGE
    - 输出‘IMAGE’表示在指定颜色空间中转换后的图像。它是节点操作的最终结果，对于进一步的图像处理或分析任务具有重要价值。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ConvertColorSpace:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'in_space': (['RGB', 'HSV', 'HSL'],), 'out_space': (['RGB', 'HSV', 'HSL'],), 'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'convert_color_space'
    CATEGORY = 'Masquerade Nodes'

    def convert_color_space(self, in_space, out_space, image):
        if in_space == out_space:
            return (image,)
        image = tensor2rgb(image)
        if in_space == 'HSV':
            hsv = image
        if in_space == 'RGB':
            hsv = rgb2hsv(image)
        elif in_space == 'HSL':
            hsv = hsl2hsv(image)
        if out_space == 'HSV':
            return (hsv,)
        elif out_space == 'RGB':
            return (hsv2rgb(hsv),)
        else:
            assert out_space == 'HSL'
            return (hsv2hsl(hsv),)
```