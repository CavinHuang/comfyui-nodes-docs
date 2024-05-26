# Documentation
- Class name: MakeInterpolationStateList
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

该节点旨在管理和创建插值状态列表，这对于帧插值过程至关重要。它决定了在插值过程中哪些帧包含或跳过，从而优化计算工作量并确保生成平滑连贯的帧过渡。

# Input types
## Required
- frame_indices
    - 该参数指定了一个逗号分隔的帧索引列表，节点将使用该列表来确定哪些帧在插值过程中被包含或跳过。这对于节点正确运行至关重要，并直接影响帧插值的结果。
    - Comfy dtype: STRING
    - Python dtype: List[int]
## Optional
- is_skip_list
    - 该参数控制指定的帧索引是否应在插值过程中被跳过或包含。它在节点的整体操作中起着重要作用，因为它决定了节点在帧选择期间的行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- INTERPOLATION_STATES
    - 该节点的输出是一个InterpolationStateList对象，它封装了关于包含或跳过哪些帧的决策。这个对象对于依赖这些决策来执行实际帧插值的后续操作至关重要。
    - Comfy dtype: INTERPOLATION_STATES
    - Python dtype: InterpolationStateList

# Usage tips
- Infra type: CPU

# Source code
```
class MakeInterpolationStateList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frame_indices': ('STRING', {'multiline': True, 'default': '1,2,3'}), 'is_skip_list': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('INTERPOLATION_STATES',)
    FUNCTION = 'create_options'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def create_options(self, frame_indices: str, is_skip_list: bool):
        frame_indices_list = [int(item) for item in frame_indices.split(',')]
        interpolation_state_list = InterpolationStateList(frame_indices=frame_indices_list, is_skip_list=is_skip_list)
        return (interpolation_state_list,)
```