
# Documentation
- Class name: SaltMaskCeilingRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskCeilingRegion节点专门用于识别和提取给定遮罩集中的天花板区域。它对每个遮罩进行处理，以突出显示天花板区域，从而便于对这些特定区域进行集中分析或修改。这个节点在处理室内场景图像时特别有用，可以帮助isolate天花板区域以进行后续处理或特效应用。

# Input types
## Required
- masks
    - 这个参数是用于天花板区域识别的输入遮罩。它对于确定每个遮罩中对应于天花板区域的部分至关重要。输入的遮罩决定了节点的工作范围和最终输出的质量。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 输出的MASKS是经过处理后的遮罩，其中天花板区域已被识别并从原始输入遮罩中分离出来。这些处理后的遮罩可以用于进一步的图像处理任务，如天花板纹理替换、照明效果模拟等。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskCeilingRegion:
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

    FUNCTION = "ceiling_region"
    
    def ceiling_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.ceiling_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
