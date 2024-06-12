# Documentation
- Class name: From_SEG_ELT_bbox
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

From_SEG_ELT_bbox节点的'doit'方法旨在处理并返回特定元素的边界框坐标。它在ImpactPack工具集中的空间数据操作中发挥着关键作用，确保了元素的精确定位以供进一步处理。

# Input types
## Required
- bbox
    - 参数'bbox'对于节点的操作至关重要，因为它定义了要处理的元素的空间边界。它直接影响节点输出的准确性和相关性，通过确定感兴趣的特定区域。
    - Comfy dtype: SEG_ELT_bbox
    - Python dtype: Tuple[int, int, int, int]

# Output types
- left
    - 参数'left'代表边界框最左边的坐标，标志着水平跨度的起始。它在定义被处理数据中元素的空间范围方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - 参数'top'表示边界框最上方的坐标，指示垂直跨度的开始。它对于在数据集中确定元素的垂直位置非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 参数'right'表示边界框最右边的坐标，标志着水平跨度的结束。它在确定元素的宽度及其在数据集中的空间边界方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 参数'bottom'代表边界框最下方的坐标，标志着垂直跨度的结束。它在确定元素的高度及其在处理数据中的完整垂直范围方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class From_SEG_ELT_bbox:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bbox': ('SEG_ELT_bbox',)}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('left', 'top', 'right', 'bottom')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, bbox):
        return bbox
```