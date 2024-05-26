# Documentation
- Class name: pipeToBasicPipe
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

‘pipeToBasicPipe’节点旨在将复杂的管道配置转换为简化的‘basic_pipe’格式。它作为一个中介，确保提取并组织管道的基本组件，使其更易于进一步处理。该节点在降低管道管理的复杂性方面发挥关键作用，从而提高系统的总体效率。

# Input types
## Required
- pipe
    - ‘pipe’参数对于节点的操作至关重要，因为它代表了需要简化的复杂管道配置。它是主要的输入，决定了节点的执行和生成的‘basic_pipe’的结构。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- my_unique_id
    - ‘my_unique_id’参数虽然是可选的，但可以用来唯一标识转换过程。它为操作增加了可追溯性，这对于复杂系统中的调试或跟踪可能非常重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- basic_pipe
    - ‘basic_pipe’输出包含了原始管道的简化表示。它是一个结构化的输出，保留了管道的核心元素，使其更容易操作并集成到后续流程中。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, Any, Any, Any, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class pipeToBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}, 'hidden': {'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('BASIC_PIPE',)
    RETURN_NAMES = ('basic_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Pipe'

    def doit(self, pipe, my_unique_id=None):
        new_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'))
        del pipe
        return (new_pipe,)
```