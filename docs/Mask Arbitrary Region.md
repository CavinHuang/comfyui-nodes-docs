# Documentation
- Class name: WAS_Mask_Arbitrary_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Arbitrary_Region节点的arbitrary_region方法旨在处理输入掩码，并根据提供的大小和阈值参数生成表示感兴趣区域的张量。该方法特别适用于需要识别和提取图像中特定区域的应用，例如图像编辑、分析或涉及区域焦点的机器学习任务。

# Input types
## Required
- masks
    - 输入掩码参数对于arbitrary_region方法至关重要，因为它定义了将从中提取感兴趣区域的来源。输入掩码的质量和特性直接影响区域识别过程的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- size
    - 大小参数决定了将被视为感兴趣区域的区域的尺寸。它是该方法中的一个关键因素，因为它直接影响提取区域的规模。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 阈值参数用于设置在输入掩码内识别感兴趣区域的灵敏度级别。它在区域提取的准确性中扮演着重要角色。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - MASKS输出参数代表包含从输入掩码中提取的感兴趣区域的张量。它是一个重要的输出，因为它提供了arbitrary_region方法的最终结果，可供进一步处理或分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Arbitrary_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'size': ('INT', {'default': 256, 'min': 1, 'max': 4096, 'step': 1}), 'threshold': ('INT', {'default': 128, 'min': 0, 'max': 255, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'arbitrary_region'

    def arbitrary_region(self, masks, size=256, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.arbitrary_region(pil_image, size, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.arbitrary_region(pil_image, size, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```