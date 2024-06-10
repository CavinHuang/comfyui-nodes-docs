# Documentation
- Class name: Compare
- Category: EasyUse/Logic/Math
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

Compare节点便于评估两个输入之间的逻辑比较，提供了一种直接的方法来确定值之间的关系。它旨在支持各种比较操作，提供了一种灵活直观的方式来将条件逻辑集成到工作流中。通过抽象比较过程，此节点增强了基于数据属性做出决策的能力，有助于构建更加动态和响应灵敏的系统。

# Input types
## Required
- a
    - 参数'a'代表比较操作中的第一个操作数。它是节点功能的核心，因为它设置了与第二个操作数进行比较的基线值。该参数的重要性在于其在确定逻辑比较结果中的作用。
    - Comfy dtype: *
    - Python dtype: Any
- b
    - 参数'b'是用于比较的第二个操作数。它的重要性来自于它与第一个操作数的对比，正是这个参数与比较函数结合，决定了比较的结果。
    - Comfy dtype: *
    - Python dtype: Any
- comparison
    - 参数'comparison'是定义如何比较两个操作数的逻辑操作。它至关重要，因为它决定了评估的性质，并直接影响比较的结果。
    - Comfy dtype: COMBO[compare_functions]
    - Python dtype: str

# Output types
- boolean
    - 输出'boolean'表示逻辑比较的结果，提供了一个二进制的结果，反映了两个输入操作数之间的关系。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Compare:

    @classmethod
    def INPUT_TYPES(s):
        s.compare_functions = list(COMPARE_FUNCTIONS.keys())
        return {'required': {'a': (AlwaysEqualProxy('*'), {'default': 0}), 'b': (AlwaysEqualProxy('*'), {'default': 0}), 'comparison': (s.compare_functions, {'default': 'a == b'})}}
    RETURN_TYPES = ('BOOLEAN',)
    RETURN_NAMES = ('boolean',)
    FUNCTION = 'compare'
    CATEGORY = 'EasyUse/Logic/Math'

    def compare(self, a, b, comparison):
        return (COMPARE_FUNCTIONS[comparison](a, b),)
```