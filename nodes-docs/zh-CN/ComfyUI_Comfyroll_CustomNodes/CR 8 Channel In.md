# Documentation
- Class name: CR_8ChannelIn
- Category: Comfyroll/Pipe/Bus
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_8ChannelIn节点旨在高效地管理和组织多通道数据输入。它通过将来自八个不同通道的数据加载和组合成单一的管道结构，从而简化了后续数据处理任务的工作流程。

# Input types
## Optional
- pipe
    - 当提供'pipe'参数时，它直接为所有八个通道提供数据，绕过了单独通道输入的需要。它是一个包含每个通道数据的元组，对于维护通道间的数据完整性和连续性至关重要。
    - Comfy dtype: any_type
    - Python dtype: Tuple[Any, ...]
- ch1
    - 'ch1'参数代表输入数据的第一个通道。它是可选的，只有在提供时才会被使用；否则，如果可用，将使用'pipe'输入中对应的值。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch2
    - 'ch2'参数用于数据输入的第二个通道。它的运作方式类似于'ch1'，允许单独指定通道数据，同时也可以通过'pipe'输入替换。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch3
    - 'ch3'参数代表输入数据的第三个通道，其运作方式与'ch1'和'ch2'相同，能够被集体的'pipe'输入覆盖。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch4
    - 'ch4'参数用于数据输入的第四个通道，遵循与前三个通道相同的操作原则。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch5
    - 'ch5'参数代表输入数据的第五个通道，保持了单独通道输入的灵活性，同时受到'pipe'输入的集体数据的影响。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch6
    - 'ch6'参数用于数据输入的第六个通道，遵循与之前通道相同的模式，并受到'pipe'输入的影响。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch7
    - 'ch7'参数代表输入数据的第七个通道，延续了通道输入的一致方法，并且可以通过'pipe'输入替换。
    - Comfy dtype: any_type
    - Python dtype: Any
- ch8
    - 'ch8'参数用于数据输入的第八个，也就是最后一个通道，遵循已建立的输入模式，并是'pipe'输入集体数据管理的一部分。
    - Comfy dtype: any_type
    - Python dtype: Any

# Output types
- pipe
    - 'pipe'输出是一个包含所有八个输入通道组合数据的元组。它是节点的主要输出，代表了进一步处理的结构化数据流。
    - Comfy dtype: any_type
    - Python dtype: Tuple[Any, ...]
- show_help
    - 'show_help'输出提供了指向节点文档页面的URL链接，使用户能够直接访问有关使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_8ChannelIn:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'pipe': (any_type,), 'ch1': (any_type,), 'ch2': (any_type,), 'ch3': (any_type,), 'ch4': (any_type,), 'ch5': (any_type,), 'ch6': (any_type,), 'ch7': (any_type,), 'ch8': (any_type,)}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'load_data'
    CATEGORY = icons.get('Comfyroll/Pipe/Bus')

    def load_data(self, ch1=None, ch2=None, ch3=None, ch4=None, ch5=None, ch6=None, ch7=None, ch8=None, pipe=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-8-channel-in'
        (new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8) = (None, None, None, None, None, None, None, None)
        if pipe is not None:
            (new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8) = pipe
        new_ch1 = ch1 if ch1 is not None else new_ch1
        new_ch2 = ch2 if ch2 is not None else new_ch2
        new_ch3 = ch3 if ch3 is not None else new_ch3
        new_ch4 = ch4 if ch4 is not None else new_ch4
        new_ch5 = ch5 if ch5 is not None else new_ch5
        new_ch6 = ch6 if ch6 is not None else new_ch6
        new_ch7 = ch7 if ch7 is not None else new_ch7
        new_ch8 = ch8 if ch8 is not None else new_ch8
        new_pipe = (new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8)
        return (new_pipe, show_help)
```