# Documentation
- Class name: AreaToMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点将带有RGBA通道的图像转换为掩码，专注于通过移除透明度和应用切割技术来隔离感兴趣的特定区域。它强调在图像处理领域内对视觉数据进行转换以进行进一步的分析或操作。

# Input types
## Required
- RGBA
    - RGBA输入至关重要，因为它提供了节点执行转换为掩码所需的原始图像数据。它是节点操作的基础，决定了结果掩码的质量和范围。
    - Comfy dtype: image
    - Python dtype: PIL.Image

# Output types
- MASK
    - 输出掩码是节点操作的重要产物，代表了输入图像中感兴趣的隔离区域。它作为后续图像处理任务的关键组成部分，使得精确的操作和分析成为可能。
    - Comfy dtype: tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class AreaToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'RGBA': ('RGBA',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, RGBA):
        mask = AreaToMask_run(RGBA)
        return (mask,)
```