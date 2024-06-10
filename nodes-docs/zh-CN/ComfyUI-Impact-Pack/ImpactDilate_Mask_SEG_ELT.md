# Documentation
- Class name: Dilate_SEG_ELT
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

Dilate_SEG_ELT节点旨在对分割掩码执行形态学膨胀，这是图像处理中扩展检测对象边界的关键步骤。该节点通过应用指定因子的膨胀操作来增强分割掩码，从而可能提高后续阶段中对象检测的准确性。

# Input types
## Required
- seg_elt
    - seg_elt参数是将要处理的分割元素的关键输入。它包含裁剪后的图像、掩码、置信度分数、裁剪区域、边界框、标签和控制网包装器，这些对于正确执行膨胀操作至关重要。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG
## Optional
- dilation
    - dilation参数决定了应用于掩码的膨胀效果的程度。较大的值会导致掩码边界的更显著扩展，这对于某些图像分析任务可能很重要。默认值设置为确保平衡的膨胀效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seg_elt
    - 输出的seg_elt是具有反映膨胀操作的更新掩码的处理后的分割元素。这个输出很重要，因为它构成了图像处理流水线中进一步分析或可视化的基础。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG

# Usage tips
- Infra type: CPU

# Source code
```
class Dilate_SEG_ELT:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seg_elt': ('SEG_ELT',), 'dilation': ('INT', {'default': 10, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('SEG_ELT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, seg, dilation):
        mask = core.dilate_mask(seg.cropped_mask, dilation)
        seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
        return (seg,)
```