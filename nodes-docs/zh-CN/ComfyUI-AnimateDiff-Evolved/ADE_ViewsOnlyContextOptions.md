# Documentation
- Class name: ViewAsContextOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ViewAsContextOptionsNode类的'create_options'方法旨在生成一组上下文选项，这些选项决定了视图的上下文如何处理和动画化。它允许自定义动画的开始百分比和保证步骤的数量，确保在不同上下文之间平滑渡。

# Input types
## Required
- view_opts_req
    - 参数'view_opts_req'对于定义动画上下文所需的视图选项至关重要。它为上下文在动画框架内的解释和操作奠定了基础。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions
## Optional
- start_percent
    - 参数'start_percent'指定了动画的开始百分比，允许用户控制动画的初始状态。这是一个可选参数，可以微调动画的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - 参数'guarantee_steps'确保动画运行的最小步数，提供了一种保持动画连续性和稳定性的机制。
    - Comfy dtype: INT
    - Python dtype: int
- prev_context
    - 参数'prev_context'允许将先前的上下文选项包含到新的集合中，使方法能够在现有的上下文状态上构建，并促进更复杂或分层的动画设置。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Output types
- CONTEXT_OPTS
    - 输出'CONTEXT_OPTS'代表新创建或更新的上下文选项集，这些选项将用于影响随后的动画或处理步骤。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Usage tips
- Infra type: CPU

# Source code
```
class ViewAsContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'view_opts_req': ('VIEW_OPTS',)}, 'optional': {'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts'
    FUNCTION = 'create_options'

    def create_options(self, view_opts_req: ContextOptions, start_percent: float=0.0, guarantee_steps: int=1, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(context_schedule=ContextSchedules.VIEW_AS_CONTEXT, start_percent=start_percent, guarantee_steps=guarantee_steps, view_options=view_opts_req, use_on_equal_length=True)
        prev_context.add(context_options)
        return (prev_context,)
```