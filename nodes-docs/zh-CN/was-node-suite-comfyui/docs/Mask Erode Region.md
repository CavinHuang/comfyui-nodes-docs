# Documentation
- Class name: WAS_Mask_Erode_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

erode_region 方法旨在通过应用腐蚀效果来处理输入掩码，修剪掩码区域的边界。在图像处理任务中，例如去除噪声或隔离图像中的不同区域，这种方法特别有用。它通过迭代减小掩码区域的大小来操作，从而创建更平滑和更明确边界。可以通过迭代参数控制腐蚀的程度，允许微调效果。

# Input types
## Required
- masks
    - 输入掩码参数对于 erode_region 方法至关重要，因为它定义了将要经历腐蚀的图像区域。此参数直接影响节点的执行和结果，决定了图像的哪些部分将受到腐蚀过程的影响。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- iterations
    - 迭代次数参数用于控制应用于输入掩码的腐蚀效果的程度。更高的值会导致更明显的腐蚀，导致掩码区域的大小更显著地减少。该参数对于调整腐蚀的强度以达到所需的视觉效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - MASKS 输出参数代表应用腐蚀过程后的最终掩码。它是一个关键的输出，因为它反映了腐蚀后图像区域的最终状态，包含了后续工作流程中进一步处理或分析所需的信息。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Erode_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'iterations': ('INT', {'default': 5, 'min': 1, 'max': 64, 'step': 1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'erode_region'

    def erode_region(self, masks, iterations=5):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.erode_region(pil_image, iterations)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.erode_region(pil_image, iterations)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```