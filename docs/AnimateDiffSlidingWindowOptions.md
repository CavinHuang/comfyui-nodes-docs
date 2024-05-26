# Documentation
- Class name: AnimateDiffSlidingWindowOptions
- Category: Animate Diff
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

该节点类封装了设置滑动窗口动画所需的配置选项。它旨在管理控制视频序列中帧生成的参数，确保动画流畅连贯。节点的目的是提供一种结构化的方式来定义动画的时间和空间特征，如上下文的长度、帧之间的步长以及连续上下文之间的重叠程度。

# Input types
## Required
- context_length
    - context_length参数规定了在动画的每一步中要考虑的连续帧数。它对于确定模型操作的上下文范围至关重要，从而影响生成动画的连贯性和连续性。
    - Comfy dtype: INT
    - Python dtype: int
- context_stride
    - context_stride参数指定了滑动窗口中帧之间的间隔。它影响了动画从一个上下文过渡到下一个上下文的方式，有助于整体动画的节奏和步调。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - context_overlap参数定义了连续滑动窗口之间的重叠帧数。这对于保持平滑过渡和确保动画不会出现不连贯或不稳定的外观至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- context_schedule
    - context_schedule参数控制滑动窗口中帧的分布，允许使用各种模式，如均匀或非均匀排列。这影响了动画的视觉动态和叙事流程。
    - Comfy dtype: ENUM
    - Python dtype: ContextSchedules.CONTEXT_SCHEDULE_ENUM
- closed_loop
    - closed_loop参数决定了动画在到达结尾后是否应该循环回到开头。这影响了动画的整体结构和呈现方式，可能会创造出无缝或循环的叙事。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- sliding_window_opts
    - 输出代表一个配置好的SlidingContext对象，封装了动画过程中所需的所有参数。它是生成连贯且平滑过渡的视频序列的关键组成部分。
    - Comfy dtype: OBJECT
    - Python dtype: SlidingContext

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffSlidingWindowOptions:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': SLIDING_CONTEXT_LENGTH, 'min': 2, 'max': 32}), 'context_stride': ('INT', {'default': 1, 'min': 1, 'max': 32}), 'context_overlap': ('INT', {'default': 4, 'min': 0, 'max': 32}), 'context_schedule': (ContextSchedules.CONTEXT_SCHEDULE_LIST, {'default': ContextSchedules.UNIFORM}), 'closed_loop': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('SLIDING_WINDOW_OPTS',)
    FUNCTION = 'init_options'
    CATEGORY = 'Animate Diff'

    def init_options(self, context_length, context_stride, context_overlap, context_schedule, closed_loop):
        ctx = SlidingContext(context_length=context_length, context_stride=context_stride, context_overlap=context_overlap, context_schedule=context_schedule, closed_loop=closed_loop)
        return (ctx,)
```