# Documentation
- Class name: ControlNetClearSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ControlNetClearSEGS节点的'doit'方法旨在通过创建具有某些属性设置为None的新SEG实例来处理SEG对象集合。它在预处理或修改分段数据以进行进一步分析或在ImpactPack实用程序套件内进行操作中起着关键作用。

# Input types
## Required
- segs
    - 'segs'参数是节点将处理的SEG对象集合。它对节点的操作至关重要，因为它定义了将被转换为新格式的输入数据。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]

# Output types
- new_segs
    - 'new_segs'输出是节点修改后的SEG对象列表。此列表中的每个SEG对象都有特定的属性设置为None，这对于某些类型的后续处理或分析可能很重要。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]

# Usage tips
- Infra type: CPU

# Source code
```
class ControlNetClearSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs):
        new_segs = []
        for seg in segs[1]:
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, None)
            new_segs.append(new_seg)
        return ((segs[0], new_segs),)
```