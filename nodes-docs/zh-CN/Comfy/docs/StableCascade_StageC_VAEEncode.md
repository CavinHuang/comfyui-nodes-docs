# Documentation
- Class name: StableCascade_StageC_VAEEncode
- Category: latent/stable_cascade
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

`StableCascade_StageC_VAEEncode` 节点旨在使用变分自编码器（VAE）将图像编码为潜在表示。它将输入图像上采样到所需的分辨率，然后应用VAE生成压缩的潜在空间表示。该节点在图像压缩和重建过程中起着至关重要的作用，使得视觉数据的存储和传输更加高效。

# Input types
## Required
- image
    - 输入图像参数对于节点的操作至关重要，因为它是节点处理以生成潜在表示的原始数据。输入图像的质量和分辨率直接影响节点的输出以及任何下游任务中的后续性能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE参数表示变分自编码器模型，节点利用该模型将输入图像编码为潜在空间。VAE模型的选择和配置显著影响节点压缩和有效重建图像的能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- compression
    - 压缩参数决定了编码前图像的下采样级别，这是平衡重建图像质量与编码过程效率之间权衡的关键因素。它允许根据特定需求微调节点的操作。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- stage_c
    - 'stage_c'输出代表了由VAE生成的输入图像的压缩潜在表示。它是图像处理阶段级联中的关键组件，作为后续阶段进一步细化或分析的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- stage_b
    - 'stage_b'输出是补充'stage_c'输出的占位潜在表示。它被初始化为零，并可在更复杂的图像操作流水线中用于扩展或额外处理。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class StableCascade_StageC_VAEEncode:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'vae': ('VAE',), 'compression': ('INT', {'default': 42, 'min': 4, 'max': 128, 'step': 1})}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('stage_c', 'stage_b')
    FUNCTION = 'generate'
    CATEGORY = 'latent/stable_cascade'

    def generate(self, image, vae, compression):
        width = image.shape[-2]
        height = image.shape[-3]
        out_width = width // compression * vae.downscale_ratio
        out_height = height // compression * vae.downscale_ratio
        s = comfy.utils.common_upscale(image.movedim(-1, 1), out_width, out_height, 'bicubic', 'center').movedim(1, -1)
        c_latent = vae.encode(s[:, :, :, :3])
        b_latent = torch.zeros([c_latent.shape[0], 4, height // 8 * 2, width // 8 * 2])
        return ({'samples': c_latent}, {'samples': b_latent})
```