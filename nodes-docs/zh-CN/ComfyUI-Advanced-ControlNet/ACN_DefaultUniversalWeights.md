# Documentation
- Class name: DefaultWeights
- Category: Adv-ControlNet 🛂🅐🅒🅝/weights
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

DefaultWeights节点的'load_weights'方法旨在初始化并返回一组默认的控制权重和相应的时间步关键帧组。它是构建控制网络的基础组件，确保系统有一个操作的基线权重集。

# Input types

# Output types
- CONTROL_NET_WEIGHTS
    - CONTROL_NET_WEIGHTS输出参数代表网络的默认控制权重。它是塑造控制网络行为的关键元素，因为它定义了后续计算和调整中将使用初始权重。
    - Comfy dtype: ControlWeights
    - Python dtype: ControlWeights
- TIMESTEP_KEYFRAME
    - TIMESTEP_KEYFRAME输出参数封装了与控制权重相关联的关键帧组。它在控制网络的时间动态中起着重要作用，提供了一种结构化的方式来管理和随时间应用权重。
    - Comfy dtype: TimestepKeyframeGroup
    - Python dtype: TimestepKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class DefaultWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {}
    RETURN_TYPES = ('CONTROL_NET_WEIGHTS', 'TIMESTEP_KEYFRAME')
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = 'load_weights'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/weights'

    def load_weights(self):
        weights = ControlWeights.default()
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))
```