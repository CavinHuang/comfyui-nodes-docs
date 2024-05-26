# Documentation
- Class name: BitwiseAndMaskForEach
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BitwiseAndMaskForEach节点的'doit'方法对段进行位运算，使用掩码确定重叠区域。它处理每个基础段与一组掩码段，识别重叠区域，并对非重叠区域应用掩码以消除它们。此方法对于细化分割结果至关重要，确保只保留真正重叠的区域。

# Input types
## Required
- base_segs
    - 'base_segs'参数是一系列将由节点处理的分割对象集合。它至关重要，因为它构成了与掩码段进行位运算的基础。该参数直接影响节点执行的结果，决定了哪些段被考虑用于重叠检测。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- mask_segs
    - 'mask_segs'参数由作为位运算掩码的分割对象组成。它至关重要，因为它定义了操作后要保留的区域。该参数在塑造节点的最终输出方面起着重要作用，通过指定要考虑重叠并应在操作后保留的区域。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]

# Output types
- result
    - 'result'输出是经过位运算处理的分割对象列表。它只包含基础段和掩码段之间有重叠的段。这个输出很重要，因为它代表了操作后细化的分割数据。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[str, List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class BitwiseAndMaskForEach:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_segs': ('SEGS',), 'mask_segs': ('SEGS',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, base_segs, mask_segs):
        result = []
        for bseg in base_segs[1]:
            cropped_mask1 = bseg.cropped_mask.copy()
            crop_region1 = bseg.crop_region
            for mseg in mask_segs[1]:
                cropped_mask2 = mseg.cropped_mask
                crop_region2 = mseg.crop_region
                intersect_region = (max(crop_region1[0], crop_region2[0]), max(crop_region1[1], crop_region2[1]), min(crop_region1[2], crop_region2[2]), min(crop_region1[3], crop_region2[3]))
                overlapped = False
                for i in range(intersect_region[0], intersect_region[2]):
                    for j in range(intersect_region[1], intersect_region[3]):
                        if cropped_mask1[j - crop_region1[1], i - crop_region1[0]] == 1 and cropped_mask2[j - crop_region2[1], i - crop_region2[0]] == 1:
                            overlapped = True
                            pass
                        else:
                            cropped_mask1[j - crop_region1[1], i - crop_region1[0]] = 0
                if overlapped:
                    item = SEG(bseg.cropped_image, cropped_mask1, bseg.confidence, bseg.crop_region, bseg.bbox, bseg.label, None)
                    result.append(item)
        return ((base_segs[0], result),)
```