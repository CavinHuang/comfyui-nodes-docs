# Documentation
- Class name: CR_DataBusIn
- Category: Comfyroll/Pipe/Bus
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DataBusIn是一个用于管理和路由数据流的节点。它通过管道系统传输各种类型的数据，确保数据流在管道架构内有序且高效。此节点在数据流整合中发挥关键作用，允许进行复杂的数据操作和处理工作流程。

# Input types
## Optional
- pipe
    - 'pipe'参数是节点操作的关键元素，它代表了用于传输信息的数据管道。其灵活性允许处理各种数据类型，增强了节点在处理不同数据场景时的多功能性。
    - Comfy dtype: any
    - Python dtype: Any
- any1
    - 'any1'参数是一个可选输入，用于将额外的数据注入到管道中。它增强了节点处理多种数据输入的能力，有助于提升系统的整体数据处理能力。
    - Comfy dtype: any
    - Python dtype: Any
- any2
    - 'any2'参数是另一个可选输入，它补充了数据管道，允许管理更复杂的数据结构。它在节点处理和路由更多种类数据类型的能力中起着重要作用。
    - Comfy dtype: any
    - Python dtype: Any
- any3
    - 'any3'参数用于将更多的数据元素引入到管道中。这是一个可选输入，有助于节点在处理各种数据时的适应性，从而扩展了节点在不同数据处理任务中的实用性。
    - Comfy dtype: any
    - Python dtype: Any
- any4
    - 'any4'参数作为节点的另一个可选输入，提供了将更多数据纳入管道的手段。它强调了节点设计中容纳各种数据输入的能力，这对于全面数据处理需求至关重要。
    - Comfy dtype: any
    - Python dtype: Any

# Output types
- pipe
    - 'pipe'输出是一个包含处理后数据元素的元组，代表了节点数据路由和处理活动的成果。它标志着经过操作的信息流已经结构化，现在已准备好在管道系统中进一步使用。
    - Comfy dtype: tuple
    - Python dtype: Tuple[Any, ...]
- show_help
    - 'show_help'输出提供了指向节点文档的URL链接，为用户提供了直接参考节点指南和帮助的途径。它是理解节点功能并在数据管道中有效利用它的重要工具。
    - Comfy dtype: string
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DataBusIn:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'pipe': (any_type,), 'any1': (any_type,), 'any2': (any_type,), 'any3': (any_type,), 'any4': (any_type,)}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'load_data'
    CATEGORY = icons.get('Comfyroll/Pipe/Bus')

    def load_data(self, any1=None, any2=None, any3=None, any4=None, pipe=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-data-bus-in'
        (new_any1, new_any2, new_any3, new_any4) = (None, None, None, None)
        if pipe is not None:
            (new_any1, new_any2, new_any3, new_any4) = pipe
        new_any1 = any1 if any1 is not None else new_any1
        new_any2 = any2 if any2 is not None else new_any2
        new_any3 = any3 if any3 is not None else new_any3
        new_any4 = any4 if any4 is not None else new_any4
        new_pipe = (new_any1, new_any2, new_any3, new_any4)
        return (new_pipe, show_help)
```