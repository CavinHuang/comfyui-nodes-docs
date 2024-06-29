# Documentation
- Class name: SubtractMaskForEach
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SubtractMaskForEach节点的'doit'方法旨在通过从基础分割中减去掩码分割来处理分割数据。它通过识别基础分割和掩码分割之间的重叠区域并相应地修改基础分割来操作。此方法对于细化分割结果至关重要，确保重叠区域被准确表示。

# Input types
## Required
- base_segs
    - 'base_segs'参数是节点将要处理的分割数据集合。它至关重要，因为它构成了节点执行的减法操作的基础。此参数直接影响分割过程的结果，决定了图像的哪些部分将被保留或修改。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- mask_segs
    - 'mask_segs'参数包含将从基础分割中减去的掩码分割。此参数对于定义将被修改的分割区域至关重要。它与'base_segs'一起工作，确保只有指定的区域受到减法操作的影响。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]

# Output types
- result
    - 'result'输出是减法操作后修改的分割项列表。每个项目代表已根据掩码分割进行调整的基础分割。此输出很重要，因为它为进一步使用或分析提供了最终的、细化的分割数据。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[str, List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SubtractMaskForEach:

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
                changed = False
                for i in range(intersect_region[0], intersect_region[2]):
                    for j in range(intersect_region[1], intersect_region[3]):
                        if cropped_mask1[j - crop_region1[1], i - crop_region1[0]] == 1 and cropped_mask2[j - crop_region2[1], i - crop_region2[0]] == 1:
                            changed = True
                            cropped_mask1[j - crop_region1[1], i - crop_region1[0]] = 0
                        else:
                            pass
                if changed:
                    item = SEG(bseg.cropped_image, cropped_mask1, bseg.confidence, bseg.crop_region, bseg.bbox, bseg.label, None)
                    result.append(item)
                else:
                    result.append(bseg)
        return ((base_segs[0], result),)
```