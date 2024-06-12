# Documentation
- Class name: SD_4XUpscale_Conditioning
- Category: conditioning/upscale_diffusion
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SD_4XUpscale_Conditioning节点旨在通过应用4倍放大变换来增强图像质量。它利用扩散模型的能力进行条件放大图像，提供正向和负向调节输入以指导放大过程。该节点特别适用于从低分辨率输入生成高分辨率图像，同时不损害细节。

# Input types
## Required
- images
    - images参数是节点将放大的输入。它对节点的操作至关重要，因为它定义了将要转换的内容。输入图像的质量和分辨率直接影响节点的输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- positive
    - 正向调节输入用于指导放大过程以实现期望的结果。它有助于节点专注于增强图像的特定特征或方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - 负向调节输入用于在放大过程中抑制不需要的特征或伪影。它在保持原始图像内容的完整性中起着至关重要的作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
## Optional
- scale_ratio
    - scale_ratio参数决定了应用于输入图像的放大程度。它是控制输出图像最终分辨率的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_augmentation
    - 噪声增强是一个可选参数，它向放大过程引入随机噪声，这有助于生成更多样化的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - 正向输出提供了根据正向调节输入增强的条件放大图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - 负向输出包含根据负向调节输入进行了优化以抑制负向调节输入所指示的不需要的特征的条件放大图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- latent
    - latent输出代表放大图像的潜在空间表示，可用于进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SD_4XUpscale_Conditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'scale_ratio': ('FLOAT', {'default': 4.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'noise_augmentation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/upscale_diffusion'

    def encode(self, images, positive, negative, scale_ratio, noise_augmentation):
        width = max(1, round(images.shape[-2] * scale_ratio))
        height = max(1, round(images.shape[-3] * scale_ratio))
        pixels = comfy.utils.common_upscale(images.movedim(-1, 1) * 2.0 - 1.0, width // 4, height // 4, 'bilinear', 'center')
        out_cp = []
        out_cn = []
        for t in positive:
            n = [t[0], t[1].copy()]
            n[1]['concat_image'] = pixels
            n[1]['noise_augmentation'] = noise_augmentation
            out_cp.append(n)
        for t in negative:
            n = [t[0], t[1].copy()]
            n[1]['concat_image'] = pixels
            n[1]['noise_augmentation'] = noise_augmentation
            out_cn.append(n)
        latent = torch.zeros([images.shape[0], 4, height // 4, width // 4])
        return (out_cp, out_cn, {'samples': latent})
```