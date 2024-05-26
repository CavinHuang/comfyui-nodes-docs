# Documentation
- Class name: CircularVAEDecode
- Category: latent
- Output node: False
- Repo Ref: https://github.com/FlyingFireCo/tiled_ksampler.git

CircularVAEDecode节点旨在使用变分自编码器（VAE）将潜在表示解码回图像。它特别将VAE中卷积层的填充模式修改为'circular'，这有助于处理边缘效应，特别适用于图像生成任务。节点的主要功能是将潜在空间数据转换为视觉格式，便于解释和可视化编码信息。

# Input types
## Required
- samples
    - 'samles'参数至关重要，因为它保存了节点将解码成图像的潜在表示。这是一个强制性输入，直接影响节点的输出，决定了生成图像的质量和特性。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - 'vae'参数代表变分自编码器模型，节点将使用该模型来解码潜在样本。这是一个必要的输入，决定了解码过程的结构和功能方面。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Output types
- image
    - 'image'输出是节点的主要结果，代表从潜在样本生成的解码图像。它标志着潜在空间数据成功转换为人类可解释的视觉格式。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CircularVAEDecode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'
    CATEGORY = 'latent'

    def decode(self, vae, samples):
        for layer in [layer for layer in vae.first_stage_model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_mode = 'circular'
        return (vae.decode(samples['samples']),)
```