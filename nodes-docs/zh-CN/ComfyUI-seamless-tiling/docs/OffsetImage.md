# Documentation
- Class name: OffsetImage
- Category: image
- Output node: False
- Repo Ref: https://github.com/spinagon/ComfyUI-seamless-tiling

OffsetImage节点旨在对输入图像执行平移操作，根据提供的x和y轴百分比值来移动像素。该节点在创建视觉效果中非常重要，可用于对齐、组合或数据增强等不同的图像处理任务。

# Input types
## Required
- pixels
    - ‘pixels’参数是OffsetImage节点的主要输入，代表将被操作的图像数据。它对节点的操作至关重要，因为它决定了将要被平移的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- x_percent
    - ‘x_percent’参数指定沿x轴移动像素的图像宽度的百分比。它影响操作后图像的水平位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_percent
    - ‘y_percent’参数决定沿y轴移动像素的图像高度的百分比。它对于确定图像平移后垂直位置的确定非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- offset_image
    - ‘offset_image’输出是将平移应用于输入图像的结果。它代表了移动后的图像，可以用于进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class OffsetImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'x_percent': ('FLOAT', {'default': 50.0, 'min': 0.0, 'max': 100.0, 'step': 1}), 'y_percent': ('FLOAT', {'default': 50.0, 'min': 0.0, 'max': 100.0, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = 'image'

    def run(self, pixels, x_percent, y_percent):
        (n, y, x, c) = pixels.size()
        y = round(y * y_percent / 100)
        x = round(x * x_percent / 100)
        return (pixels.roll((y, x), (1, 2)),)
```