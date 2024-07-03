
# Documentation
- Class name: SaltMaskSharpeningFilter
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskSharpeningFilter节点用于对一组遮罩应用锐化滤镜，根据指定的强度增强其边缘和细节。该节点旨在通过迭代应用锐化效果来优化遮罩的视觉效果，使遮罩中的特征更加突出。

# Input types
## Required
- masks
    - 需要进行锐化处理的遮罩集合。这个输入对于确定锐化滤镜将应用的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- strength
    - 定义锐化效果的强度。数值越高，对遮罩的锐化效果就越明显。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出是一个经过锐化处理的遮罩张量。每个遮罩都经过指定次数的锐化迭代，以增强其细节。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSharpeningFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "strength": ("INT", {"default": 1, "min": 1, "max": 12, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "sharpening_filter"

    def sharpening_filter(self, masks, strength=1.5):
        if not isinstance(strength, list):
            strength = [strength]

        strength = [int(val) for val in strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))

            for _ in range(strength[i if i < len(strength) else -1]):
                pil_image = pil_image.filter(ImageFilter.SHARPEN)

            region_tensor = pil2mask(pil_image)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
