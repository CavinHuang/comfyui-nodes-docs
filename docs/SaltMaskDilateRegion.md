
# Documentation
- Class name: SaltMaskDilateRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/saltai-mlops/ComfyUI/blob/main/custom_nodes/salt_filters/salt_filters.py

SaltMaskDilateRegion节点在掩码区域应用膨胀滤波器，根据指定的迭代次数有效扩大掩码中的感兴趣区域。该节点旨在处理和修改掩码区域，以突出或放大掩码内的特定特征。

# Input types
## Required
- masks
    - 输入需要进行膨胀处理的掩码。这个参数对于定义图像中将要进行膨胀的区域至关重要，直接影响节点的输出结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- iterations
    - 指定对掩码应用膨胀操作的次数。这个参数控制膨胀的程度，影响掩码内特征的大小和可见性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 经过膨胀处理后的输出掩码。这些掩码呈现了经过修改的区域，其中感兴趣的区域已被扩大，展示了膨胀过程的效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskDilateRegion:
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

    FUNCTION = "dilate_region"

    def dilate_region(self, masks, iterations=5):
        if not isinstance(iterations, list):
            iterations = [iterations]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.dilate_region(pil_image, iterations[i if i < len(iterations) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
