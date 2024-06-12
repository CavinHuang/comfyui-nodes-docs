# Documentation
- Class name: DiffControlNetLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DiffControlNetLoader节点旨在将控制网络加载到给定的模型框架中。它抽象了定位和集成控制网络的复杂性，确保模型通过控制机制无缝增强。

# Input types
## Required
- model
    - 模型参数对于DiffControlNetLoader节点至关重要，因为它代表了控制网络将被集成的框架。它是控制网络与模型现有架构交互的基础元素。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- control_net_name
    - control_net_name参数指定要加载的控制网络的唯一标识符。它对节点的操作至关重要，因为它指导检索和应用正确的控制网络配置。
    - Comfy dtype: folder_paths.get_filename_list('controlnet')
    - Python dtype: str

# Output types
- CONTROL_NET
    - 输出CONTROL_NET代表已加载的控制网络，准备与提供的模型集成。它封装了将应用于增强模型功能的控制机制。
    - Comfy dtype: CONTROL_NET
    - Python dtype: comfy.controlnet.ControlNet

# Usage tips
- Infra type: CPU

# Source code
```
class DiffControlNetLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'control_net_name': (folder_paths.get_filename_list('controlnet'),)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'loaders'

    def load_controlnet(self, model, control_net_name):
        controlnet_path = folder_paths.get_full_path('controlnet', control_net_name)
        controlnet = comfy.controlnet.load_controlnet(controlnet_path, model)
        return (controlnet,)
```