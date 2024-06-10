# Documentation
- Class name: BatchedContextOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

BatchedContextOptionsNode旨在管理和生成动画序列的上下文选项。它提供了一种结构化的方法来定义每个上下文的长度、起始百分比和保证步骤，确保动画工作流程的连贯性和效率。

# Input types
## Required
- context_length
    - context_length参数指定上下文窗口的持续时间，这对于确定每个动画段的范围至关重要。它直接影响节点分段动画时间线的能力。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- start_percent
    - start_percent参数指定动画序列中上下文的起始点，允许微调动画的初始焦点。它通过控制每个上下文的起始位置，在整体动画策略中扮演重要角色。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - guarantee_steps参数确保每个上下文至少处理的步数，提供防止过早终止的保护。它对于维护动画序列的完整性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- prev_context
    - prev_context参数允许延续或修改现有的上下文选项，使节点能够在之前的状态上构建。这对于维护动画过程的连续性至关重要。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Output types
- CONTEXT_OPTS
    - 输出CONTEXT_OPTS代表由节点生成或更新的上下文选项集合。这些选项对于指导动画过程中的后续步骤至关重要。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Usage tips
- Infra type: CPU

# Source code
```
class BatchedContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX})}, 'optional': {'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts'
    FUNCTION = 'create_options'

    def create_options(self, context_length: int, start_percent: float=0.0, guarantee_steps: int=1, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(context_length=context_length, context_overlap=0, context_schedule=ContextSchedules.BATCHED, start_percent=start_percent, guarantee_steps=guarantee_steps)
        prev_context.add(context_options)
        return (prev_context,)
```