# Documentation
- Class name: LoopedUniformContextOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

LoopedUniformContextOptionsNode旨在为动画目的生成一系列上下文选项。它根据给定的参数创建基于上下文的均匀分布，确保动画帧的一致流动。该节点特别适用于创建动画循环，其中均匀性和连续性至关重要。

# Input types
## Required
- context_length
    - context_length参数决定了动画序列中每个上文的长度。它对于定义每个上下文的范围至关重要，并影响动画的整体结构。
    - Comfy dtype: INT
    - Python dtype: int
- context_stride
    - context_stride参数指定连续上下文之间的步长。它影响每个上下文与其邻居的关联程度，影响动画序列的连贯性。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - context_overlap参数定义了相邻上下文之间的重叠量。这对于确保动画中上下文之间的平滑过渡和保持视觉连续性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- closed_loop
    - closed_loop参数指示动画是否应在最后一个上下文之后循环回到开头。这可以用来创建无缝、重复的动画。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- fuse_method
    - fuse_method参数决定了动画中上下文是如何融合在一起的。它可以影响上下文的混合和合并，影响动画的最终外观。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: str
- use_on_equal_length
    - use_on_equal_length参数指定是否仅在上下文的长度符合特定条件时才应使用上下文。这可以用来根据特定标准控制上下文的应用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_percent
    - start_percent参数定义了动画序列中上下文的起始百分比。它用于控制每个上下文开始的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - guarantee_steps参数确保每个上下文在动画中至少显示一定数量的步骤。这有助于保持每个上下文在序列中的可见性和影响力。
    - Comfy dtype: INT
    - Python dtype: int
- view_opts
    - view_opts参数提供了查看动画的选项。它可以包括影响动画显示或渲染的设置。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions
- prev_context
    - prev_context参数允许延续之前的上下文序列。当扩展或修改现有的动画序列时使用。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Output types
- CONTEXT_OPTS
    - 输出CONTEXT_OPTS提供了基于输入参数生成的一组结构化的上下文选项。这些选项可以直接用于动画过程。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Usage tips
- Infra type: CPU

# Source code
```
class LoopedUniformContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'context_stride': ('INT', {'default': 1, 'min': 1, 'max': STRIDE_MAX}), 'context_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX}), 'closed_loop': ('BOOLEAN', {'default': False})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST,), 'use_on_equal_length': ('BOOLEAN', {'default': False}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',), 'view_opts': ('VIEW_OPTS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts'
    FUNCTION = 'create_options'

    def create_options(self, context_length: int, context_stride: int, context_overlap: int, closed_loop: bool, fuse_method: str=ContextFuseMethod.FLAT, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1, view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(context_length=context_length, context_stride=context_stride, context_overlap=context_overlap, context_schedule=ContextSchedules.UNIFORM_LOOPED, closed_loop=closed_loop, fuse_method=fuse_method, use_on_equal_length=use_on_equal_length, start_percent=start_percent, guarantee_steps=guarantee_steps, view_options=view_opts)
        prev_context.add(context_options)
        return (prev_context,)
```