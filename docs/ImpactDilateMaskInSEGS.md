# Documentation
- Class name: DilateMaskInSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DilateMaskInSEGS 节点旨在对分割掩码执行形态学膨胀操作。它通过扩展分割区域的边界来增强分割效果。当分割区域的边界定义不明确或需要更稳健的表示时，此过程特别有用。

# Input types
## Required
- segs
    - ‘segs’参数是节点将要处理的分割对象集合。它对节点的操作至关重要，因为它定义了将应用膨胀操作的输入数据。分割的质量和准确性直接影响膨胀过程的结果。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- dilation
    - ‘dilation’参数指定要应用于分割掩码的膨胀量。它是确定边界扩展程度的关键因素。较大的值会导致更显著的扩展，这对于某些应用可能是有益的，但如果过度使用也可能引入不准确之处。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_segs
    - ‘new_segs’输出包含应用膨胀后修改的分割对象。这些对象现在具有扩展的边界，可以用于工作流程后续步骤的进一步分析或处理。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]

# Usage tips
- Infra type: CPU

# Source code
```
class DilateMaskInSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, dilation):
        new_segs = []
        for seg in segs[1]:
            mask = core.dilate_mask(seg.cropped_mask, dilation)
            seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
            new_segs.append(seg)
        return ((segs[0], new_segs),)
```