# Documentation
- Class name: GuidedFilter
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

GuidedFilter节点应用了一种非线性过滤技术，该技术利用引导图像来影响过滤过程，旨在在去除噪声或平滑外观的同时保留原始图像的结构和边缘。

# Input types
## Required
- image
    - 图像参数是必需的，因为它提供了将在其上执行引导过滤操作的输入图像数据，这对输出质量和细节有重大影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- radius
    - 半径参数决定了滤波器考虑的局部邻域的大小，影响了滤波器在保留边缘的同时平滑图像的程度。
    - Comfy dtype: INT
    - Python dtype: int
- eps
    - eps参数控制引导滤波器的灵敏度，较低的值导致更激进的平滑，较高的值保留更多的细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- guide
    - 当提供引导参数时，它作为参考图像引导过滤过程，允许基于引导内容的选择性增强或抑制特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- output_image
    - 输出图像是引导滤波操作的结果，反映了输入图像与引导图像（如果有的话）提供的指导的结合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GuidedFilter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'radius': ('INT', {'default': 3, 'min': 0, 'step': 1}), 'eps': ('FLOAT', {'default': 125, 'min': 0, 'step': 1})}, 'optional': {'guide': ('IMAGE', {'default': None})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'guided_filter'
    CATEGORY = 'face_parsing'

    def guided_filter(self, image: Tensor, radius: int, eps: float, guide: Tensor | None=None):
        results = []
        for item in image:
            image_cv2 = cv2.cvtColor(item.mul(255).byte().numpy(), cv2.COLOR_RGB2BGR)
            guide_cv2 = image_cv2 if guide is None else cv2.cvtColor(guide.numpy(), cv2.COLOR_RGB2BGR)
            result_cv2 = cv2.ximgproc.guidedFilter(guide_cv2, image_cv2, radius, eps)
            result_cv2_rgb = cv2.cvtColor(result_cv2, cv2.COLOR_BGR2RGB)
            result = torch.tensor(result_cv2_rgb).float().div(255)
            results.append(result)
        return (torch.cat(results, dim=0).unsqueeze(0),)
```