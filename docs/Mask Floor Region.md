# Documentation
- Class name: WAS_Mask_Floor_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

floor_region 方法旨在处理给定的掩码并识别其中的最低强度区域。它通过将掩码转换为 NumPy 数组，应用阈值来隔离非黑色像素，然后确定这些像素中的最小值来操作。该方法能够处理单个掩码和掩码批次，并返回表示处理区域的张量。

# Input types
## Required
- masks
    - 输入掩码参数对于 floor_region 方法至关重要，因为它定义了将被处理的掩码或掩码批次。节点的执行依赖于此输入来识别和基于它们的强度值操作掩码内的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 输出参数 MASKS 表示 floor_region 方法处理的结果。它是一个张量，包含了在输入掩码中识别出的最低强度区域，展示了节点在基于它们的强度值隔离和突出特定区域方面的功能。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Floor_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'floor_region'

    def floor_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.floor_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.floor_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```