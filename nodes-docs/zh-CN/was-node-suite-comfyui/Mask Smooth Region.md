# Documentation
- Class name: WAS_Mask_Smooth_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Smooth_Region 节点旨在处理输入掩码并对其区域应用平滑效果。这对于生成无缝纹理或为进一步的图像处理任务准备掩码特别有用。节点使用高斯模糊技术平滑掩码内的区域，由 'sigma' 参数控制平滑的程度。节点的功能针对单个掩码和掩码批次进行了优化，确保了在各种应用中的灵活性和效率。

# Input types
## Required
- masks
    - 'masks' 参数是节点的关键输入，期望得到一个掩码或掩码批次。此输入直接影响节点的操作，因为它决定了将要平滑的区域。该参数对于节点产生期望的输出至关重要，影响最终纹理质量和平铺图像的无缝性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- sigma
    - 'sigma' 参数定义了要应用于掩码区域的平滑度。它是一个浮点数，用于调整高斯模糊的标准差，较高的值会导致更明显的平滑效果。这个参数是可选的，但对节点的输出有显著影响，允许用户控制平滑区域的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - 'MASKS' 输出提供了通过应用 'sigma' 参数定义的高斯模糊得到的平滑掩码或掩码批次。这个输出很重要，因为它代表了节点处理后的数据，可以用于后续操作或作为纹理生成的最终输出。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Smooth_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'sigma': ('FLOAT', {'default': 5.0, 'min': 0.0, 'max': 128.0, 'step': 0.1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'smooth_region'

    def smooth_region(self, masks, sigma=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.smooth_region(pil_image, sigma)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.smooth_region(pil_image, sigma)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```