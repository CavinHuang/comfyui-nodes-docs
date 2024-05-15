# Documentation
- Class name: EmptyLatentImage
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

EmptyLatentImage节点旨在生成一个空的潜在空间表示。它作为潜在空间中图像的占位符，提供了一个填充了零的结构化张量，可以用作进一步图像生成过程的起点。

# Input types
## Required
- width
    - 宽度参数定义了潜在图像的宽度。它对于设置生成的潜在空间的水平分辨率至关重要，并在确定图像的整体结构中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数指定了潜在图像的高度。它对于建立潜在空间的垂直分辨率至关重要，是图像最终尺寸的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- batch_size
    - batch_size参数决定了一次生成的潜在图像的数量。它对于控制图像生成过程的效率很重要，尤其是在处理大量数据时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - samples输出提供了生成的潜在空间表示。它是一个零张量，用作后续图像处理或生成任务的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class EmptyLatentImage:

    def __init__(self):
        self.device = comfy.model_management.intermediate_device()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'generate'
    CATEGORY = 'latent'

    def generate(self, width, height, batch_size=1):
        latent = torch.zeros([batch_size, 4, height // 8, width // 8], device=self.device)
        return ({'samples': latent},)
```