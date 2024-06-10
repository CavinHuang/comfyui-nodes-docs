# Documentation
- Class name: GaussianBlurMask
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GaussianBlurMask 节点对输入的遮罩应用高斯模糊效果，软化其边缘并减少噪声。它旨在通过平滑轮廓来增强遮罩的视觉质量，使其适合进一步处理或展示。

# Input types
## Required
- mask
    - 输入遮罩是节点的关键参数，它决定了将被模糊的图像内容。遮罩的尺寸和格式直接影响高斯模糊的应用方式以及对图像的最终效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor or np.ndarray
## Optional
- kernel_size
    - 核大小参数决定了高斯模糊效果的范围。它控制了计算模糊的区域大小，值越大，模糊效果越明显。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - sigma 参数定义了高斯核的标准差，它决定了模糊的程度。较高的 sigma 值会导致更强的模糊效果，而较低的值则产生更微妙的模糊。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- blurred_mask
    - 输出是输入遮罩的模糊版本，已经通过高斯模糊处理以实现更平滑的外观。这个输出对于需要精细遮罩边缘的应用场景至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GaussianBlurMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'kernel_size': ('INT', {'default': 10, 'min': 0, 'max': 100, 'step': 1}), 'sigma': ('FLOAT', {'default': 10.0, 'min': 0.1, 'max': 100.0, 'step': 0.1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, mask, kernel_size, sigma):
        mask = make_3d_mask(mask)
        mask = torch.unsqueeze(mask, dim=-1)
        mask = utils.tensor_gaussian_blur_mask(mask, kernel_size, sigma)
        mask = torch.squeeze(mask, dim=-1)
        return (mask,)
```