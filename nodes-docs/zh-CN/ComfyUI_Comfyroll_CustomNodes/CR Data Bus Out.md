# Documentation
- Class name: CR_DataBusOut
- Category: Comfyroll/Pipe/Bus
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DataBusOut 是一个用于通过管道系统无缝输出数据的节点。它作为数据处理工作流中的关键组件，确保数据能够从一个阶段高效地传输到下一个阶段。该节点的功能集中在管理和促进数据流动上，突出了其在维护系统内部信息交换的完整性和连续性方面的作用。

# Input types
## Required
- pipe
    - ‘pipe’ 参数对于 CR_DataBusOut 节点的运作至关重要，因为它代表了用于传输数据的管道。它是一个通道，允许信息的有序传递，强调了它在节点执行中的重要性。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]

# Output types
- pipe
    - ‘pipe’ 输出参数表示携带处理后数据的管道。它是节点功能的关键元素，因为它负责将数据传递到工作流中的后续阶段。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]
- any1
    - ‘any1’ 输出参数代表由节点处理的通用数据元素。它展示了节点处理各种数据类型的能力，有助于数据处理管道的灵活性。
    - Comfy dtype: Any
    - Python dtype: Any
- any2
    - ‘any2’ 输出参数是节点处理不同类型数据的多功能性的另一个例子。它进一步强调了节点在管道中适应不同数据结构的作用。
    - Comfy dtype: Any
    - Python dtype: Any
- any3
    - ‘any3’ 输出参数，像 ‘any1’ 和 ‘any2’ 一样，表明了节点处理和传递各种数据元素的能力。它是节点采用的更广泛数据管理策略的一部分。
    - Comfy dtype: Any
    - Python dtype: Any
- any4
    - ‘any4’ 输出参数继续展示了节点在管理各种数据输入方面的适应性。它对节点全面的数据处理方法至关重要。
    - Comfy dtype: Any
    - Python dtype: Any
- show_help
    - ‘show_help’ 输出提供了一个链接到文档的链接，以供进一步帮助。对于寻求有关节点操作和功能的更多信息的用户来说，这是一个宝贵的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DataBusOut:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}}
    RETURN_TYPES = ('PIPE_LINE', any_type, any_type, any_type, any_type, 'STRING')
    RETURN_NAMES = ('pipe', 'any1', 'any2', 'any3', 'any4', 'show_help')
    FUNCTION = 'data_out'
    CATEGORY = icons.get('Comfyroll/Pipe/Bus')

    def data_out(self, any1=None, any2=None, any3=None, any4=None, pipe=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-data-bus-out'
        (new_any1, new_any2, new_any3, new_any4) = pipe
        return (pipe, new_any1, new_any2, new_any3, new_any4, show_help)
```