# Documentation
- Class name: StableCascade_SuperResolutionControlnet
- Category: _for_testing/stable_cascade
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

StableCascade_SuperResolutionControlnet节点旨在通过稳定的级联方法提高图像分辨率。它利用变分自编码器（VAE）对输入图像进行编码，并生成用于超分辨率的控制信号。此过程旨在放大图像的同时保持其完整性和细节。

# Input types
## Required
- image
    - 输入图像是节点的一个基本参数，因为它是用于超分辨率处理的原始数据。其质量和分辨率直接影响节点的输出，决定了最终增强图像的清晰度和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE参数对于节点的运行至关重要，因为它提供了生成控制信号所需的编码机制。VAE的选择和配置可以显著影响节点有效放大图像的能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- controlnet_input
    - controlnet_input是输入图像的加工版本，已经编码并为超分辨率控制网络准备就绪。这是一个关键的中间步骤，有助于生成高质量的放大图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- stage_c
    - stage_c输出代表了一个粗略级别的潜在表示，这是超分辨率过程中的关键组成部分。它捕获了图像的更广泛特征，并用于指导向上扩展到更高分辨率。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- stage_b
    - stage_b输出表示了一个更细粒度级别的潜在表示，这对于向放大图像添加细节至关重要。它确保最终图像在超分辨率过程后保留了复杂的细节和纹理。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class StableCascade_SuperResolutionControlnet:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'vae': ('VAE',)}}
    RETURN_TYPES = ('IMAGE', 'LATENT', 'LATENT')
    RETURN_NAMES = ('controlnet_input', 'stage_c', 'stage_b')
    FUNCTION = 'generate'
    CATEGORY = '_for_testing/stable_cascade'

    def generate(self, image, vae):
        width = image.shape[-2]
        height = image.shape[-3]
        batch_size = image.shape[0]
        controlnet_input = vae.encode(image[:, :, :, :3]).movedim(1, -1)
        c_latent = torch.zeros([batch_size, 16, height // 16, width // 16])
        b_latent = torch.zeros([batch_size, 4, height // 2, width // 2])
        return (controlnet_input, {'samples': c_latent}, {'samples': b_latent})
```