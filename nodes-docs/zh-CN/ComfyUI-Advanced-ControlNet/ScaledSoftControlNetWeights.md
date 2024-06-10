# Documentation
- Class name: ScaledSoftUniversalWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

ScaledSoftUniversalWeights 类提供了一个方法，用于生成基于提供的乘数和翻转参数进行缩放和可能翻转的控制权重。它通过允许用户调整权重应用的影响和方向性，为控制网络的定制做出贡献。

# Input types
## Required
- base_multiplier
    - base_multiplier 参数对于控制网络权重的缩放至关重要。它决定了每个权重对网络输出的影响程度。参数的范围从 0.0 到 1.0，允许对权重的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- flip_weights
    - flip_weights 参数是一个可选的开关，启用时可以反转权重应用的方向。这对于实现特定效果或纠正控制网络行为中的意外影响可能非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- weights
    - weights 输出代表由节点生成的一组控制权重。这些权重对于塑造控制网络的行为至关重要，并受到输入参数的影响。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: ControlWeights
- timestep_keyframe
    - timestep_keyframe 输出是控制网络内基于时间的控制点的结构化表示。它对于定义权重随时间应用的时间方面特征非常重要。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class ScaledSoftUniversalWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_multiplier': ('FLOAT', {'default': 0.825, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'flip_weights': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights'

    def load_weights(self, base_multiplier, flip_weights):
        weights = ControlWeights.universal(base_multiplier=base_multiplier, flip_weights=flip_weights)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```