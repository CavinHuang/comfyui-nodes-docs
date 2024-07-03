
# Documentation
- Class name: SaltMaskThresholdRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点对掩码区域应用阈值过滤器，根据指定的黑白阈值对它们进行分割。它旨在隔离和增强掩码中的区域，使得根据不同区域的强度水平更容易区分它们。

# Input types
## Required
- masks
    - 要处理的输入掩码。这些掩码基于提供的阈值进行分割，这些阈值决定了定义区域边界的强度水平。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
- black_threshold
    - 像素强度的下限。强度低于该值的像素被设置为黑色，有助于分割掩码中较暗的区域。
    - Comfy dtype: INT
    - Python dtype: int
- white_threshold
    - 像素强度的上限。强度高于该值的像素被设置为白色，有助于分割掩码中较亮的区域。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 应用阈值过滤器后的输出掩码，区域基于指定的黑白阈值进行分割。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskThresholdRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "black_threshold": ("INT",{"default":75, "min":0, "max": 255, "step": 1}),
                        "white_threshold": ("INT",{"default":175, "min":0, "max": 255, "step": 1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "threshold_region"

    def threshold_region(self, masks, black_threshold=75, white_threshold=255):
        if not isinstance(black_threshold, list):
            black_threshold = [black_threshold]
        if not isinstance(white_threshold, list):
            white_threshold = [white_threshold]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.threshold_region(
                pil_image, 
                int(black_threshold[i if i < len(black_threshold) else -1]), 
                int(white_threshold[i if i < len(white_threshold) else -1])
            )
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
