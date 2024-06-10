# Documentation
- Class name: SoftControlNetWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights/ControlNet
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

SoftControlNetWeights 类旨在管理和处理控制网络的权重，可能在机器学习或模拟环境中使用。它封装了加载和组织这些权重的逻辑，确保它们被正确应用以影响网络的行为。

# Input types
## Required
- weight_00
    - weight_00 参数是一个浮点数，它对控制网络的总体权重有所贡献。它在确定对网络行为的初始影响中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- flip_weights
    - flip_weights 参数是一个布尔值，当设置时，表示权重在应用于控制网络时应翻转或反转。这可以显著改变网络的响应。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- weights
    - 权重输出代表已处理和组织的控制网络权重集合，这些权重已被加载并准备好在网络内应用。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: ControlWeights
- timestep_keyframe
    - timestep_keyframe 输出是控制网络操作中某个时间点的结构化表示。它包括诸如开始百分比和强度等细节，这些对于时间控制至关重要。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframe

# Usage tips
- Infra type: CPU

# Source code
```
class SoftControlNetWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'weight_00': ('FLOAT', {'default': 0.09941396206337118, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_01': ('FLOAT', {'default': 0.12050177219802567, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_02': ('FLOAT', {'default': 0.14606275417942507, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_03': ('FLOAT', {'default': 0.17704576264172736, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_04': ('FLOAT', {'default': 0.214600924414215, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_05': ('FLOAT', {'default': 0.26012233262329093, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_06': ('FLOAT', {'default': 0.3152997971191405, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_07': ('FLOAT', {'default': 0.3821815722656249, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_08': ('FLOAT', {'default': 0.4632503906249999, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_09': ('FLOAT', {'default': 0.561515625, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_10': ('FLOAT', {'default': 0.6806249999999999, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_11': ('FLOAT', {'default': 0.825, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_12': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'flip_weights': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights/ControlNet'

    def load_weights(self, weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12, flip_weights):
        weights = [weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12]
        weights = ControlWeights.controlnet(weights, flip_weights=flip_weights)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```