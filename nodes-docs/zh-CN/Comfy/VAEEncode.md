# Documentation
- Class name: VAEEncode
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAEEncode节点旨在使用变分自编码器（VAE）模型将输入数据转换为潜在空间表示。它封装了编码过程，这对于降维、特征提取和生成建模等任务至关重要。该节点抽象了编码算法的复杂性，为用户提供了一个简化的接口，以便利用VAE的强大功能。

# Input types
## Required
- pixels
    - ‘pixels’参数是VAEEncode节点处理的原始图像数据，用于生成潜在表示。它在节点的功能中起着核心作用，因为它是编码过程的直接输入。‘pixels’数据的质量和特性直接影响生成的潜在空间。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数表示节点用于将输入像素编码到潜在空间的变分自编码器模型。它是节点的重要组成部分，因为它定义了VAE的架构和参数，这反过来又影响了编码结果。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- samples
    - VAEEncode节点的‘samples’输出包含输入像素的潜在空间表示。这是一个关键的输出，因为它以压缩形式捕获了输入数据的精髓，适用于分类、聚类或进一步的生成过程等各种下游任务。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'
    CATEGORY = 'latent'

    def encode(self, vae, pixels):
        t = vae.encode(pixels[:, :, :, :3])
        return ({'samples': t},)
```