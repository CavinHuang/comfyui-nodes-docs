# Documentation
- Class name: SEGSOrderedFilterDetailerHookProvider
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSOrderedFilterDetailerHookProvider节点旨在对一组分割应用特定的过滤和排序机制。它允许根据面积尺寸和空间坐标定制过滤标准，并提供按升序或降序排序结果的选项。该节点特别适用于精炼分割任务的输出，以满足特定要求。

# Input types
## Required
- target
    - 目标参数定义了过滤分割的标准。它可以基于分割的面积、宽度、高度或其角落的坐标。此参数至关重要，因为它直接影响哪些分割被选择用于进一步处理。
    - Comfy dtype: COMBO[area(=w*h), width, height, x1, y1, x2, y2]
    - Python dtype: Union[str, int, Tuple[int, int]]
- order
    - 排序参数确定过滤后分割的排序顺序。设置为True时，结果按降序排序；设置为False时，按升序排序。这对于需要特定顺序的分割的应用来说很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- take_start
    - take_start参数指定要考虑的分割范围的起始索引。当只需要过滤结果的子集时，它特别有用，允许高效处理数据并减少不必要的处理。
    - Comfy dtype: INT
    - Python dtype: int
- take_count
    - take_count参数定义从由take_start指定的索引开始的过滤结果中要获取的分割数量。它对于控制处理的数据量至关重要，并且可以用来将输出限制在可管理的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- DETAILER_HOOK
    - SEGSOrderedFilterDetailerHookProvider节点的输出是一个细化钩子，它封装了应用指定的过滤和排序操作的逻辑。这个钩子可以在处理流程的下游中使用，以进一步细化和组织分割结果。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: SEGSOrderedFilterDetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSOrderedFilterDetailerHookProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'target': (['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2'],), 'order': ('BOOLEAN', {'default': True, 'label_on': 'descending', 'label_off': 'ascending'}), 'take_start': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'take_count': ('INT', {'default': 1, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, target, order, take_start, take_count):
        hook = hooks.SEGSOrderedFilterDetailerHook(target, order, take_start, take_count)
        return (hook,)
```