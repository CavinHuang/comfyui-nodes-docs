# Documentation
- Class name: WeightAdjustAllAddNode
- Category: Animate Diff 🎭🅐🅓/ad settings/weight adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

在`WeightAdjustAllAddNode`类中，`get_weight_adjust`方法旨在对模型中的所有权重应用统一的调整。它通过接受一个加法值，并可选择性地打印调整细节来实现这一点。该方法在动画差异处理过程中微调模型权重至关重要，确保调整一致地应用于整个模型。

# Input types
## Required
- all_ADD
    - 参数`all_ADD`指定了模型中所有权重应该调整的量。这是一个关键的输入，因为它直接影响权重调整的大小，从而影响调整后模型的性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_adjustment
    - 标志`print_adjustment`决定是否打印权重调整的详细信息。这对于调试或监控对模型权重所做的调整非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_weight_adjust
    - 参数`prev_weight_adjust`允许提供先前的权重调整组，可用于建立或修改现有的权重调整。这个参数是可选的，但可以增强权重调整过程的灵活性。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Output types
- WEIGHT_ADJUST
    - `get_weight_adjust`方法的输出是一个`AdjustGroup`对象，它包含了应用指定的`all_ADD`值后的结果权重调整。这个对象很重要，因为它代表了调整后模型权重的更新状态。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class WeightAdjustAllAddNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'all_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('WEIGHT_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/weight adjust'
    FUNCTION = 'get_weight_adjust'

    def get_weight_adjust(self, all_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(all_ADD=all_ADD, print_adjustment=print_adjustment)
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)
```