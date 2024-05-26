# Documentation
- Class name: WLSH_Empty_Latent_Image_By_Resolution
- Category: WLSH Nodes/latent
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Empty_Latent_Image_By_Resolution节点的'generate'方法旨在为给定的分辨率创建一个空的潜在图像空间。它通过提供一个简单的接口来抽象生成潜在空间的复杂性，该接口接受宽度、高度和批量大小作为输入，并输出一个潜在张量以及调整后的维度。

# Input types
## Required
- width
    - ‘width’参数指定了潜在图像的宽度，以像素为单位。它在确定生成的潜在空间的分辨率方面起着关键作用，这直接影响最终图像的质量和细节。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数决定了潜在图像的高度，以像素为单位。与宽度类似，它对于建立分辨率以及生成潜在图像的保真度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- batch_size
    - ‘batch_size’参数是可选的，它决定了在一次操作中生成的潜在图像的数量。它可以用来有效地一次处理多个图像，提高节点的吞吐量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - ‘latent’输出是一个张量，代表生成的潜在图像空间。它是后续图像处理和生成任务的关键组成部分，为这些操作提供了所需的基础数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- width
    - ‘width’输出反映了生成过程后潜在图像的调整宽度。它对于理解生成的潜在空间的实际尺寸很重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’输出提供了潜在图像的调整高度，与宽度类似，它对于了解生成的潜在空间的确切尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Empty_Latent_Image_By_Resolution:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('LATENT', 'INT', 'INT')
    RETURN_NAMES = ('latent', 'width', 'height')
    FUNCTION = 'generate'
    CATEGORY = 'WLSH Nodes/latent'

    def generate(self, width, height, batch_size=1):
        adj_width = width // 8
        adj_height = height // 8
        latent = torch.zeros([batch_size, 4, adj_height, adj_width])
        return ({'samples': latent}, adj_width * 8, adj_height * 8)
```