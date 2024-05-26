# Documentation
- Class name: DefaultImageForSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DefaultImageForSEGS节点的'doit'方法旨在通过将分割（SEGS）缩放到与给定图像的尺寸相匹配来处理分割。它还提供了一个选项，允许使用基于分割的裁剪区域的新裁剪图像覆盖现有的裁剪图像。此方法对于准备进一步分析或可视化的分割数据至关重要。

# Input types
## Required
- segs
    - 'segs'参数是节点将处理的分割对象集合。它对节点的操作至关重要，因为它决定了将被缩放并可能覆盖其裁剪图像的数据。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- image
    - 'image'参数表示将对分割进行缩放的参考图像。它是一个关键输入，因为它决定了分割数据必须匹配的尺寸以进行下游处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- override
    - 'override'参数是一个布尔标志，当设置为True时，指示节点为分割生成新的裁剪图像，忽略任何现有的裁剪图像。这对于根据更新的分割数据刷新裁剪图像非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- segs
    - 输出'segs'包含处理过的分割对象。每个对象都已缩放到与输入图像的尺寸相匹配，并且如果'override'参数设置为True，则可能已覆盖其裁剪图像。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[List[SEG], List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class DefaultImageForSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'image': ('IMAGE',), 'override': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, image, override):
        results = []
        segs = core.segs_scale_match(segs, image.shape)
        if len(segs[1]) > 0:
            if segs[1][0].cropped_image is not None:
                batch_count = len(segs[1][0].cropped_image)
            else:
                batch_count = len(image)
            for seg in segs[1]:
                if seg.cropped_image is not None and (not override):
                    cropped_image = seg.cropped_image
                else:
                    cropped_image = None
                    for i in range(0, batch_count):
                        ref_image = image[i].unsqueeze(0)
                        cropped_image2 = crop_image(ref_image, seg.crop_region)
                        if cropped_image is None:
                            cropped_image = cropped_image2
                        else:
                            cropped_image = torch.cat((cropped_image, cropped_image2), dim=0)
                new_seg = SEG(cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                results.append(new_seg)
            return ((segs[0], results),)
        else:
            return (segs,)
```