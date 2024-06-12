# Documentation
- Class name: EmptyLatentImagePresets
- Category: KJNodes
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

EmptyLatentImagePresets节点旨在生成潜在图像的预设。它接收诸如尺寸、反转状态和批量大小等参数，以产生潜在图像数组以及相应的宽度和高度。

# Input types
## Required
- dimensions
    - 尺寸参数指定要生成的潜在图像的大小。它至关重要，因为它决定了输出图像的空间分辨率。
    - Comfy dtype: STRING
    - Python dtype: str
- batch_size
    - 批量大小参数定义了在单个批次中要生成的潜在图像的数量。在处理大量数据时，它对于优化计算资源很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- invert
    - 反转参数允许用户反转潜在图像的宽度和高度尺寸。在某些图像方向重要的应用中，这可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- Latent
    - 潜在参数代表生成的潜在图像数组。它很重要，因为它构成了节点功能的核心输出。
    - Comfy dtype: ARRAY
    - Python dtype: torch.Tensor
- Width
    - 宽度参数指示生成的潜在图像的宽度。对于进一步的图像处理任务，这是一条重要的信息。
    - Comfy dtype: INT
    - Python dtype: int
- Height
    - 高度参数指示生成的潜在图像的高度。与宽度一起，它提供了潜在图像的完整尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class EmptyLatentImagePresets:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dimensions': (['512 x 512', '768 x 512', '960 x 512', '1024 x 512', '1536 x 640', '1344 x 768', '1216 x 832', '1152 x 896', '1024 x 1024'], {'default': '512 x 512'}), 'invert': ('BOOLEAN', {'default': False}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('LATENT', 'INT', 'INT')
    RETURN_NAMES = ('Latent', 'Width', 'Height')
    FUNCTION = 'generate'
    CATEGORY = 'KJNodes'

    def generate(self, dimensions, invert, batch_size):
        from nodes import EmptyLatentImage
        result = [x.strip() for x in dimensions.split('x')]
        if invert:
            width = int(result[1].split(' ')[0])
            height = int(result[0])
        else:
            width = int(result[0])
            height = int(result[1].split(' ')[0])
        latent = EmptyLatentImage().generate(width, height, batch_size)[0]
        return (latent, int(width), int(height))
```