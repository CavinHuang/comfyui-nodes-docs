# Documentation
- Class name: WAS_Mask_Fill_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Fill_Region 节点旨在处理图像掩码并填充指定区域，这对于涉及图像分割或基于区域操作的应用至关重要。它利用 WAS_Tools_Class 的能力执行实际填充，确保填充区域被适当地集成到掩码中。当需要创建无缝纹理或合成图，其中区域的连续性很重要时，此节点特别有用。

# Input types
## Required
- masks
    - 'masks' 参数是节点的关键输入，它定义了将被处理的二进制掩码。它对节点的执行至关重要，因为它直接影响被填充的区域。该参数期望一个掩码数组，其中每个掩码对应一个要填充的区域。
    - Comfy dtype: np.ndarray
    - Python dtype: numpy.ndarray

# Output types
- MASKS
    - 'MASKS' 输出参数代表了节点操作的结果，即掩码内填充区域的数组。这个输出很重要，因为它提供了可以用于各种应用中进一步分析或渲染的处理过的掩码。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Fill_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'fill_region'

    def fill_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.fill_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.fill_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```