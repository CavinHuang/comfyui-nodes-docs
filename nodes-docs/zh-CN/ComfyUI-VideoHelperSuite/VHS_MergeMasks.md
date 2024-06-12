# Documentation
- Class name: MergeMasks
- Category: Video Helper Suite 🎥🅥🅗🅢/mask
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

MergeMasks节点旨在将两个输入掩码合并为单个掩码。它通过使用指定的合并策略和缩放方法，智能处理掩码大小的差异，确保掩码的无缝集成。这个节点特别适用于需要将多个掩码层组合用于进一步处理或可视化的应用场景。

# Input types
## Required
- mask_A
    - 要合并的第一个掩码，是最终组合掩码的关键组成部分。它决定了将第二个掩码集成进去的初始结构。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_B
    - 要合并的第二个掩码，它将根据合并策略与第一个掩码对齐并集成。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- merge_strategy
    - 定义两个掩码应该如何合并，是通过将一个掩码的尺寸匹配到另一个掩码，还是选择两者中较小或较大的一个。
    - Comfy dtype: str
    - Python dtype: str
- scale_method
    - 指定用于缩放掩码以匹配尺寸的方法，这对于合并过程至关重要。
    - Comfy dtype: str
    - Python dtype: str
- crop
    - 指示在缩放过程中要应用的裁剪技术，以确保合并后掩码正确对齐。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MASK
    - 输出是合并过程产生的组合掩码，代表输入掩码的集成结构。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- count
    - 提供已合并掩码的数量，提供对最终掩码中集成的层数的了解。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MergeMasks:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask_A': ('MASK',), 'mask_B': ('MASK',), 'merge_strategy': (MergeStrategies.list_all,), 'scale_method': (ScaleMethods.list_all,), 'crop': (CropMethods.list_all,)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/mask'
    RETURN_TYPES = ('MASK', 'INT')
    RETURN_NAMES = ('MASK', 'count')
    FUNCTION = 'merge'

    def merge(self, mask_A: Tensor, mask_B: Tensor, merge_strategy: str, scale_method: str, crop: str):
        masks = []
        if mask_A.shape[2] != mask_B.shape[2] or mask_A.shape[1] != mask_B.shape[1]:
            A_size = mask_A.shape[2] * mask_A.shape[1]
            B_size = mask_B.shape[2] * mask_B.shape[1]
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            mask_A = torch.unsqueeze(mask_A, 1)
            mask_B = torch.unsqueeze(mask_B, 1)
            if use_A_as_template:
                mask_B = comfy.utils.common_upscale(mask_B, mask_A.shape[3], mask_A.shape[2], scale_method, crop)
            else:
                mask_A = comfy.utils.common_upscale(mask_A, mask_B.shape[3], mask_B.shape[2], scale_method, crop)
            mask_A = torch.squeeze(mask_A, 1)
            mask_B = torch.squeeze(mask_B, 1)
        masks.append(mask_A)
        masks.append(mask_B)
        all_masks = torch.cat(masks, dim=0)
        return (all_masks, all_masks.size(0))
```