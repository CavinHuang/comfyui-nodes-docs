
# Documentation
- Class name: SaltMaskSmoothRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskSmoothRegion节点用于对遮罩区域应用平滑滤镜，通过指定的sigma值来控制平滑程度。这一处理过程通过减少噪点和不规则性来提升遮罩区域的视觉质量。

# Input types
## Required
- masks
    - masks参数代表需要进行平滑处理的输入遮罩，是节点处理的主要数据。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- sigma
    - sigma参数控制应用于遮罩区域的平滑滤镜的平滑程度，直接影响平滑效果和噪点减少的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - 输出是根据指定sigma值进行平滑处理后的遮罩张量，通过减少噪点和不规则性来提供更高的视觉质量。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSmoothRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "sigma": ("FLOAT", {"default":5.0, "min":0.0, "max":128.0, "step":0.1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "smooth_region"

    def smooth_region(self, masks, sigma=128):
        if not isinstance(sigma, list):
            sigma = [sigma]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.smooth_region(pil_image, sigma[i if i < len(sigma) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
