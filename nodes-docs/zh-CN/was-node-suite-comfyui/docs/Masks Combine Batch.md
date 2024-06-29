# Documentation
- Class name: WAS_Mask_Combine_Batch
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Combine_Batch 节点旨在将多个掩码图像合并为一个单一的、无缝的掩码。这对于需要进一步处理或可视化的应用程序特别有用。该节点接收一批掩码，并输出一个保留了输入掩码中基本特征的组合掩码。

# Input types
## Required
- masks
    - 输入参数'masks'是将要组合的掩码图像列表。它在节点的操作中起着关键作用，因为输出掩码的质量和分辨率直接依赖于输入掩码。掩码应该以兼容的格式进行处理。
    - Comfy dtype: List[Image]
    - Python dtype: List[PIL.Image.Image]

# Output types
- combined_mask
    - 'combined_mask'输出是输入掩码合并的结果。它是一张代表所有输入掩码集体覆盖范围的单个图像，适用于图像分割或视觉特效中的遮罩等应用。
    - Comfy dtype: Image
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Combine_Batch:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'combine_masks'

    def combine_masks(self, masks):
        combined_mask = torch.sum(torch.stack([mask.unsqueeze(0) for mask in masks], dim=0), dim=0)
        combined_mask = torch.clamp(combined_mask, 0, 1)
        return (combined_mask,)
```