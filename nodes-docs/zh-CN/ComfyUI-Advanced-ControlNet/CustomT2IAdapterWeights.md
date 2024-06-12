# Documentation
- Class name: CustomT2IAdapterWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights/T2IAdapter
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

CustomT2IAdapterWeights节点旨在管理和调整控制网络的权重，特别适用于将输入数据转换为所需的输出形状。它强调了在不同关键帧上定制权重分布，以实现对转换过程的精确控制。

# Input types
## Required
- weight_00
    - weight_00参数对于定义转换的初始影响至关重要。它为输入数据在控制网络中的初始权重设定了一个基线，影响转换过程的整体平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_01
    - weight_01参数通过调整中间权重值来进一步完善转换过程。它在形成关键帧之间的过渡中起着重要作用，确保转换平滑且连贯。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_02
    - weight_02参数对于控制转换后期的权重分布至关重要。它确保转换在朝向最终关键帧的过程中保持其预期的方向和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_03
    - weight_03参数决定了转换的最终影响，确保输出紧密匹配所需的形状。它是实现转换过程最后阶段所需精度的关键组成部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- flip_weights
    - flip_weights参数允许权重分布的反转，为转换方向提供了额外的控制层。当转换需要反转标准权重应用顺序时，这可能特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- CONTROL_NET_WEIGHTS
    - CONTROL_NET_WEIGHTS输出代表了为控制网络定制和排列的适应性权重。这些权重在引导网络的转换能力以实现所需输出形状方面至关重要。
    - Comfy dtype: ControlWeights
    - Python dtype: ControlWeights
- TIMESTEP_KEYFRAME
    - TIMESTEP_KEYFRAME输出是一系列对应于转换过程中特定时间点的关键帧。这些关键帧在定义转换的时间结构和进度方面起着重要作用。
    - Comfy dtype: TimestepKeyframeGroup
    - Python dtype: TimestepKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class CustomT2IAdapterWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'weight_00': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_01': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_02': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_03': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'flip_weights': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights/T2IAdapter'

    def load_weights(self, weight_00, weight_01, weight_02, weight_03, flip_weights):
        weights = [weight_00, weight_01, weight_02, weight_03]
        weights = get_properly_arranged_t2i_weights(weights)
        weights = ControlWeights.t2iadapter(weights, flip_weights=flip_weights)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```