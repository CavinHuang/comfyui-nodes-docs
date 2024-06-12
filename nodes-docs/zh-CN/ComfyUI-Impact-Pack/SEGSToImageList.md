# Documentation
- Class name: SEGSToImageList
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSToImageList节点旨在将分割数据转换为图像张量列表。它将分割数据缩放并处理以匹配提供的备用图像的尺寸，或者如果没有提供图像，则生成默认张量。该节点在准备进一步分析或在ImpactPack实用程序套件中可视化的图像数据中起着至关重要的作用。

# Input types
## Required
- segs
    - 's segs' 参数是节点处理的分割数据集合。它对节点的操作至关重要，因为它直接影响输出图像列表的内容和结构。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
## Optional
- fallback_image_opt
    - 可选的 'fallback_image_opt' 参数提供了一个默认图像，当没有可用的分割图像时使用。它确保了即使在数据不完整的情况下，节点仍然能够产生一致的输出。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]

# Output types
- results
    - 'results' 输出是从分割数据派生的图像张量列表。它代表了节点的主要输出，对于需要图像数据的下游任务具有重要意义。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSToImageList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}, 'optional': {'fallback_image_opt': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, fallback_image_opt=None):
        results = list()
        if fallback_image_opt is not None:
            segs = core.segs_scale_match(segs, fallback_image_opt.shape)
        for seg in segs[1]:
            if seg.cropped_image is not None:
                cropped_image = to_tensor(seg.cropped_image)
            elif fallback_image_opt is not None:
                cropped_image = to_tensor(crop_image(fallback_image_opt, seg.crop_region))
            else:
                cropped_image = empty_pil_tensor()
            results.append(cropped_image)
        if len(results) == 0:
            results.append(empty_pil_tensor())
        return (results,)
```