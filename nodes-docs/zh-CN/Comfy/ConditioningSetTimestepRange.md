# Documentation
- Class name: ConditioningSetTimestepRange
- Category: advanced/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetTimestepRange 节点旨在修改条件集的时间范围。它允许指定开始和结束的百分比，然后节点将这些百分比应用到条件数据上以设置所需的范围。此节点在控制条件信息的时间范围方面发挥着关键作用，这可以显著影响后续模型操作的行为。

# Input types
## Required
- conditioning
    - 条件参数至关重要，因为它代表了将由节点操作的数据集。这是核心输入，决定了节点的操作以及条件集中时间范围的后续修改。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- start
    - 开始参数定义了要在条件数据内设置的时间范围的开始。它对于确定节点将从何处开始对条件集的时间范围进行更改至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 结束参数表示条件数据内要设置的时间范围的终点。它对于建立节点将修改条件集时间范围的最终点至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的条件参数表示应用指定时间范围后修改的条件集。它很重要，因为它携带了将在模型操作的后续步骤中使用的最新时间信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningSetTimestepRange:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'start': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'set_range'
    CATEGORY = 'advanced/conditioning'

    def set_range(self, conditioning, start, end):
        c = node_helpers.conditioning_set_values(conditioning, {'start_percent': start, 'end_percent': end})
        return (c,)
```