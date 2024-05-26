# Documentation
- Class name: ScaledSoftMaskedUniversalWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

类 `ScaledSoftMaskedUniversalWeights` 中的 `load_weights` 方法旨在处理并应用一个软掩码到控制网络的基础权重上。它接受一个掩码张量和两个乘数来缩放掩码值，确保它们落在一个指定的范围内。该方法还提供了锁定掩码的最小值和最大值的选项，防止任何超出给定限制的调整。这个功能对于微调控制权重对网络输出的影响至关重要。

# Input types
## Required
- mask
    - 参数 'mask' 是一个张量，定义了要应用到控制权重上的软掩码。它在确定基础权重被修改的程度中起着关键作用。掩码的值根据提供的乘数进行缩放，使其成为权重调整过程中的一个关键组件。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- min_base_multiplier
    - 参数 'min_base_multiplier' 设置了缩放掩码值的下限。它对于控制掩码对控制权重的最小影响至关重要。此参数确保掩码的效果不会太微妙，允许对网络行为进行清晰和明显的调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_base_multiplier
    - 参数 'max_base_multiplier' 确定了缩放掩码值的上限。它对于控制掩码对控制权重的最大影响至关重要。通过设置此参数，用户可以防止掩码压倒基础权重，保持原始权重和修改后权重之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONTROL_NET_WEIGHTS
    - 输出 'CONTROL_NET_WEIGHTS' 表示应用缩放软掩码后网络的调整控制权重。这个输出很重要，因为它直接影响控制网络的最终输出，反映了基于输入掩码和乘数的修改行为。
    - Comfy dtype: ControlWeights
    - Python dtype: comfy.ControlWeights
- TIMESTEP_KEYFRAME
    - 输出 'TIMESTEP_KEYFRAME' 在特定时间步提供了控制权重的默认关键帧。它对于定义控制权重的时间结构很重要，允许随时间进行动态调整。
    - Comfy dtype: TimestepKeyframe
    - Python dtype: comfy.TimestepKeyframe

# Usage tips
- Infra type: CPU

# Source code
```
class ScaledSoftMaskedUniversalWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'min_base_multiplier': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'max_base_multiplier': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights'

    def load_weights(self, mask: Tensor, min_base_multiplier: float, max_base_multiplier: float, lock_min=False, lock_max=False):
        mask = mask.clone()
        x_min = 0.0 if lock_min else mask.min()
        x_max = 1.0 if lock_max else mask.max()
        if x_min == x_max:
            mask = torch.ones_like(mask) * max_base_multiplier
        else:
            mask = linear_conversion(mask, x_min, x_max, min_base_multiplier, max_base_multiplier)
        weights = ControlWeights.universal_mask(weight_mask=mask)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```