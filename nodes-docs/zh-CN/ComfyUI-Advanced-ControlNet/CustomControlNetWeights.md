# Documentation
- Class name: CustomControlNetWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights/ControlNet
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

CustomControlNetWeights 类用于管理和应用自定义权重到控制网络中，允许微调网络的行为。它封装了加载和处理权重的逻辑，确保权重正确地集成到网络的运行中。

# Input types
## Required
- weight_00
    - 权重参数对于调整网络内特定控制机制的影响至关重要。它允许对网络如何响应输入数据的不同方面进行精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- flip_weights
    - flip_weights 参数决定在处理过程中是否应翻转权重，这对于网络内的某些类型的转换或调整可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- weights
    - 权重输出代表处理过的和自定义的控制网络权重，准备应用于网络以执行特定任务或转换。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: ControlWeights
- timestep_keyframe
    - timestep_keyframe 输出提供了控制网络在特定时间点的状态的结构化表示，可用于网络运行中精确的时间控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframe

# Usage tips
- Infra type: CPU

# Source code
```
class CustomControlNetWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'weight_00': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_01': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_02': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_03': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_04': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_05': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_06': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_07': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_08': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_09': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_10': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_11': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_12': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'flip_weights': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights/ControlNet'

    def load_weights(self, weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12, flip_weights):
        weights = [weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12]
        weights = ControlWeights.controlnet(weights, flip_weights=flip_weights)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```