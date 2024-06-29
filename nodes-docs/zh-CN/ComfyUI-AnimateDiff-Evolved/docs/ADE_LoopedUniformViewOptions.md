# Documentation
- Class name: LoopedUniformViewOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts/view opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

循环均匀视图选项节点旨在为循环动画生成一组均匀的视图选项。它提供了一种系统化的方法来定义闭环结构内视图的长度、步长和重叠，允许动画序列的可视化一致且连贯。

# Input types
## Required
- view_length
    - 视图长度参数指定动画序列中每个视图的长度，这对于确定动画的整体范围和细节至关重要。它直接影响生成的帧数和循环视图的全面性。
    - Comfy dtype: INT
    - Python dtype: int
- view_stride
    - 视图步长参数定义动画中连续视图之间的间隔，影响帧与帧之间过渡的平滑度和连续性。它是创建连贯动画流程的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- view_overlap
    - 视图重叠参数确定循环中相邻视图之间的重叠程度，这对于保持视觉连续性并防止可能破坏观众体验的突然变化至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- closed_loop
    - 闭环标志指示动画序列是否应形成一个闭环，这对于创建无缝过渡并确保动画可以无结束地连续循环播放至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- fuse_method
    - 融合方法参数允许指定在组合视图时应用的融合技术，这可以提高动画的视觉质量和连贯性。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: str
- use_on_equal_length
    - 当遇到等长视图时，use_on_equal_length参数决定是否应用特定条件，可能为某些场景优化动画。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- VIEW_OPTS
    - VIEW_OPTS输出提供一组结构化的选项，定义循环动画视图的参数。这些选项包括长度、步长、重叠以及其他对动画执行和视觉结果至关重要的设置。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions

# Usage tips
- Infra type: CPU

# Source code
```
class LoopedUniformViewOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'view_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'view_stride': ('INT', {'default': 1, 'min': 1, 'max': STRIDE_MAX}), 'view_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX}), 'closed_loop': ('BOOLEAN', {'default': False})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST,), 'use_on_equal_length': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('VIEW_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts/view opts'
    FUNCTION = 'create_options'

    def create_options(self, view_length: int, view_overlap: int, view_stride: int, closed_loop: bool, fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False):
        view_options = ContextOptions(context_length=view_length, context_stride=view_stride, context_overlap=view_overlap, context_schedule=ContextSchedules.UNIFORM_LOOPED, closed_loop=closed_loop, fuse_method=fuse_method, use_on_equal_length=use_on_equal_length)
        return (view_options,)
```