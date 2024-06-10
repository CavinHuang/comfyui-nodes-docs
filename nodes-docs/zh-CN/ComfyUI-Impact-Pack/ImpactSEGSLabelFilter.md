# Documentation
- Class name: SEGSLabelFilter
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSLabelFilter节点旨在根据预定义的标签集处理和过滤段。它允许包含特定的段类型，并处理将段分类为两组：符合指定标签的段和不符合的段。此节点在ImpactPack实用程序套件中用于进一步分析或处理的段选择中扮演关键角色。

# Input types
## Required
- segs
    - 'segs'参数至关重要，因为它代表了要被过滤的段集合。它通过确定处理的输入数据集直接影响节点的操作。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Any, List[impact.core.SEG]]
- preset
    - 'preset'参数指定节点将用于过滤段的预设检测标签列表。它是定义过滤标准的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- labels
    - 'labels'参数是一个多行字符串，允许用户列出他们希望允许的段类型。它之所以重要，是因为它根据用户输入设置了过滤标准。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- filtered_SEGS
    - 'filtered_SEGS'输出包含符合指定标签的段，这是过滤过程的主要结果。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Any, List[impact.core.SEG]]
- remained_SEGS
    - 'remained_SEGS'输出包括不符合指定标签的段，作为节点操作的次要结果。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Any, List[impact.core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSLabelFilter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'preset': (['all'] + defs.detection_labels,), 'labels': ('STRING', {'multiline': True, 'placeholder': 'List the types of segments to be allowed, separated by commas'})}}
    RETURN_TYPES = ('SEGS', 'SEGS')
    RETURN_NAMES = ('filtered_SEGS', 'remained_SEGS')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    @staticmethod
    def filter(segs, labels):
        labels = set([label.strip() for label in labels])
        if 'all' in labels:
            return (segs, (segs[0], []))
        else:
            res_segs = []
            remained_segs = []
            for x in segs[1]:
                if x.label in labels:
                    res_segs.append(x)
                elif 'eyes' in labels and x.label in ['left_eye', 'right_eye']:
                    res_segs.append(x)
                elif 'eyebrows' in labels and x.label in ['left_eyebrow', 'right_eyebrow']:
                    res_segs.append(x)
                elif 'pupils' in labels and x.label in ['left_pupil', 'right_pupil']:
                    res_segs.append(x)
                else:
                    remained_segs.append(x)
        return ((segs[0], res_segs), (segs[0], remained_segs))

    def doit(self, segs, preset, labels):
        labels = labels.split(',')
        return SEGSLabelFilter.filter(segs, labels)
```