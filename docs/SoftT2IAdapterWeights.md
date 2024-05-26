# Documentation
- Class name: SoftT2IAdapterWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights/T2IAdapter
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

SoftT2IAdapterWeights节点旨在促进控制网络权重的适配，以便将时间关键帧转换为输入适配器权重。它简化了权重分配过程，并确保与底层控制网络机制的兼容性。

# Input types
## Required
- weight_00
    - weight_00参数对于初始化控制权重的基础水平至关重要，影响时间关键帧转换过程的整体效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_01
    - weight_01参数对于调整中间控制权重至关重要，直接影响时间关键帧的细微转换。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_02
    - weight_02参数在微调高级控制权重方面至关重要，决定了时间关键帧适配的精确度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_03
    - weight_03参数对于定义最终控制权重至关重要，决定了时间关键帧转换的最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- flip_weights
    - 当启用flip_weights参数时，会反转控制权重的效果，在权重分布和转换过程中提供另一种视角。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- CONTROL_NET_WEIGHTS
    - 输出CONTROL_NET_WEIGHTS代表适当排列和转换的控制权重，准备应用于时间关键帧进行进一步处理。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: ControlWeights
- TIMESTEP_KEYFRAME
    - 输出TIMESTEP_KEYFRAME提供了一个结构化的时间步关键帧组，封装了控制权重并准备集成到控制网络中。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class SoftT2IAdapterWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'weight_00': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_01': ('FLOAT', {'default': 0.62, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_02': ('FLOAT', {'default': 0.825, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'weight_03': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'flip_weights': ('BOOLEAN', {'default': False})}}
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