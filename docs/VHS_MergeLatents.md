# Documentation
- Class name: MergeLatents
- Category: Video Helper Suite 🎥🅥🅗🅢/latent
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

MergeLatents节点旨在将两组潜在表示合并为一个单一的连贯结构。它智能地应用指定的合并策略，以确保来自两组的潜在维度匹配，可能将其中一组缩放到与另一组匹配。该节点在将来自不同来源的信息整合成可以进一步处理或分析的统一格式中发挥关键作用。

# Input types
## Required
- latents_A
    - 参数'latents_A'代表要合并的第一组潜在表示。它至关重要，因为它构成了合过程所需的一半输入。这些潜在表示的维度和特性显著影响节点的功能。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- latents_B
    - 参数'latents_B'包含用于合并的第二组潜在表示。它与'latents_A'同等重要，并且与'latents_A'一起，构成了节点操作的完整输入。节点在合并方面的有效性取决于'latents_A'和'latents_B'的兼容性和对齐。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- merge_strategy
    - 参数'merge_strategy'指示如何合并潜在表示。它对于确定节点将遵循的调整大小和对齐过程至关重要，以便将潜在表示组合成一个和谐的结构。
    - Comfy dtype: str
    - Python dtype: str
- scale_method
    - 参数'scale_method'指定在合并过程中用于缩放潜在表示的方法。它很重要，因为它影响合并后潜在表示的质量和分辨率。
    - Comfy dtype: str
    - Python dtype: str
- crop
    - 参数'crop'定义了在合并过程中如果需要，应该如何裁剪潜在表示。它在保持合并后潜在表示的完整性中起着至关重要的作用。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- LATENT
    - 输出'LATENT'包含合并后的潜在表示。它是节点操作的主要结果，对后续处理或分析具有重要价值。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- count
    - 输出'count'提供了合并后的潜在表示的数量。它有助于理解合并操作的范围，并且可以用于进一步处理。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MergeLatents:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents_A': ('LATENT',), 'latents_B': ('LATENT',), 'merge_strategy': (MergeStrategies.list_all,), 'scale_method': (ScaleMethods.list_all,), 'crop': (CropMethods.list_all,)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/latent'
    RETURN_TYPES = ('LATENT', 'INT')
    RETURN_NAMES = ('LATENT', 'count')
    FUNCTION = 'merge'

    def merge(self, latents_A: dict, latents_B: dict, merge_strategy: str, scale_method: str, crop: str):
        latents = []
        latents_A = latents_A.copy()['samples']
        latents_B = latents_B.copy()['samples']
        if latents_A.shape[3] != latents_B.shape[3] or latents_A.shape[2] != latents_B.shape[2]:
            A_size = latents_A.shape[3] * latents_A.shape[2]
            B_size = latents_B.shape[3] * latents_B.shape[2]
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            if use_A_as_template:
                latents_B = comfy.utils.common_upscale(latents_B, latents_A.shape[3], latents_A.shape[2], scale_method, crop)
            else:
                latents_A = comfy.utils.common_upscale(latents_A, latents_B.shape[3], latents_B.shape[2], scale_method, crop)
        latents.append(latents_A)
        latents.append(latents_B)
        merged = {'samples': torch.cat(latents, dim=0)}
        return (merged, len(merged['samples']))
```