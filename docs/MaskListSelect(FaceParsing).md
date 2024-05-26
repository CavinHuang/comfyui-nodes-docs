# Documentation
- Class name: MaskListSelect
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

MaskListSelect节点旨在从一系列掩码中选择和操作特定的元素。它对包含多个掩码的张量和一个索引进行操作，以识别所需的掩码。该节点的主要功能是从列表中提取单个掩码，以便进一步处理或分析。

# Input types
## Required
- mask
    - 'mask'参数是一个包含多个掩码的张量。它对节点的操作至关重要，因为它是提取所需掩码的主要数据源。张量内的掩码预期以一种允许单独选择的格式存在。
    - Comfy dtype: "MASK"
    - Python dtype: torch.Tensor
- index
    - 'index'参数是一个整数，它指定了要在张量中选择的掩码的位置。它在确定将提取哪个掩码以供进一步使用中起着关键作用。默认值设置为0，对应于列表中的第一个掩码。
    - Comfy dtype: "INT"
    - Python dtype: int

# Output types
- selected_mask
    - MaskListSelect节点的输出是一个从输入掩码列表中提取的单个掩码张量。这个输出可以用于下游任务，如掩码应用、可视化或进一步分析。
    - Comfy dtype: "MASK"
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskListSelect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK', {}), 'index': ('INT', {'default': 0, 'min': 0, 'step': 1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, mask: Tensor, index: int):
        return (mask[index].unsqueeze(0),)
```