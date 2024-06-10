# Documentation
- Class name: WAS_Mask_Crop_Dominant_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

crop_dominant_region 方法旨在处理输入掩码并智能裁剪每个掩码中的主导区域。这对于专注于图像的最重要部分特别有用，对于图像摘要、对象识别和内容感知图像调整大小等应用非常有益。该方法应用填充以确保裁剪区域不会太靠近边缘，从而提高结果图像的质量。

# Input types
## Required
- masks
    - 输入掩码参数对于节点的操作至关重要，因为它定义了图像内的兴趣区域。此参数直接影响力节点的输出，它决定了裁剪过程后将保留图像的哪些部分。掩码应作为张量提供，以确保与节点的内部处理机制兼容。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- padding
    - padding 参数用于指定裁剪后保留在主导区域周围的空间量。它对于防止裁剪区域太靠近图像边缘至关重要，这可能导致更令人愉悦的结果。默认值设置为24，合理地平衡了专注于主导区域和保持图像上下文之间的关系。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出参数 MASKS 表示在主导区域裁剪过程后的生成掩码。它是一个包含裁剪后兴趣区域的张量，可以用于进一步的图像处理或分析。此输出的重要性在于其能够提供原始图像的专注子集，可能提高后续操作的效率。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Crop_Dominant_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'padding': ('INT', {'default': 24, 'min': 0, 'max': 4096, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'crop_dominant_region'

    def crop_dominant_region(self, masks, padding=24):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.crop_dominant_region(mask_pil, padding)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.crop_dominant_region(mask_pil, padding)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```