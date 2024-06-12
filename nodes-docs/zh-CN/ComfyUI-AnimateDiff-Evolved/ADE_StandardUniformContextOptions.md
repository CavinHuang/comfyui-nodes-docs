# Documentation
- Class name: StandardUniformContextOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

StandardUniformContextOptionsNode 类的 `create_options` 方法旨在为动画和差异化任务生成一组上下文选项。它配置了控制动画过程粒度和连续性的上下文参数，如长度、步长和重叠。此方法在建立动画如何在不同帧或阶段进行差异化的框架中起着关键作用。

# Input types
## Required
- context_length
    - 参数 `context_length` 定义了上下文将覆盖的帧或数据点的范围。它对于确定每个上下文选项对动画结果的影响范围至关重要。此参数直接影响细节水平和不同动画阶段之间过渡的平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- context_stride
    - 参数 `context_stride` 指定连续上下文帧之间的间隔。它对动画过程的效率很重要，因为它影响新上下文信息的引入频率。这个步长设置可以优化性能和动画中所需细节水平之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - 参数 `context_overlap` 确定连续上下文的重叠程度。这种重叠对于保持动画序列的连续性至关重要，确保从一个上下文平滑过渡到下一个上下文。在处理需要逐渐过渡而不是突然变化的复杂转换时，这一点尤其重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fuse_method
    - 参数 `fuse_method` 确定在动画中合并或融合不同上下文的策略。它在构建整体上下文的方式中起着重要作用，并且可以显著影响最终动画的连贯性以及不同元素在其中的交互方式。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: str
- use_on_equal_length
    - 参数 `use_on_equal_length` 是一个布尔标志，设置后表示仅在上下文长度相等时才应用上下文选项。这在确保动画过程中的一致性时很重要，特别是处理不同长度的数据时。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_percent
    - 参数 `start_percent` 决定上下文在动画时间轴上的起始点。它对于将上下文与动画中的特定时刻或事件对齐至关重要，允许精确的时间控制和与其他元素的同步。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - 参数 `guarantee_steps` 设置上下文将被应用的最小步数。它确保每个上下文在动画中有一个确定的持续时间，有助于整体结构和动画序列的可预测性。
    - Comfy dtype: INT
    - Python dtype: int
- view_opts
    - 参数 `view_opts` 允许定制上下文中的视图选项。它可以用来调整渲染设置或显示偏好等视觉方面，增强动画的展示效果。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions
- prev_context
    - 参数 `prev_context` 指的是动画中使用的前一个上下文选项组。它对于保持动画的连续性和流动性很重要，尤其是在基于前一个上下文构建或从一个上下文过渡到另一个上下文时。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Output types
- CONTEXT_OPTS
    - 输出 `CONTEXT_OPTS` 表示已配置并准备应用于动画的一组上下文选项。这些选项封装了定义动画如何随时间差异化和演变的参数，确保动画序列结构化和连贯。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup

# Usage tips
- Infra type: CPU

# Source code
```
class StandardUniformContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'context_stride': ('INT', {'default': 1, 'min': 1, 'max': STRIDE_MAX}), 'context_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST,), 'use_on_equal_length': ('BOOLEAN', {'default': False}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',), 'view_opts': ('VIEW_OPTS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts'
    FUNCTION = 'create_options'

    def create_options(self, context_length: int, context_stride: int, context_overlap: int, fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1, view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(context_length=context_length, context_stride=context_stride, context_overlap=context_overlap, context_schedule=ContextSchedules.UNIFORM_STANDARD, closed_loop=False, fuse_method=fuse_method, use_on_equal_length=use_on_equal_length, start_percent=start_percent, guarantee_steps=guarantee_steps, view_options=view_opts)
        prev_context.add(context_options)
        return (prev_context,)
```