# Documentation
- Class name: ControlNetLoaderAdvanced
- Category: Adv-ControlNet 🛂🅐🅒🅝
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

ControlNetLoaderAdvanced节点的`load_controlnet`方法旨在高效地加载和管理控制网络配置。它是系统中的关键组件，能够无缝地将控制网络集成到工作流程中。该方法抽象了加载和处理控制网络的复杂性，为用户提供了一个简单直观的接口来访问这些网络。

# Input types
## Required
- control_net_name
    - 参数`control_net_name`对于识别要加载的特定控制网络至关重要。它在节点的执行中起着关键作用，决定了系统中将使用哪个控制网络配置。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- timestep_keyframe
    - 可选参数`timestep_keyframe`允许指定与时间步骤相关的关键帧，这可以影响控制网络在时间变化过程中的应用方式。
    - Comfy dtype: TimestepKeyframeGroup
    - Python dtype: TimestepKeyframeGroup

# Output types
- CONTROL_NET
    - 输出`CONTROL_NET`代表已加载的控制网络，是系统操作中的一个核心元素。它封装了网络的结构和参数，准备用于各种任务和分析。
    - Comfy dtype: Tensor
    - Python dtype: Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ControlNetLoaderAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'control_net_name': (folder_paths.get_filename_list('controlnet'),)}, 'optional': {'timestep_keyframe': ('TIMESTEP_KEYFRAME',)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝'

    def load_controlnet(self, control_net_name, timestep_keyframe: TimestepKeyframeGroup=None):
        controlnet_path = folder_paths.get_full_path('controlnet', control_net_name)
        controlnet = load_controlnet(controlnet_path, timestep_keyframe)
        return (controlnet,)
```