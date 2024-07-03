
# Documentation
- Class name: SaltMaskGaussianRegion
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskGaussianRegion节点在指定的掩码区域应用高斯滤波，用于软化边缘和混合区域，从而实现更平滑的外观效果。这个节点特别适用于那些专注于增强或修改掩码区域视觉特征的图像处理任务。

# Input types
## Required
- masks
    - 将要应用高斯滤波的掩码。这些掩码定义了需要处理以实现更平滑外观的区域。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
- radius
    - 指定高斯滤波的半径。较大的半径会产生更明显的平滑效果，从而可以更好地控制掩码区域的混合和软化程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - 应用高斯滤波后的修改掩码，呈现出更平滑和更混合的区域效果。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskGaussianRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "radius": ("FLOAT", {"default": 5.0, "min": 0.0, "max": 1024, "step": 0.1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "gaussian_region"

    def gaussian_region(self, masks, radius=5.0):
        if not isinstance(radius, list):
            radius = [radius]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.gaussian_region(pil_image, radius[i if i < len(radius) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
