# Documentation
- Class name: WAS_Mask_Dominant_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

dominant_region 方法旨在识别和隔离给定掩码图像中最突出的区域。它处理输入图像以突出显示基于指定阈值的最大连续区域。该方法特别适用于重点放在图像中的主要主题或特征的应用中，例如图像分割或特征提取任务。

# Input types
## Required
- masks
    - 输入掩码参数对于节点的操作至关重要，因为它定义了要处理的图像数据。节点依赖此输入来识别图像中的主导区域，使其成为直接影响节点功能执行和结果的关键组件。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- threshold
    - 阈值参数在确定图像中接缝的可见性方面起着重要作用。通过调整阈值，用户可以控制接缝的可见性与结果图像大小之间的平衡，这对于需要无缝纹理或图案的应用程序至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出 MASKS 参数表示已处理的图像数据，其中已识别并隔离了主要区域。此输出很重要，因为它提供了节点操作的结果，可以进一步用于下游流程或应用程序。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Dominant_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'threshold': ('INT', {'default': 128, 'min': 0, 'max': 255, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'dominant_region'

    def dominant_region(self, masks, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.dominant_region(mask_pil, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.dominant_region(mask_pil, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```