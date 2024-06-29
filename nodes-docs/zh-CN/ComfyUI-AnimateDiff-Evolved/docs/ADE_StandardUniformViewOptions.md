# Documentation
- Class name: StandardUniformViewOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts/view opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

StandardUniformViewOptionsNode 旨在为动画差异化生成一组统一的视图选项。它专注于为动画过程创建一种结构化的方法，确保动画过程中的一致性和统一性。该节点抽象了视图调度的复杂性，为用户提供了一种直接的方法来定义和应用视图参数。

# Input types
## Required
- view_length
    - view_length 参数定义了动画序列中每个视图的长度。它对于确定每个单独视图的范围和细节至关重要，从而影响整体动画的质量和构成。
    - Comfy dtype: INT
    - Python dtype: int
- view_stride
    - view_stride 参数指定动画中连续视图之间的间隔。它在控制动画节奏和确保视图之间的过渡连贯且视觉上吸引人方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- view_overlap
    - view_overlap 参数指示动画中相邻视图之间的重叠量。这对于创建无缝且平滑的动画体验很重要，其中视图之间的过渡不会突然。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fuse_method
    - fuse_method 参数确定在动画中融合视图时使用的方法。它在视图如何组合方面提供了灵活性，允许不同的视觉效果和对最终输出的创造性控制。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: str

# Output types
- view_options
    - view_options 输出提供了一组定义动画中视图特性的结构化选项。它封装了诸如视图长度、步长和重叠等参数，这些参数对于动画的执行和最终外观至关重要。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions

# Usage tips
- Infra type: CPU

# Source code
```
class StandardUniformViewOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'view_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'view_stride': ('INT', {'default': 1, 'min': 1, 'max': STRIDE_MAX}), 'view_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST,)}}
    RETURN_TYPES = ('VIEW_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts/view opts'
    FUNCTION = 'create_options'

    def create_options(self, view_length: int, view_overlap: int, view_stride: int, fuse_method: str=ContextFuseMethod.PYRAMID):
        view_options = ContextOptions(context_length=view_length, context_stride=view_stride, context_overlap=view_overlap, context_schedule=ContextSchedules.UNIFORM_STANDARD, fuse_method=fuse_method)
        return (view_options,)
```