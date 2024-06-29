# Documentation
- Class name: StandardStaticViewOptionsNode
- Category: Animate Diff 🎭🅐🅓/context opts/view opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

StandardStaticViewOptionsNode旨在为动画上下文中的静态视图生成一组选项。它允许自定义视图长度和重叠，确保动画体验的无缝和连贯性。该节点在定义动画中不同帧或片段如何呈现给观众方面起着关键作用。

# Input types
## Required
- view_length
    - view_length参数决定了每个视图中显示的帧或元素的数量。它对于设置动画的范围和细节级别至关重要，影响整体的观看体验。
    - Comfy dtype: INT
    - Python dtype: int
- view_overlap
    - view_overlap参数指定相邻视图之间的重叠程度。这对于保持连续性很重要，并且可以帮助在动画的不同部分之间创建平滑的过渡。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fuse_method
    - fuse_method参数定义了在动画中组合或融合不同视图所使用的方法。它可能显著影响最终的外观以及通过动画序列传达信息的方式。
    - Comfy dtype: ContextFuseMethod.LIST
    - Python dtype: str

# Output types
- view_options
    - view_options输出提供了一组结构化的选项，这些选项决定了动画中视图的配置方式。它封装了用户设置的参数，对动画的执行至关重要。
    - Comfy dtype: VIEW_OPTS
    - Python dtype: ContextOptions

# Usage tips
- Infra type: CPU

# Source code
```
class StandardStaticViewOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'view_length': ('INT', {'default': 16, 'min': 1, 'max': LENGTH_MAX}), 'view_overlap': ('INT', {'default': 4, 'min': 0, 'max': OVERLAP_MAX})}, 'optional': {'fuse_method': (ContextFuseMethod.LIST,)}}
    RETURN_TYPES = ('VIEW_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/context opts/view opts'
    FUNCTION = 'create_options'

    def create_options(self, view_length: int, view_overlap: int, fuse_method: str=ContextFuseMethod.FLAT):
        view_options = ContextOptions(context_length=view_length, context_stride=None, context_overlap=view_overlap, context_schedule=ContextSchedules.STATIC_STANDARD, fuse_method=fuse_method)
        return (view_options,)
```