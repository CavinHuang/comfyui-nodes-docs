# Documentation
- Class name: If
- Category: EasyUse/Logic/Math
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

If节点作为一个条件执行单元，评估输入的条件，并决定采取两个提供的分支中的哪一个，从而在计算图中构建控制流。

# Input types
## Required
- any
    - ‘any’输入是一个条件表达式，它决定了If节点的流程。它对于确定哪个输出分支将被执行至关重要。
    - Comfy dtype: *
    - Python dtype: Any
- if
    - ‘if’输入代表当‘any’条件满足时要执行的动作。它是节点功能的重要组成部分，因为它定义了肯定的结果。
    - Comfy dtype: *
    - Python dtype: Any
- else
    - ‘else’输入定义了当‘any’条件不满足时执行的替代动作。它对于在节点内提供完整的条件逻辑至关重要。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- ?
    - If节点的输出是根据‘any’条件的评估结果，来自‘if’或‘else’输入之一的结果。它代表了条件执行的最终结果。
    - Comfy dtype: *
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class If:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'any': (AlwaysEqualProxy('*'),), 'if': (AlwaysEqualProxy('*'),), 'else': (AlwaysEqualProxy('*'),)}}
    RETURN_TYPES = (AlwaysEqualProxy('*'),)
    RETURN_NAMES = ('?',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic/Math'

    def execute(self, *args, **kwargs):
        return (kwargs['if'] if kwargs['any'] else kwargs['else'],)
```