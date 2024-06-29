# Documentation
- Class name: WAS_Mask_Threshold_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Threshold_Region 节点旨在通过应用阈值处理图像掩码，以区分图像内的各个区域。它使用黑色和白色阈值来创建一个二进制掩码，根据像素强度对图像进行分段。此节点对于图像分割、目标检测以及任何需要基于颜色或亮度级别区分图像区域的应用至关重要。

# Input types
## Required
- masks
    - 输入掩码是节点操作的主要来源。它们用于生成图像内的阈值区域。此参数至关重要，因为节点的所有功能都围绕着这些掩码的操纵和分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- black_threshold
    - black_threshold 参数定义了像素被认为属于黑色区域的强度值下限。它在根据颜色强度将图像分割为不同区域的确定中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- white_threshold
    - white_threshold 参数用于定义像素被认为属于白色区域的强度值上限。它是控制分割过程和确定图像内白色区域的重要参数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - MASKS 输出由应用阈值操作后处理的图像掩码组成。这个输出很重要，因为它代表了根据指定的阈值输入图像的最终分段区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Threshold_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'black_threshold': ('INT', {'default': 75, 'min': 0, 'max': 255, 'step': 1}), 'white_threshold': ('INT', {'default': 175, 'min': 0, 'max': 255, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'threshold_region'

    def threshold_region(self, masks, black_threshold=75, white_threshold=255):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.threshold_region(pil_image, black_threshold, white_threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.threshold_region(pil_image, black_threshold, white_threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```