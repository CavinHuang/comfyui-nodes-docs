# Documentation
- Class name: NoiseLayerReplaceNode
- Category: Animate Diff 🎭🅐🅓/noise layers
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

NoiseLayerReplaceNode旨在为动画目的在模型中操作和生成噪声层。它根据指定的参数用新的噪声替换现有的噪声，允许动态和多样化的动画效果。

# Input types
## Required
- batch_offset
    - 批量偏移参数对于管理动画中的噪声层序列至关重要。它决定了数据批次中的起始点，这对于确保正确操作层非常关键。
    - Comfy dtype: INT
    - Python dtype: int
- noise_type
    - 噪声类型参数决定了将创建的噪声层的类型。它是整体噪声生成过程中的一个关键因素，影响噪声的特性和最终动画效果。
    - Comfy dtype: NoiseLayerType.LIST
    - Python dtype: str
- seed_gen_override
    - 种子生成覆盖参数允许定制噪声层的种子生成过程。当目标是在动画中实现特定的噪声模式或效果时，这可能特别重要。
    - Comfy dtype: SeedNoiseGeneration.LIST_WITH_OVERRIDE
    - Python dtype: str
- seed_offset
    - 种子偏移参数用于调整用于噪声生成的种子值。这可以显著影响生成的噪声模式，提供一种在动画中引入变化的方法。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- prev_noise_layers
    - 先前的噪声层参数用于指定将被替换或修改的现有噪声层。它在动画中噪声的连续性和演变中扮演着关键角色。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: NoiseLayerGroup
- mask_optional
    - 掩码可选参数提供了一种方式，可以选择性地将噪声层应用于动画的某些部分。它可以用于引入针对性效果或保护某些区域免受噪声应用的影响。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- seed_override
    - 种子覆盖参数允许手动控制用于噪声生成的种子值。这对于微调动画中噪声的特定方面可能特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- noise_layers
    - 噪声层输出包含已创建或修改并添加到动画中的噪声层。这些层对于动画序列的视觉外观和行为至关重要。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: NoiseLayerGroup

# Usage tips
- Infra type: CPU

# Source code
```
class NoiseLayerReplaceNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'noise_type': (NoiseLayerType.LIST,), 'seed_gen_override': (SeedNoiseGeneration.LIST_WITH_OVERRIDE,), 'seed_offset': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX})}, 'optional': {'prev_noise_layers': ('NOISE_LAYERS',), 'mask_optional': ('MASK',), 'seed_override': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True})}}
    RETURN_TYPES = ('NOISE_LAYERS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/noise layers'
    FUNCTION = 'create_layers'

    def create_layers(self, batch_offset: int, noise_type: str, seed_gen_override: str, seed_offset: int, prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None):
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        layer = NoiseLayerReplace(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset, seed_override=seed_override, mask=mask_optional)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)
```