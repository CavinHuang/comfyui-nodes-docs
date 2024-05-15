# Documentation
- Class name: ConditioningSetAreaStrength
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetAreaStrength节点旨在通过向条件集添加指定的强度值来修改和增强这些条件集。它在调整模型中条件集的影响中发挥关键作用，允许微调模型对不同输入的敏感度。

# Input types
## Required
- conditioning
    - 条件集参数对于定义模型将考虑的基础条件集至关重要。它是节点操作的起点，决定了条件集的初始状态。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- strength
    - 强度参数对于确定条件集对模型输出影响的大小至关重要。它允许调整条件的强度，影响最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的条件集根据输入参数进行了修改，附加了强度值以增强其对模型的影响。它代表了准备好进行进一步处理或分析的更新后的条件集。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningSetAreaStrength:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'append'
    CATEGORY = 'conditioning'

    def append(self, conditioning, strength):
        c = node_helpers.conditioning_set_values(conditioning, {'strength': strength})
        return (c,)
```