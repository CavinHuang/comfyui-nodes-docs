# Documentation
- Class name: LegacyLoopedUniformContextOptionsNode
- Category: Context
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

LegacyLoopedUniformContextOptionsNode旨在为统一循环模式创建上下文选项提供便利。它抽象了设置上下文参数的复杂性，允许在系统中以简化的方法管理上下文。此节点强调了易用性和生成一致上下文配置的能力。

# Input types
## Required
- context_length
    - context_length参数定义了上下文窗口的长度，这对于确定正在处理的数据的范围至关重要。它通过影响上下文的粒度，在节点的执行中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- context_stride
    - context_stride参数决定了连续上下文窗口之间的步长，这对于控制上下文的重叠和分布至关重要。它影响节点如何处理和组织上下文中的数据。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - context_overlap参数指定相邻上下文窗口之间的重叠量，这对于确保连续性并减少数据覆盖中的间隙很重要。它是节点在跨上下文维护数据完整性能力的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- context_schedule
    - context_schedule参数概述了处理上下文的时间表，这对于确定上下文操作的顺序和时间至关重要。它是节点有效协调上下文工作流程的能力的组成部分。
    - Comfy dtype: ContextSchedules.LEGACY_UNIFORM_SCHEDULE_LIST
    - Python dtype: ContextSchedules
- closed_loop
    - closed_loop参数指示上下文处理是否应在闭环中运行，这对于在上下文处理中建立循环模式非常重要。它影响节点管理重复上下文任务的方法。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- fuse_method
    - fuse_method参数确定融合上下文的方法，当处理多个上下文时，这对于优化节点的性能可能很重要。它提供了在节点操作中如何组合上下文的灵活性。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: ContextFuseMethod
- use_on_equal_length
    - use_on_equal_length参数指定当上下文长度相等时是否应采取特定行动，影响节点在上下文管理中的决策过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_percent
    - start_percent参数设置上下文处理应开始的百分比，这可以影响数据集中上下文的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - guarantee_steps参数确保在上下文处理中至少采取一定数量的步骤，这对于保持节点在提供一致结果方面的可靠性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- prev_context
    - prev_context参数允许将先前的上下文选项纳入当前操作，使节点能够基于现有的上下文配置进行构建。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptionsGroup
- view_opts
    - view_opts参数为查看上下文提供选项，这对于在节点操作中展示和分析上下文数据可能很重要。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions

# Output types
- CONTEXT_OPTS
    - CONTEXT_OPTS输出代表了节点生成的配置上下文选项，包含了将指导后续上下文处理的参数和设置。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: ContextOptions

# Usage tips
- Infra type: CPU

# Source code
```
class LegacyLoopedUniformContextOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'context_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'context_stride': ('INT', {'default': 1, 'min': 1, 'max': STRIDE_MAX}), 'context_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX}), 'context_schedule': (ContextSchedules.LEGACY_UNIFORM_SCHEDULE_LIST,), 'closed_loop': ('BOOLEAN', {'default': False})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST, {'default': ContextFuseMethod.FLAT}), 'use_on_equal_length': ('BOOLEAN', {'default': False}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX}), 'prev_context': ('CONTEXT_OPTIONS',), 'view_opts': ('VIEW_OPTS',)}}
    RETURN_TYPES = ('CONTEXT_OPTIONS',)
    RETURN_NAMES = ('CONTEXT_OPTS',)
    CATEGORY = ''
    FUNCTION = 'create_options'

    def create_options(self, fuse_method: str=ContextFuseMethod.FLAT, context_schedule: str=None, **kwargs):
        return LoopedUniformContextOptionsNode.create_options(self, fuse_method=fuse_method, **kwargs)
```