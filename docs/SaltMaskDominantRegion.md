
# Documentation
- Class name: SaltMaskDominantRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskDominantRegion节点专注于根据指定阈值识别和分离一组给定蒙版中的主导区域。它可以有效地突出显示图像蒙版中最显著的区域，适用于需要聚焦重要蒙版区域的任务。

# Input types
## Required
- masks
    - 需要进行主导区域检测的输入蒙版。这些蒙版对于确定图像中的感兴趣区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- threshold
    - 用于区分蒙版中主导区域的阈值。它通过设置截止强度值，在定义何为"主导"区域方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出是一个突出显示主导区域的蒙版张量。这对于需要聚焦或操作蒙版主要区域的应用来说非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskDominantRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "dominant_region"

    def dominant_region(self, masks, threshold=128):
        if not isinstance(threshold, list):
            threshold = [threshold]
        regions = []
        for i, mask in enumerate(masks):
            mask_pil = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.dominant_region(mask_pil, int(threshold[i if i < len(threshold) else -1]))
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
