# Documentation
- Class name: SEGSLabelAssign
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSLabelAssign节点旨在为一系列段落分配标签。它接收一个段落列表和相应的标签，确保每个段落根据它们的顺序与正确的标签相关联。该节点在组织和分类数据以进行进一步处理和分析中发挥着关键作用。

# Input types
## Required
- segs
    - 'segs'参数是需要被标记的段落集合。它对节点的操作至关重要，因为它定义了将接收分配标签的数据。该参数直接影响节点的输出，决定了将被分类的段落。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Any, List[impact.core.SEG]]
- labels
    - 'labels'参数是一个包含由逗号分隔的标签的字符串。它对节点的执行至关重要，因为它指定了将分配给段落的标签。参数的内容决定了段落如何被分类，影响节点的总体输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- SEGS
    - 输出'SEGS'是经过分配过程后标记的段落集合。它代表了节点的主要结果，包含了带有新分配标签的段落，这些标签对于后续任务至关重要。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Any, List[impact.core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSLabelAssign:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'labels': ('STRING', {'multiline': True, 'placeholder': 'List the label to be assigned in order of segs, separated by commas'})}}
    RETURN_TYPES = ('SEGS',)
    RETURN_NAMES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    @staticmethod
    def assign(segs, labels):
        labels = [label.strip() for label in labels]
        if len(labels) != len(segs[1]):
            print(f'Warning (SEGSLabelAssign): length of labels ({len(labels)}) != length of segs ({len(segs[1])})')
        labeled_segs = []
        idx = 0
        for x in segs[1]:
            if len(labels) > idx:
                x = x._replace(label=labels[idx])
            labeled_segs.append(x)
            idx += 1
        return ((segs[0], labeled_segs),)

    def doit(self, segs, labels):
        labels = labels.split(',')
        return SEGSLabelAssign.assign(segs, labels)
```