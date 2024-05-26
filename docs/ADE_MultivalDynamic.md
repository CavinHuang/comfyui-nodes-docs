# Documentation
- Class name: MultivalDynamicNode
- Category: Animate Diff 🎭🅐🅓/multival
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

MultivalDynamicNode 类旨在动画框架中动态生成和操作多值数据。它是创建复杂动画的关键组件，允许用户指定一系列值，这些值可以应用于动画的不同方面，如角色运动或场景转换。该节点的功能围绕 'create_multival' 方法展开，该方法智能处理单个和可迭代输入值，并确保输出格式适合下游处理。

# Input types
## Required
- float_val
    - 参数 'float_val' 对于定义节点将用于创建多值数据的基值或值序列至关重要。它既可以接受单个浮点数，也可以接受浮点数的可迭代对象，这在动画场景的不同方面提供了高度的灵活性。该参数对节点执行的影响很大，因为它直接影响输出值的范围和性质。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, List[float]]
## Optional
- mask_optional
    - 参数 'mask_optional' 用于将掩码应用于节点生成的多值数据。这是一个可选的张量，当提供时，允许在动画的不同元素上选择性地应用 'float_val'。这个参数通过启用条件或部分动画效果来增强节点的功能，为最终动画增添了深度。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]

# Output types
- multival
    - 输出 'multival' 表示已处理的多值数据，可供动画流水线使用。它是一个张量，包含了由 'float_val' 参数指定的动态值范围，可能会被 'mask_optional' 参数修改。这个输出很重要，因为它构成了进一步动画开发的基础，并且可以直接集成到渲染过程中。
    - Comfy dtype: MULTIVAL
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MultivalDynamicNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'float_val': ('FLOAT', {'default': 1.0, 'min': 0.0, 'step': 0.001})}, 'optional': {'mask_optional': ('MASK',)}}
    RETURN_TYPES = ('MULTIVAL',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/multival'
    FUNCTION = 'create_multival'

    def create_multival(self, float_val: Union[float, list[float]]=1.0, mask_optional: Tensor=None):
        float_is_iterable = False
        if isinstance(float_val, Iterable):
            float_is_iterable = True
            float_val = list(float_val)
            if mask_optional is not None:
                if len(float_val) < mask_optional.shape[0]:
                    float_val = float_val + float_val[-1] * (mask_optional.shape[0] - len(float_val))
                if mask_optional.shape[0] < len(float_val):
                    mask_optional = extend_to_batch_size(mask_optional, len(float_val))
                float_val = float_val[:mask_optional.shape[0]]
            float_val: Tensor = torch.tensor(float_val).unsqueeze(-1).unsqueeze(-1)
        if mask_optional is not None:
            mask_optional = mask_optional.clone()
            if float_is_iterable:
                mask_optional = mask_optional[:] * float_val.to(mask_optional.dtype).to(mask_optional.device)
            else:
                mask_optional = mask_optional * float_val
            return (mask_optional,)
        else:
            if not float_is_iterable:
                return (float_val,)
            float_len = float_val.shape[0] if float_is_iterable else 1
            shape = (float_len, 1, 1)
            mask_optional = torch.ones(shape)
            mask_optional = mask_optional[:] * float_val.to(mask_optional.dtype).to(mask_optional.device)
            return (mask_optional,)
```