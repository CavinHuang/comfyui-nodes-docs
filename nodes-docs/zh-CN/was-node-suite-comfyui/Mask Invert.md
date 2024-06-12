# Documentation
- Class name: WAS_Mask_Invert
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Invert节点旨在反转输入掩码，为某些图像处理任务中操纵图像掩码提供了一种手段。它是应用程序中不可或缺的工具，适用于需要反转二进制掩码数据的情况，例如在图像分割或合成中。

# Input types
## Required
- masks
    - 'masks'参数对于节点的操作至关重要，因为它定义了要反转的二进制掩码。其正确使用对于实现图像处理工作流程中期望的结果至关重要。
    - Comfy dtype: MASK
    - Python dtype: Union[PIL.Image.Image, np.ndarray]

# Output types
- MASKS
    - 'MASKS'输出代表了反转后的二进制掩码，这是节点主要功能的直接结果。它对于依赖于反转掩码进行进一步图像操作的下游流程具有重要意义。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Invert:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'add_masks'

    def add_masks(self, masks):
        return (1.0 - masks,)
```