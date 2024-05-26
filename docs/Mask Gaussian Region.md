# Documentation
- Class name: WAS_Mask_Gaussian_Region
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Gaussian_Region 节点的 gaussian_region 方法旨在通过应用高斯模糊效果来处理输入掩码，这对于生成图像区域中的平滑过渡非常有用。这种方法通过减少可见接缝来增强纹理的视觉质量，使其适用于需要无缝纹理的应用，如游戏开发和3D建模。

# Input types
## Required
- masks
    - 输入掩码参数对于节点的操作至关重要，因为它定义了将要经历高斯模糊效果的图像区域。此参数直接影响纹理处理的结果，决定了生成的图像的平滑度和连续性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- radius
    - 半径参数决定了应用于输入掩码的高斯模糊的程度。较大的半径会导致更明显的模糊效果，可以用来创建图像不同区域之间更柔和的过渡。这个参数对于微调最终纹理的视觉外观至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - MASKS 输出提供了应用了高斯模糊的已处理图像掩码。这个输出很重要，因为它代表了节点操作的最终结果，可以用于进一步的图像处理任务或集成到更大的工作流程中。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Gaussian_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'radius': ('FLOAT', {'default': 5.0, 'min': 0.0, 'max': 1024, 'step': 0.1})}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'gaussian_region'

    def gaussian_region(self, masks, radius=5.0):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255.0 * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode='L')
                region_mask = self.WT.Masking.gaussian_region(pil_image, radius)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255.0 * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode='L')
            region_mask = self.WT.Masking.gaussian_region(pil_image, radius)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)
```