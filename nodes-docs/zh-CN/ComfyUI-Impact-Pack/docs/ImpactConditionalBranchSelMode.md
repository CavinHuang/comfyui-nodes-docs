# Documentation
- Class name: ImpactConditionalBranchSelMode
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactConditionalBranchSelMode节点的'doit'方法在工作流中充当条件开关。它评估'cond'输入来决定是返回'tt_value'（真值）还是'ff_value'（假值），从而根据条件指导执行流程。

# Input types
## Required
- cond
    - 参数'cond'是一个布尔值，它决定了节点的执行路径。它至关重要，因为它直接影响返回'tt_value'还是'ff_value'，从而影响下游操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- sel_mode
    - 参数'sel_mode'指示节点应基于提示还是执行进行选择。它很重要，因为它可以在不改变条件的情况下改变节点的行为，提供决策过程中的灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tt_value
    - 当条件为真时，'tt_value'是返回的值。它的重要性在于为肯定情况定义节点的结果，这对工作流中的后续步骤至关重要。
    - Comfy dtype: any_typ
    - Python dtype: Any
- ff_value
    - 当条件为假时，'ff_value'是返回的值。它很重要，因为它为否定情况设置了节点的输出，这对于后续工作流程的连续性和逻辑可能至关重要。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- result
    - 'result'输出表示条件执行的结果。如果条件为真，它是'tt_value'；如果条件为假，它是'ff_value'，为后续操作提供关键数据。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactConditionalBranchSelMode:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'cond': ('BOOLEAN',), 'sel_mode': ('BOOLEAN', {'default': True, 'label_on': 'select_on_prompt', 'label_off': 'select_on_execution'})}, 'optional': {'tt_value': (any_typ,), 'ff_value': (any_typ,)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = (any_typ,)

    def doit(self, cond, sel_mode, tt_value=None, ff_value=None):
        print(f'tt={tt_value is None}\nff={ff_value is None}')
        if cond:
            return (tt_value,)
        else:
            return (ff_value,)
```