# Documentation
- Class name: WAS_Mask_Ceiling_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Ceiling_Region节点的ceiling_region方法旨在处理输入掩码并识别其中的最上区域。它的工作原理是将掩码转换为PIL图像，应用天花板效果以隔离顶部区域，然后将结果转换回适合进一步图像处理任务的张量格式。

# Input types
## Required
- masks
    - 输入掩码参数对于ceiling_region方法至关重要，因为它提供了节点将处理的原始掩码数据。此参数直接影响节点的输出，它决定了图像中的哪些区域被识别为最上区域。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - MASKS输出参数代表包含从输入掩码中处理过的区域的张量。这个输出很重要，因为它是节点处理的成果，用于图像分析流程中的后续任务。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Ceiling_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'ceiling_region'

    def ceiling_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.ceiling_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.ceiling_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```