# Documentation
- Class name: WAS_Mask_Minority_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

minority_region 方法旨在处理输入掩码并识别其中的少数区域。它通过将掩码转换为 PIL 图像，应用阈值来区分不同的区域，然后隔离最小的区域。此方法特别适用于关注图像中不太显着或少数区域的应用，例如在图像分割或特征提取任务中。

# Input types
## Required
- masks
    - 输入掩码参数对于 minority_region 方法至关重要，因为它定义了图像内的兴趣区域。此参数影响方法识别和处理少数区域的方式，对结果的准确性至关重要。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]
## Optional
- threshold
    - 阈值参数用于确定掩码内不同区域之间的截止点。它在 minority_region 方法中起着重要作用，通过影响哪些区域被视为少数区域的一部分。默认值设置为 128，允许在应用阈值时具有一定的灵活性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - MASKS 输出参数代表从输入掩码处理后的少数区域。它是一个关键的输出，因为它提供了 minority_region 方法的最终结果，突出显示原始图像中不太显着的区域。
    - Comfy dtype: MASK
    - Python dtype: Tuple[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Minority_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'threshold': ('INT', {'default': 128, 'min': 0, 'max': 255, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'minority_region'

    def minority_region(self, masks, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.minority_region(pil_image, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.minority_region(pil_image, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```