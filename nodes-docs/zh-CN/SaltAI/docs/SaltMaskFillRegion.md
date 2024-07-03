
# Documentation
- Class name: SaltMaskFillRegion
- Category: SALT/Masking/Filter
- Output node: False

该节点旨在填充遮罩内的区域，通过识别和填充指定区域来转换输入遮罩，从而生成经过修改的遮罩。

# Input types
## Required
- masks
    - 需要进行区域填充处理的输入遮罩。这个参数对于确定每个遮罩中将进行填充操作的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 输出包含已填充指定区域的遮罩，这是对输入遮罩处理的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskFillRegion:
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

    FUNCTION = "fill_region"

    def fill_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.fill_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
