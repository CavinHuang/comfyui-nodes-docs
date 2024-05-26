# Documentation
- Class name: WLSH_SDXL_Quick_Empty_Latent
- Category: WLSH Nodes/latent
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_SDXL_Quick_Empty_Latent节点的'generate'方法负责创建图像的空潜在空间表示。它通过接受图像分辨率和方向参数来操作，然后生成一个填充零的潜在张量。这个潜在张量在图像生成流水线中用于进一步处理或分析，提供了一个可以修改以代表各种图像特征的基础结构。

# Input types
## Required
- resolution
    - ‘resolution’参数定义了要生成潜在空间的图像的尺寸。它是潜在张量大小和结构的关键决定因素，直接影响后续的图像生成过程。
    - Comfy dtype: STR
    - Python dtype: str
- direction
    - ‘direction’参数指定了图像的方向，可以是‘landscape’（横向）或‘portrait’（纵向）。这影响了图像的宽度和高度的解释方式，因此对于正确生成潜在张量至关重要。
    - Comfy dtype: STR
    - Python dtype: str
## Optional
- batch_size
    - ‘batch_size’参数指示单次操作中要处理的图像数量。它是一个可选参数，可用于控制处理的效率，允许同时处理多个图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 'latent'输出提供了生成的潜在空间张量，它是图像生成的基础。它是一个填充零的张量，将被进一步操作以表示所需的图像特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- width
    - 'width'输出表示潜在空间的调整后宽度，它是8的倍数。这个值对于理解生成的潜在张量的维度很重要，并用于图像生成过程。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height'输出表示潜在空间的调整后高度，也是8的倍数。它是潜在张量的维度的重要参数，并在整体图像生成工作流程中发挥作用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_SDXL_Quick_Empty_Latent:
    resolution = ['1024x1024', '1152x896', '1216x832', '1344x768', '1536x640']
    direction = ['landscape', 'portrait']

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'resolution': (s.resolution,), 'direction': (s.direction,), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT', 'INT', 'INT')
    RETURN_NAMES = ('latent', 'width', 'height')
    FUNCTION = 'generate'
    CATEGORY = 'WLSH Nodes/latent'

    def generate(self, resolution, direction, batch_size=1):
        (width, height) = resolution.split('x')
        width = int(width)
        height = int(height)
        if direction == 'portrait':
            (width, height) = (height, width)
        adj_width = width // 8
        adj_height = height // 8
        latent = torch.zeros([batch_size, 4, adj_height, adj_width])
        return ({'samples': latent}, adj_width * 8, adj_height * 8)
```