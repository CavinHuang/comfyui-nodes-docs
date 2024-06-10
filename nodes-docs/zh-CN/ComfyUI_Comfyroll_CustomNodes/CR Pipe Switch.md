# Documentation
- Class name: CR_InputSwitchPipe
- Category: Comfyroll/Pipe
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_InputSwitchPipe节点旨在根据选择输入管理不同处理管道之间的数据流。它通过评估'Input'参数来确定在后续工作流中应该使用提供的两个管道中的哪一个，'pipe1'或'pipe2'。此节点在创建基于输入条件需要不同处理路径的条件工作流中起着关键作用。

# Input types
## Required
- Input
    - ‘Input’参数对于确定活动管道至关重要。它接受一个整数值，其中1表示将使用‘pipe1’，任何其他值表示‘pipe2’。这种选择机制对于通过所需的处理路径指导工作流至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- pipe1
    - ‘pipe1’参数表示节点可用的第一个管道选项。如果‘Input’参数设置为1，它将是一个被激活的管道对象。这允许将预定义的处理路径无缝集成到工作流中。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Any
- pipe2
    - ‘pipe2’参数是提供给节点的替代管道选项。当‘Input’参数不等于1时，它变得活跃，为工作流内的数据处理提供了一个次要路径。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Any

# Output types
- PIPE_LINE
    - ‘PIPE_LINE’输出是基于‘Input’参数选择的管道。它是将被传递给进一步处理的输出，代表根据输入选择的‘pipe1’或‘pipe2’。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Any
- show_help
    - ‘show_help’输出提供了一个指向文档页面的URL以供进一步帮助。它是一个常量字符串，始终指向CR_InputSwitchPipe节点的GitHub wiki页面，为用户提供了关于节点使用和功能的直接链接。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_InputSwitchPipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2}), 'pipe1': ('PIPE_LINE',), 'pipe2': ('PIPE_LINE',)}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('PIPE_LINE', 'show_help')
    OUTPUT_NODE = True
    FUNCTION = 'switch_pipe'
    CATEGORY = icons.get('Comfyroll/Pipe')

    def switch_pipe(self, Input, pipe1, pipe2):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-pipe-switch'
        if Input == 1:
            return (pipe1, show_help)
        else:
            return (pipe2, show_help)
```