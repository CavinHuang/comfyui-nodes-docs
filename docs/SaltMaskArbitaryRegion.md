
# Documentation
- Class name: SaltMaskArbitaryRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskArbitaryRegion节点用于在给定的掩码中根据指定的大小和阈值参数过滤任意区域。此节点允许自定义掩码区域，适用于图像分割或物体隔离等多种应用场景。通过调整大小和阈值参数，用户可以精确控制过滤的区域范围和强度，从而实现对掩码的灵活处理和优化。

# Input types
## Required
- masks
    - 作为输入的掩码，是任意区域过滤操作的对象。这个参数对于定义需要处理的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- size
    - 指定任意区域过滤的大小参数，直接影响掩码中被过滤区域的尺度。通过调整此参数，可以控制处理的精细程度。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 决定任意区域过滤的阈值，影响掩码中哪些部分会被纳入处理范围。这个参数可以用来调整过滤的敏感度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出是根据指定的大小和阈值参数过滤后的修改版掩码。这个处理后的掩码可以用于后续的图像处理或分析任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskArbitaryRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "size": ("INT", {"default":256, "min":1, "max":4096, "step":1}),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "arbitrary_region"

    def arbitrary_region(self, masks, size=256, threshold=128):
        if not isinstance(threshold, list):
            threshold = [threshold]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.arbitrary_region(pil_image, size, int(threshold[i if i < len(threshold) else -1]))
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
