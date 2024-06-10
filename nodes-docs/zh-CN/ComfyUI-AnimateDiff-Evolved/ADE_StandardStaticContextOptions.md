# Documentation
- Class name: StandardStaticContextOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

StandardStaticContextOptionsNode的`create_options`方法旨在为动画过程生成和配置上下文选项。它允许自定义上下文长度、重叠以及其他影响动画如何在帧之间区分的参数。此方法在设置动画上下文方面至关重要，确保生成的帧是连贯且具有上下文感知的。

# Input types
## Required
- context_length
    - 参数`context_length`指定每个动画步骤中要考虑的上下文帧数。这对于确定每个帧对动画结果的影响范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - 参数`context_overlap`定义了动画序列中相邻上下文之间的重叠。这对于确保动画中的平滑过渡和连续性具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fuse_method
    - 参数`fuse_method`确定动画过程中不同上下文如何合并或融合。它可能影响动画的整体连贯性和风格一致性。
    - Comfy dtype: str
    - Python dtype: str
- use_on_equal_length
    - 标志`use_on_equal_length`指示在动画帧长度相等时是否应该应用上下文选项。它可能影响动画中帧的分布。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_percent
    - 参数`start_percent`设置上下文选项的起始百分比，这可能影响动画开始整合这些选项的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - 参数`guarantee_steps`确保在动画过程中至少应用上下文选项的最小步数，为动画过程提供稳定性。
    - Comfy dtype: INT
    - Python dtype: int
- view_opts
    - 参数`view_opts`允许自定义上下文中的视图选项，这可以改变动画的视觉呈现。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions
- prev_context
    - 参数`prev_context`用于将先前的上下文选项带入新的上下文，保持动画序列的连续性。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Output types
- CONTEXT_OPTS
    - 输出`CONTEXT_OPTS`提供了在动画过程的后续步骤中将使用的配置上下文选项。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Usage tips
- Infra type: CPU

# Source code
```
class StandardStaticContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'context_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST_STATIC,), 'use_on_equal_length': ('BOOLEAN', {'default': False}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',), 'view_opts': ('VIEW_OPTS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts'
    FUNCTION = 'create_options'

    def create_options(self, context_length: int, context_overlap: int, fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1, view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(context_length=context_length, context_stride=None, context_overlap=context_overlap, context_schedule=ContextSchedules.STATIC_STANDARD, fuse_method=fuse_method, use_on_equal_length=use_on_equal_length, start_percent=start_percent, guarantee_steps=guarantee_steps, view_options=view_opts)
        prev_context.add(context_options)
        return (prev_context,)
```