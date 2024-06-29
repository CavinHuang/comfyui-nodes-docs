# Documentation
- Class name: CR_8ChannelOut
- Category: Comfyroll/Pipe/Bus
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_8ChannelOut节点旨在管理和分发数据到八个不同的通道。它在确保信息流在管道中顺畅进行中起着关键作用，确保每个通道都能接收到适当的数据以进行进一步处理或分析。

# Input types
## Required
- pipe
    - 'pipe'参数至关重要，因为它作为数据传递和随后在八个通道中分配的通道。其正确配置对节点的操作和数据流的完整性至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]

# Output types
- pipe
    - 'pipe'输出代表原始数据管道，已经处理完毕，现在准备好供下游节点进一步使用或分析。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]
- ch1
    - 通道1 'ch1' 是接收 'pipe' 中数据部分的八个通道之一。它对于专门处理或处理与此通道相关的数据具有重要意义。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch2
    - 通道2 'ch2' 是另一个处理数据特定部分的通道。它适用于节点操作中为这个特定通道指定的任务。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch3
    - 通道3 'ch3' 用于进一步分流数据，允许并行处理或专门处理不同的数据段。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch4
    - 通道4 'ch4' 是节点管理的多个通道之一，每个通道在数据分配和处理中都扮演着不同的角色。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch5
    - 通道5 'ch5' 被指定用于特定类型的数据处理，确保节点的功能与工作流程的特定要求保持一致。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch6
    - 通道6 'ch6' 是节点多通道架构的一部分，满足复杂系统中多样化的数据处理需求。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch7
    - 通道7 'ch7' 是节点内的一个专用通道，优化以处理特定的数据流以提高工作流程的效率。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch8
    - 通道8 'ch8' 是节点套件中的最后一个通道，完成了数据在所有指定通道中的分配，以进行全面处理。
    - Comfy dtype: any_type
    - Python dtype: Any
- show_help
    - 'show_help'输出提供了指向节点文档的URL链接，为用户提供了直接参考节点指南和使用说明的途径。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_8ChannelOut:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}}
    RETURN_TYPES = ('PIPE_LINE', any_type, any_type, any_type, any_type, any_type, any_type, any_type, any_type, 'STRING')
    RETURN_NAMES = ('pipe', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'show_help')
    FUNCTION = 'data_out'
    CATEGORY = icons.get('Comfyroll/Pipe/Bus')

    def data_out(self, ch1=None, ch2=None, ch3=None, ch4=None, ch5=None, ch6=None, ch7=None, ch8=None, pipe=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-8-channel-out'
        (new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8) = pipe
        return (pipe, new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8, show_help)
```