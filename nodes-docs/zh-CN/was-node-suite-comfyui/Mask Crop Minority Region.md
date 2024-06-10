# Documentation
- Class name: WAS_Mask_Crop_Minority_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Crop_Minority_Region 节点旨在处理输入图像或表示掩码的张量，并智能裁剪其中的少数区域。这对于专注于图像中不太突出的区域以进行进一步分析或处理特别有用。该节点可以处理单个掩码和掩码批次，并根据用户指定应用裁剪区域的填充。

# Input types
## Required
- masks
    - 输入掩码是此节点的主要输入，可以是单个掩码或多个掩码的堆栈，代表将被处理的图像区域。节点将识别这些掩码中的少数区域，并相应地执行裁剪操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- padding
    - padding 参数允许用户指定在裁剪的少数区域周围添加的填充量。这对于保留裁剪区域周围的上下文或与其他图像处理任务的无缝集成非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 节点的输出是输入掩码中裁剪的少数区域。它们可以用于进一步的处理或分析任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Crop_Minority_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'padding': ('INT', {'default': 24, 'min': 0, 'max': 4096, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'crop_minority_region'

    def crop_minority_region(self, masks, padding=24):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.crop_minority_region(mask_pil, padding)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.crop_minority_region(mask_pil, padding)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```