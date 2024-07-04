
# Documentation
- Class name: SaltMaskFloorRegion
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskFloorRegion节点旨在识别和提取给定掩码中的地板区域。它会处理每个掩码以提取地板区域，并将其转换为表示地板区域的张量。

# Input types
## Required
- masks
    - 需要识别地板区域的输入掩码。这些掩码将被处理以提取地板区域，对节点的输出有重大影响。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 表示输入掩码中被隔离的地板区域的输出张量。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskFloorRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "floor_region"

    def floor_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.floor_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
