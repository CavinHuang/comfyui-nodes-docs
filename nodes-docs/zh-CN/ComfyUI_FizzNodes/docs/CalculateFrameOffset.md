# Documentation
- Class name: CalculateFrameOffset
- Category: FizzNodes 📅🅕🅝/HelperNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

CalculateFrameOffset 节点旨在根据当前帧、最大帧数和潜在输入数量计算并分配序列中的帧编号。它在管理与帧相关的操作的序列顺序中发挥着关键作用。

# Input types
## Required
- current_frame
    - current_frame 参数指定帧序列中的当前位置。这对于确定帧编号分配的起始点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- max_frames
    - max_frames 参数设置了帧编号的上限。这对于确保帧编号保持在有效范围内至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- num_latent_inputs
    - num_latent_inputs 参数指示用于帧计算的潜在输入数量。它显著影响序列内帧编号的分配方式。
    - Comfy dtype: INT
    - Python dtype: int
- index
    - index 参数代表潜在输入中的具体索引。它用于计算分配帧编号的偏移量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frame_offset
    - frame_offset 输出代表给定输入计算出的帧编号。它对于序列中帧的后续处理和处理具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CalculateFrameOffset:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'current_frame': ('INT', {'default': 0, 'min': 0}), 'max_frames': ('INT', {'default': 18, 'min': 0}), 'num_latent_inputs': ('INT', {'default': 4, 'min': 0}), 'index': ('INT', {'default': 4, 'min': 0})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'assignFrameNum'
    CATEGORY = 'FizzNodes 📅🅕🅝/HelperNodes'

    def assignFrameNum(self, current_frame, max_frames, num_latent_inputs, index):
        if current_frame == 0:
            return (index,)
        else:
            start_frame = (current_frame - 1) * (num_latent_inputs - 1) + (num_latent_inputs - 1)
            return ((start_frame + index) % max_frames,)
```