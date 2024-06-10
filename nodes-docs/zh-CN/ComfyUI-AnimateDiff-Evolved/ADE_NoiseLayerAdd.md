# Documentation
- Class name: NoiseLayerAddNode
- Category: Animate Diff 🎭🅐🅓/noise layers
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

NoiseLayerAddNode 类旨在管理向动画中添加噪声层。它负责根据指定的参数创建和组织噪声层，确保将噪声无缝集成到动画过程中，以增强多样性和细节。

# Input types
## Required
- batch_offset
    - 批次偏移参数对于管理动画中的噪声层序列至关重要。它决定了噪声应用的起始点，从而影响整个动画中噪声的分布和模式。
    - Comfy dtype: INT
    - Python dtype: int
- noise_type
    - 噪声类型参数定义了要添加到动画中的噪声类别。它是塑造噪声视觉特征的关键决定因素，影响动画输出的最终美感。
    - Comfy dtype: NoiseLayerType.LIST
    - Python dtype: str
- seed_gen_override
    - 种子生成覆盖参数允许自定义噪声生成过程。它提供了一种控制噪声模式的随机性和独特性的方法，为动画的噪声特性提供了一层微调。
    - Comfy dtype: SeedNoiseGeneration.LIST_WITH_OVERRIDE
    - Python dtype: str
- seed_offset
    - 种子偏移参数在调整噪声模式的起始点方面起着重要作用。它可以显著改变初始噪声配置，从而导致动画噪声呈现的变化。
    - Comfy dtype: INT
    - Python dtype: int
- noise_weight
    - 噪声权重参数调整被添加到动画中的噪声强度。它是控制噪声效果显著性的一个关键因素，允许将噪声平衡地集成到动画中。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prev_noise_layers
    - 之前的噪声层参数指的是现有的噪声层集合。它很重要，因为它为新噪声层的集成提供了上下文，确保了动画噪声结构内的连续性和一致性。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: Optional[NoiseLayerGroup]
- mask_optional
    - 掩码可选参数用于为噪声层定义一个可选的掩码。它可以被用来选择性地将噪声应用于动画的特定区域，提供对噪声分布的一定程度的控制。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]
- seed_override
    - 种子覆盖参数允许手动指定噪声生成的种子。它特别适用于复制或自定义动画中的特定噪声模式。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- noise_layers
    - 输出噪声层表示添加新噪声层后更新的噪声层集合。这个输出很重要，因为它反映了动画噪声结构的当前状态，为进一步的处理或分析提供了基础。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: NoiseLayerGroup

# Usage tips
- Infra type: CPU

# Source code
```
class NoiseLayerAddNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'noise_type': (NoiseLayerType.LIST,), 'seed_gen_override': (SeedNoiseGeneration.LIST_WITH_OVERRIDE,), 'seed_offset': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX}), 'noise_weight': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'prev_noise_layers': ('NOISE_LAYERS',), 'mask_optional': ('MASK',), 'seed_override': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True})}}
    RETURN_TYPES = ('NOISE_LAYERS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/noise layers'
    FUNCTION = 'create_layers'

    def create_layers(self, batch_offset: int, noise_type: str, seed_gen_override: str, seed_offset: int, noise_weight: float, prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None):
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        layer = NoiseLayerAdd(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset, seed_override=seed_override, mask=mask_optional, noise_weight=noise_weight)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)
```