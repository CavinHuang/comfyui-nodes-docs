# Documentation
- Class name: DiffControlNetLoaderAdvanced
- Category: Adv-ControlNet 🛂🅐🅒🅝
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

DiffControlNetLoaderAdvanced节点旨在加载和管理高级控制网络，用于复杂的模型操作。它确保与模型预期的权重类型兼容，并验证控制网络权重的完整性。

# Input types
## Required
- model
    - 模型参数对于节点至关重要，因为它定义了将应用控制网络的基础模型。它通过确定控制网络运行的上下文，直接影响节点的执行。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- control_net_name
    - control_net_name参数指定要加载的控制网络的名称。它在识别模型的正确控制网络配置中起着关键作用，影响节点的功能和控制应用的结果。
    - Comfy dtype: CONTROLNET
    - Python dtype: str
## Optional
- timestep_keyframe
    - 可选的timestep_keyframe参数允许指定控制网络中与时间相关的关键帧。它能够细化控制网络随时间的行为，提供对模型操作过程更精细的控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframeGroup

# Output types
- CONTROL_NET
    - 输出CONTROL_NET代表已加载的控制网络，准备应用于模型。它封装了控制网络的配置和权重，是后续模型操作的基本组成部分。
    - Comfy dtype: CONTROLNET
    - Python dtype: ControlNet

# Usage tips
- Infra type: CPU

# Source code
```
class DiffControlNetLoaderAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'control_net_name': (folder_paths.get_filename_list('controlnet'),)}, 'optional': {'timestep_keyframe': ('TIMESTEP_KEYFRAME',)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝'

    def load_controlnet(self, control_net_name, model, timestep_keyframe: TimestepKeyframeGroup=None):
        controlnet_path = folder_paths.get_full_path('controlnet', control_net_name)
        controlnet = load_controlnet(controlnet_path, timestep_keyframe, model)
        if is_advanced_controlnet(controlnet):
            controlnet.verify_all_weights()
        return (controlnet,)
```