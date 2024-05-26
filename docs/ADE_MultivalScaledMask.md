# Documentation
- Class name: MultivalScaledMaskNode
- Category: Animate Diff 🎭🅐🅓/multival
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

MultivalScaledMaskNode 类旨在通过在指定范围内缩放给定的掩码张量来转换它。它根据所选的缩放类型应用线性转换或归一化，确保输出掩码适合在动画或可视化应用程序中进行进一步处理。

# Input types
## Required
- min_float_val
    - 最小浮点值参数定义了掩码张量缩放范围的下限。它在设置掩码的缩放比例中起着至关重要的作用，确保缩放后的最小值如指定的那样。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_float_val
    - 最大浮点值参数设置了掩码张量缩放的上限。它对于确定掩码的缩放比例至关重要，确保缩放后的最大值与期望的最大值一致。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask
    - 掩码参数是一个张量，它将根据指定的最小和最大浮点值进行缩放。它是节点操作的核心元素，因为缩放直接应用于此张量以实现所需的多值效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- scaling
    - 缩放参数确定要应用于掩码张量的缩放类型。它可以是绝对的或相对的，影响如何在指定范围内调整掩码值。
    - Comfy dtype: ScaleType.LIST
    - Python dtype: str

# Output types
- multival
    - MultivalScaledMaskNode 的输出是一个多值张量，代表缩放后的掩码。它非常重要，因为它是节点操作的直接结果，可用于后续的动画或可视化任务。
    - Comfy dtype: MULTIVAL
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MultivalScaledMaskNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'min_float_val': ('FLOAT', {'default': 0.0, 'min': 0.0, 'step': 0.001}), 'max_float_val': ('FLOAT', {'default': 1.0, 'min': 0.0, 'step': 0.001}), 'mask': ('MASK',)}, 'optional': {'scaling': (ScaleType.LIST,)}}
    RETURN_TYPES = ('MULTIVAL',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/multival'
    FUNCTION = 'create_multival'

    def create_multival(self, min_float_val: float, max_float_val: float, mask: Tensor, scaling: str=ScaleType.ABSOLUTE):
        if isinstance(min_float_val, Iterable):
            raise ValueError(f'min_float_val must be type float (no lists allowed here), not {type(min_float_val).__name__}.')
        if isinstance(max_float_val, Iterable):
            raise ValueError(f'max_float_val must be type float (no lists allowed here), not {type(max_float_val).__name__}.')
        if scaling == ScaleType.ABSOLUTE:
            mask = linear_conversion(mask.clone(), new_min=min_float_val, new_max=max_float_val)
        elif scaling == ScaleType.RELATIVE:
            mask = normalize_min_max(mask.clone(), new_min=min_float_val, new_max=max_float_val)
        else:
            raise ValueError(f"scaling '{scaling}' not recognized.")
        return MultivalDynamicNode.create_multival(self, mask_optional=mask)
```