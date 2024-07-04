
# Documentation
- Class name: SaltMaskErodeRegion
- Category: SALT/Masking/Filter
- Output node: False

此节点对掩码区域应用腐蚀滤波器,根据指定的迭代次数有效地缩小掩码区域。它旨在通过腐蚀掩码区域的边缘来优化掩码边界。

# Input types
## Required
- masks
    - 要进行腐蚀的输入掩码。该参数对于定义腐蚀操作要处理和优化的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- iterations
    - 指定对每个掩码应用腐蚀操作的次数,允许调整效果的强度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 应用腐蚀滤波器后的输出掩码,展示了经过优化和缩小的掩码区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskErodeRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "iterations": ("INT", {"default":5, "min":1, "max":64, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "erode_region"

    def erode_region(self, masks, iterations=5):
        if not isinstance(iterations, list):
            iterations = [iterations]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.erode_region(pil_image, iterations[i if i < len(iterations) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
