# Documentation
- Class name: RemoveImageFromSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

‘RemoveImageFromSEGS’节点旨在通过移除‘SEGS’对象中的原始图像组件来处理分割数据。它专注于保留诸如裁剪后的掩码、置信度、裁剪区域、边界框、标签和控制网包装器等基本属性，从而允许有一个不包含图像本身的分割数据的简化版本。

# Input types
## Required
- segs
    - ‘segs’参数是节点的重要输入，因为它代表了需要处理的分割数据。节点在此数据上操作以创建没有原始图像的‘SEGS’对象的新版本，这对于只需要分割属性的某些应用来说是必要的。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]

# Output types
- result
    - ‘result’输出包含已处理过的‘SEGS’对象，其中已移除原始图像。这个输出很重要，因为它为用户提供了一个去除了不必要图像数据的修改后的分割数据集，可以用于进一步的分析或处理。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveImageFromSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs):
        results = []
        if len(segs[1]) > 0:
            for seg in segs[1]:
                new_seg = SEG(None, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                results.append(new_seg)
            return ((segs[0], results),)
        else:
            return (segs,)
```