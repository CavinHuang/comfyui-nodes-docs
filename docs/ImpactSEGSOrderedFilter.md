# Documentation
- Class name: SEGSOrderedFilter
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSOrderedFilter节点旨在根据指定的标准（如面积、宽度、高度或坐标）对SEGS（Semantically Enriched Geographic Segments，语义丰富的地理分段）集合进行处理和排序。它允许用户定义排序顺序和要提取的SEGS范围。该节点的功能集中在以有意义的方式组织SEGS，以便进行进一步的分析或可视化。

# Input types
## Required
- segs
    - ‘segs’参数是节点将处理的SEGS对象集合。它至关重要，因为它构成了节点执行的所有排序操作的基础。此参数直接影响节点执行的结果，决定了哪些SEGS被排序以及它们的排序方式。
    - Comfy dtype: SEGS
    - Python dtype: List[impact.core.SEG]
- target
    - ‘target’参数决定了将根据SEGS的哪个属性进行排序。它可以是裁剪区域的面积、宽度、高度或其角落的坐标。这个参数至关重要，因为它决定了排序标准，影响最终排序的SEGS列表。
    - Comfy dtype: COMBO['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2']
    - Python dtype: str
## Optional
- order
    - ‘order’参数指定根据‘target’属性进行排序时，排序是降序还是升序。它很重要，因为它控制了排序的方向，对于某些应用场景来说，SEGS的顺序至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- take_start
    - ‘take_start’参数定义了排序后节点将从哪个起始索引开始提取SEGS。它很重要，因为它允许从排序后的列表中选择特定的SEGS范围，这对于关注数据的特定子集非常有用。
    - Comfy dtype: INT
    - Python dtype: int
- take_count
    - ‘take_count’参数指定从‘take_start’索引开始，从排序后的列表中提取的SEGS数量。它很重要，因为它决定了将提取的SEGS子集的大小，这对于管理处理的数据量很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- filtered_SEGS
    - 'filtered_SEGS'输出包含根据‘take_start’和‘take_count’参数排序和选择的SEGS子集。它很重要，因为它代表了节点操作的主要结果，提供了输入数据的过滤视图。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[impact.core.SEG, List[impact.core.SEG]]
- remained_SEGS
    - 'remained_SEGS'输出包括节点过滤过程未选择的SEGS。这些是在提取‘filtered_SEGS’之后的剩余SEGS。这个输出对于需要考虑选定和未选定数据的应用场景很重要。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[impact.core.SEG, List[impact.core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSOrderedFilter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'target': (['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2'],), 'order': ('BOOLEAN', {'default': True, 'label_on': 'descending', 'label_off': 'ascending'}), 'take_start': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'take_count': ('INT', {'default': 1, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    RETURN_TYPES = ('SEGS', 'SEGS')
    RETURN_NAMES = ('filtered_SEGS', 'remained_SEGS')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, target, order, take_start, take_count):
        segs_with_order = []
        for seg in segs[1]:
            x1 = seg.crop_region[0]
            y1 = seg.crop_region[1]
            x2 = seg.crop_region[2]
            y2 = seg.crop_region[3]
            if target == 'area(=w*h)':
                value = (y2 - y1) * (x2 - x1)
            elif target == 'width':
                value = x2 - x1
            elif target == 'height':
                value = y2 - y1
            elif target == 'x1':
                value = x1
            elif target == 'x2':
                value = x2
            elif target == 'y1':
                value = y1
            else:
                value = y2
            segs_with_order.append((value, seg))
        if order:
            sorted_list = sorted(segs_with_order, key=lambda x: x[0], reverse=True)
        else:
            sorted_list = sorted(segs_with_order, key=lambda x: x[0], reverse=False)
        result_list = []
        remained_list = []
        for (i, item) in enumerate(sorted_list):
            if take_start <= i < take_start + take_count:
                result_list.append(item[1])
            else:
                remained_list.append(item[1])
        return ((segs[0], result_list), (segs[0], remained_list))
```