# Documentation
- Class name: SEGSRangeFilter
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSRangeFilter节点旨在根据与它们的空间特征相关的特定标准来处理和过滤段（SEGS）。它允许选择或排除符合特定属性值范围的段，例如面积、宽度、高度或长度百分比。该节点通过评估每个段以满足所提供的标准，并相应地将它们归类为过滤或保留的段。

# Input types
## Required
- segs
    - 'segs'参数至关重要，因为它代表了将由节点过滤的段。这是一系列段对象，节点将根据定义的标准对其进行处理。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- target
    - 'target'参数决定了将用于过滤的段的特定属性。它可以是几个选项之一，每个选项对应段的不同空间特征。
    - Comfy dtype: COMBO['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'length_percent']
    - Python dtype: str
- mode
    - 'mode'参数决定在指定值范围内的段是包含在过滤输出中还是被排除。它作为布尔开关在'inside'和'outside'范围内操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- min_value
    - 'min_value'参数设置将与之比较的段的值范围的下限。它在确定基于目标属性过滤哪些段中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- max_value
    - 'max_value'参数确定用于过滤段的值范围的上限。它与'min_value'一起工作，以定义段属性的包含范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- filtered_SEGS
    - 'filtered_SEGS'输出包含符合基于指定目标属性和值范围的过滤标准的段。它代表了节点操作的主要结果。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]
- remained_SEGS
    - 'remained_SEGS'输出包括不满足过滤标准的段。这些是落在指定值范围之外且未包含在过滤输出中的段。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSRangeFilter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'target': (['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'length_percent'],), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'inside', 'label_off': 'outside'}), 'min_value': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'max_value': ('INT', {'default': 67108864, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    RETURN_TYPES = ('SEGS', 'SEGS')
    RETURN_NAMES = ('filtered_SEGS', 'remained_SEGS')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, target, mode, min_value, max_value):
        new_segs = []
        remained_segs = []
        for seg in segs[1]:
            x1 = seg.crop_region[0]
            y1 = seg.crop_region[1]
            x2 = seg.crop_region[2]
            y2 = seg.crop_region[3]
            if target == 'area(=w*h)':
                value = (y2 - y1) * (x2 - x1)
            elif target == 'length_percent':
                h = y2 - y1
                w = x2 - x1
                value = max(h / w, w / h) * 100
                print(f'value={value}')
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
            if mode and min_value <= value <= max_value:
                print(f'[in] value={value} / {mode}, {min_value}, {max_value}')
                new_segs.append(seg)
            elif not mode and (value < min_value or value > max_value):
                print(f'[out] value={value} / {mode}, {min_value}, {max_value}')
                new_segs.append(seg)
            else:
                remained_segs.append(seg)
                print(f'[filter] value={value} / {mode}, {min_value}, {max_value}')
        return ((segs[0], new_segs), (segs[0], remained_segs))
```