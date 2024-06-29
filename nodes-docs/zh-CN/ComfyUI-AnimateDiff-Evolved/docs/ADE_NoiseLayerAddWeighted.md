# Documentation
- Class name: NoiseLayerAddWeightedNode
- Category: Animate Diff 🎭🅐🅓/noise layers
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

NoiseLayerAddWeightedNode 类旨在以加权方式操作和引入噪声到系统中。它是动画过程中的一个关键组件，允许微调噪声特征。该节点的主要功能是向现有组中添加噪声层，确保新噪声元素与现有元素的平衡集成，从而增强动画的整体多样性和复杂性。

# Input types
## Required
- batch_offset
    - batch_offset 参数对于管理噪声层的处理顺序至关重要。它影响动画中噪声层的整体结构和组织，确保每个层在序列中正确定位。
    - Comfy dtype: INT
    - Python dtype: int
- noise_type
    - noise_type 参数定义了要添加到动画中的噪声类型。它在确定噪声的视觉和结构方面起着重要作用，从而影响动画的最终输出。
    - Comfy dtype: NoiseLayerType.LIST
    - Python dtype: str
- seed_gen_override
    - seed_gen_override 参数允许定制噪声生成过程。它对于创建独特的噪声模式和确保动画随机元素所需的随机性很重要。
    - Comfy dtype: SeedNoiseGeneration.LIST_WITH_OVERRIDE
    - Python dtype: str
- seed_offset
    - seed_offset 参数对于控制噪声生成中的随机性至关重要。它确保每个噪声层都有独特且不可预测的质量，有助于增加动画的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- noise_weight
    - noise_weight 参数调整添加到动画中的噪声强度。它是实现所需视觉效果的关键因素，并确保噪声与动画的基本元素保持平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- balance_multiplier
    - balance_multiplier 参数用于微调现有噪声与新增噪声之间的平衡。它确保整体噪声效果和谐并融入动画中。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prev_noise_layers
    - prev_noise_layers 参数是之前生成的噪声层的可选组。它允许在现有噪声结构的基础上继续和构建，保持动画的一致性和连贯性。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: Optional[NoiseLayerGroup]
- mask_optional
    - mask_optional 参数是一个可选的张量，可以用来选择性地将噪声应用于动画的特定区域。它提供了对噪声效果最突出位置的控制。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]
- seed_override
    - seed_override 参数为噪声生成中使用的种子提供了一个可选的覆盖。它可以用来确保可重复性或将特定的噪声模式引入到动画中。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- noise_layers
    - NoiseLayerAddWeightedNode 的输出是修改后的噪声层组，其中包括新添加的加权噪声层。这个输出很重要，因为它构成了进一步处理和动画开发的基础。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: NoiseLayerGroup

# Usage tips
- Infra type: CPU

# Source code
```
class NoiseLayerAddWeightedNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'noise_type': (NoiseLayerType.LIST,), 'seed_gen_override': (SeedNoiseGeneration.LIST_WITH_OVERRIDE,), 'seed_offset': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX}), 'noise_weight': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'balance_multiplier': ('FLOAT', {'default': 1.0, 'min': 0.0, 'step': 0.001})}, 'optional': {'prev_noise_layers': ('NOISE_LAYERS',), 'mask_optional': ('MASK',), 'seed_override': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True})}}
    RETURN_TYPES = ('NOISE_LAYERS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/noise layers'
    FUNCTION = 'create_layers'

    def create_layers(self, batch_offset: int, noise_type: str, seed_gen_override: str, seed_offset: int, noise_weight: float, balance_multiplier: float, prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None):
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        layer = NoiseLayerAddWeighted(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset, seed_override=seed_override, mask=mask_optional, noise_weight=noise_weight, balance_multiplier=balance_multiplier)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)
```