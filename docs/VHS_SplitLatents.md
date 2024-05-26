# Documentation
- Class name: SplitLatents
- Category: Video Helper Suite 🎥🅥🅗🅢/latent
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SplitLatents节点旨在将给定的一组潜在变量根据指定的索引分割成两个不同的组。它在管理和组织潜在数据中扮演着关键角色，允许对视频相关的潜在信息进行更精细的控制和操作。

# Input types
## Required
- latents
    - 'latents'参数是一个包含'samples'的字典，代表要被分割的潜在变量。它对节点的操作至关重要，因为它决定了将要被分割的数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- split_index
    - 'split_index'参数定义了潜在变量将被分割的位置。它很重要，因为它决定了分配给每个组的样本数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- LATENT_A
    - 第一个输出'LATENT_A'，在分割操作后包含第一组的潜在变量。它具有重要的价值，因为它代表了原始潜在数据的一部分。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- A_count
    - 'A_count'输出代表了第一组中潜在变量的数量。它很重要，因为它提供了分割的数量度量。
    - Comfy dtype: INT
    - Python dtype: int
- LATENT_B
    - 'LATENT_B'输出，在分割操作后包含第二组的潜在变量。它很重要，因为它代表了原始潜在数据的剩余部分。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- B_count
    - 'B_count'输出代表了第二组中潜在变量的数量。它很重要，因为它与'A_count'互补，提供了分割的完整度量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SplitLatents:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'split_index': ('INT', {'default': 0, 'step': 1, 'min': BIGMIN, 'max': BIGMAX})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/latent'
    RETURN_TYPES = ('LATENT', 'INT', 'LATENT', 'INT')
    RETURN_NAMES = ('LATENT_A', 'A_count', 'LATENT_B', 'B_count')
    FUNCTION = 'split_latents'

    def split_latents(self, latents: dict, split_index: int):
        latents = latents.copy()
        group_a = latents['samples'][:split_index]
        group_b = latents['samples'][split_index:]
        group_a_latent = {'samples': group_a}
        group_b_latent = {'samples': group_b}
        return (group_a_latent, group_a.size(0), group_b_latent, group_b.size(0))
```