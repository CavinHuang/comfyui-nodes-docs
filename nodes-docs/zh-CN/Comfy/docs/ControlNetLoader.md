# Documentation
- Class name: ControlNetLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ControlNetLoader节点旨在高效地加载和集成控制网络到系统中。它是需要操作和分析控制网络结构的应用程序的关键组件。该节点抽象了加载控制网络的复杂性，确保了加载过程的流畅和可靠性。

# Input types
## Required
- control_net_name
    - control_net_name参数对于识别要加载的特定控制网络至关重要。它在节点的操作中起着关键作用，通过将节点指向正确的资源，从而影响过程的执行和结果。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- CONTROL_NET
    - ControlNetLoader节点的输出是一个控制网络结构，这对于系统中的后续处理和分析非常重要。控制网络封装了管理特定系统的规则和交互，使其成为依赖控制网络逻辑的应用程序的基本输出。
    - Comfy dtype: COMBO[str]
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class ControlNetLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'control_net_name': (folder_paths.get_filename_list('controlnet'),)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'loaders'

    def load_controlnet(self, control_net_name):
        controlnet_path = folder_paths.get_full_path('controlnet', control_net_name)
        controlnet = comfy.controlnet.load_controlnet(controlnet_path)
        return (controlnet,)
```