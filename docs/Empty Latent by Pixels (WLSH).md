# Documentation
- Class name: WLSH_Empty_Latent_Image_By_Pixels
- Category: WLSH Nodes/latent
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Empty_Latent_Image_By_Pixels 节点的 'generate' 方法旨在根据指定的像素尺寸和纵横比创建一个空的潜在图像表示。它智能地计算潜在图像的宽度和高度，以适应所需的百万像素和方向，确保维度针对处理效率进行了优化。

# Input types
## Required
- aspect
    - “aspect”参数定义了潜在图像的纵横比。它至关重要，因为它直接影响生成图像的形状和尺寸，进而影响后续的处理和分析阶段。
    - Comfy dtype: STRING
    - Python dtype: str
- direction
    - “direction”参数指定图像应为横向或纵向模式。这一点很重要，因为它决定了潜在图像的方向，对于需要特定方向的某些应用来说是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str
- megapixels
    - “megapixels”参数以百万像素为单位设置潜在图像的分辨率。它是一个重要因素，因为它决定了图像的细节水平以及所需的计算资源。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- batch_size
    - “batch_size”参数决定了单次迭代中处理的图像数量。它对于优化计算效率很重要，可以根据可用资源进行调整。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - “latent”输出提供了生成的潜在图像表示。它是一个关键组件，因为它构成了系统内进一步图像处理和分析的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- width
    - “width”输出表示以像素为单位计算出的潜在图像的宽度。它很重要，因为它提供了图像操作和显示所需的空间维度信息。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - “height”输出表示以像素为单位计算出的潜在图像的高度。与宽度一起，它对于理解图像的整体尺寸以用于各种应用至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Empty_Latent_Image_By_Pixels:
    aspects = ['1:1', '5:4', '4:3', '3:2', '16:10', '16:9', '19:9', '21:9', '2:1', '3:1', '4:1']
    direction = ['landscape', 'portrait']

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'aspect': (s.aspects,), 'direction': (s.direction,), 'megapixels': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 16.0, 'step': 0.01}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT', 'INT', 'INT')
    RETURN_NAMES = ('latent', 'width', 'height')
    FUNCTION = 'generate'
    CATEGORY = 'WLSH Nodes/latent'

    def generate(self, aspect, direction, megapixels, batch_size=1):
        (x, y) = aspect.split(':')
        x = int(x)
        y = int(y)
        ratio = x / y
        total = int(megapixels * 1024 * 1024)
        width = int(np.sqrt(ratio * total))
        width = width + 63 & -64
        height = int(np.sqrt(1 / ratio * total))
        height = height + 63 & -64
        if direction == 'portrait':
            (width, height) = (height, width)
        adj_width = width // 8
        adj_height = height // 8
        latent = torch.zeros([batch_size, 4, adj_height, adj_width])
        return ({'samples': latent}, adj_width * 8, adj_height * 8)
```