# Documentation
- Class name: WLSH_Empty_Latent_Image_By_Ratio
- Category: WLSH Nodes/latent
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Empty_Latent_Image_By_Ratio节点的'generate'方法旨在根据指定的宽高比和方向创建一个空的潜在图像。它计算潜在图像的尺寸并将其初始化为零，这可以作为进一步图像处理任务的起点。

# Input types
## Required
- aspect
    - 参数'aspect'定义了要生成的潜在图像的宽高比。它至关重要，因为它直接影响输出图像的尺寸。
    - Comfy dtype: str
    - Python dtype: str
- direction
    - 参数'direction'指定图像应为横向还是纵向方向，这影响宽度和高度的分配。
    - Comfy dtype: str
    - Python dtype: str
- shortside
    - 参数'shortside'决定了图像较短边的长度，它用于根据宽高比计算完整的尺寸。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- batch_size
    - 参数'batch_size'指示在单个操作中生成的图像数量，提高了一次处理多个图像的效率。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- latent
    - 输出'latent'是一个张量，代表根据输入参数计算出的尺寸的空潜在图像。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- width
    - 输出'width'提供了在考虑宽高比和方向后计算出的潜在图像的宽度。
    - Comfy dtype: int
    - Python dtype: int
- height
    - 输出'height'提供了在考虑宽高比和方向后计算出的潜在图像的高度。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Empty_Latent_Image_By_Ratio:
    aspects = ['1:1', '6:5', '5:4', '4:3', '3:2', '16:10', '16:9', '19:9', '21:9', '2:1', '3:1', '4:1']
    direction = ['landscape', 'portrait']

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'aspect': (s.aspects,), 'direction': (s.direction,), 'shortside': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 64}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT', 'INT', 'INT')
    RETURN_NAMES = ('latent', 'width', 'height')
    FUNCTION = 'generate'
    CATEGORY = 'WLSH Nodes/latent'

    def generate(self, aspect, direction, shortside, batch_size=1):
        (x, y) = aspect.split(':')
        x = int(x)
        y = int(y)
        ratio = x / y
        width = int(shortside * ratio)
        width = width + 63 & -64
        height = shortside
        if direction == 'portrait':
            (width, height) = (height, width)
        adj_width = width // 8
        adj_height = height // 8
        latent = torch.zeros([batch_size, 4, adj_height, adj_width])
        return ({'samples': latent}, adj_width * 8, adj_height * 8)
```