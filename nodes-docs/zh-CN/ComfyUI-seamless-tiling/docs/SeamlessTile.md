# Documentation
- Class name: SeamlessTile
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/spinagon/ComfyUI-seamless-tiling

SeamlessTile 是一个用于修改模型的填充和卷积行为以实现无缝平铺的节点。它调整 Conv2d 层的填充模式和填充值，以实现“循环”效果，这在需要无缝平铺图案的图像处理任务中特别有用。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了将被修改以实现无缝平铺的神经网络。它是节点操作以实现所需平铺效果的核心组件。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- tiling
    - tiling 参数指示应用于模型的平铺类型。它控制是否启用平铺，将其限制在 x 轴、y 轴上，还是完全禁用，影响模型产生无缝图案的能力。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- copy_model
    - copy_model 参数决定在修改之前是否应该复制原始模型，或者就地更改。这通过保留或修改原始模型状态来影响执行。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MODEL
    - 输出的 MODEL 是具有调整过的填充和卷积设置以支持无缝平铺的修改后的神经网络。它很重要，因为它直接影响图像的后续处理和输出质量。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class SeamlessTile:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'tiling': (['enable', 'x_only', 'y_only', 'disable'],), 'copy_model': (['Make a copy', 'Modify in place'],)}}
    CATEGORY = 'conditioning'
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'run'

    def run(self, model, copy_model, tiling):
        if copy_model == 'Modify in place':
            model_copy = model
        else:
            model_copy = copy.deepcopy(model)
        if tiling == 'enable':
            make_circular_asymm(model_copy.model, True, True)
        elif tiling == 'x_only':
            make_circular_asymm(model_copy.model, True, False)
        elif tiling == 'y_only':
            make_circular_asymm(model_copy.model, False, True)
        else:
            make_circular_asymm(model_copy.model, False, False)
        return (model_copy,)
```