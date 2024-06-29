# Documentation
- Class name: WAS_Mask_Dilate_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

dilate_region 方法旨在对输入掩码执行形态学膨胀，扩展掩码区域的边界。这一过程对于需要增强掩码边缘或在掩码区域内创建缓冲区的应用至关重要。通过应用指定次数的迭代，该方法允许控制膨胀的范围，因此为涉及掩码操作的各种图像处理任务提供了一种多功能工具。

# Input types
## Required
- masks
    - 输入掩码参数对于 dilate_region 方法至关重要，因为它定义了要进行膨胀的区域。这是一个关键组件，直接影响膨胀过程的结果。掩码应以该方法可以解释和处理的格式提供，通常作为张量或 numpy 数组。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- iterations
    - 迭代次数参数决定了对输入掩码应用膨胀操作的次数。它是一个可选参数，允许用户控制膨胀的程度，更多的迭代次数会导致更显著的效果。这个参数对于微调膨胀以适应特定应用需求非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - MASKS 输出参数代表膨胀过程的结果。它包含了经过指定次数迭代后从原始输入掩码扩展得到的膨胀掩码。这个输出非常重要，因为它是 dilate_region 方法的主要结果，用于进一步的图像处理或分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Dilate_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'iterations': ('INT', {'default': 5, 'min': 1, 'max': 64, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'dilate_region'

    def dilate_region(self, masks, iterations=5):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.dilate_region(pil_image, iterations)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.dilate_region(pil_image, iterations)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```