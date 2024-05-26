# Documentation
- Class name: ShowLayer
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ShowLayer 类旨在在复合结构中管理和显示视觉元素。它专注于根据提供的参数定位和缩放图层，使得能够创建复杂的视觉组合。

# Input types
## Required
- edit
    - ‘edit’参数对于确定ShowLayer类的操作方法至关重要。它决定了函数是编辑现有的视觉元素还是在组合中创建新的元素。
    - Comfy dtype: EDIT
    - Python dtype: PIL.Image.Image
- x
    - ‘x’参数指定视觉元素在组合中水平位置。对于正确对齐图层和实现期望的视觉效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - ‘y’参数定义了视觉元素的垂直位置，与‘x’参数协同工作，以确立图层在视觉组合中的确切位置。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - ‘width’参数在确定视觉元素的水平维度方面至关重要。它影响组合的整体比例和布局，确保元素的大小和间距适当。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数对应于视觉元素的垂直维度，与‘width’参数相辅相成，控制组合中视觉元素的大小。
    - Comfy dtype: INT
    - Python dtype: int
- z_index
    - ‘z_index’参数建立了视觉元素的堆叠顺序。在创建层叠效果方面至关重要，其中‘z_index’值较高的元素显示在值较低的元素上方。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- scale_option
    - ‘scale_option’参数提供了视觉元素如何缩放的灵活性。它允许按宽度、高度或整体缩放，影响视觉外观以及元素在组合中的交互方式。
    - Comfy dtype: COMBO
    - Python dtype: str
- layers
    - ‘layers’参数是ShowLayer类可以操作的视觉元素集合。它在构建组合和确定视觉层次结构方面很重要。
    - Comfy dtype: LAYER
    - Python dtype: List[PIL.Image.Image]

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class ShowLayer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'edit': ('EDIT',), 'x': ('INT', {'default': 0, 'min': -100, 'max': 8192, 'step': 1, 'display': 'number'}), 'y': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1, 'display': 'number'}), 'width': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'height': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'z_index': ('INT', {'default': 0, 'min': 0, 'max': 100, 'step': 1, 'display': 'number'}), 'scale_option': (['width', 'height', 'overall'],)}, 'optional': {'layers': ('LAYER', {'default': None})}}
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = True

    def run(self, edit, x, y, width, height, z_index, scale_option, layers):
        return ()
```