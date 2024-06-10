# Documentation
- Class name: VAEDecodeTiled
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAEDecodeTiled节点旨在使用变分自编码器（VAE）模型将潜在表示解码成图像。它以平铺的方式执行此解码，这对于处理大图像或计算资源有限时非常有益。节点的主要目标是提供一种方法，以内存高效和可扩展的方式从潜在代码生成图像。

# Input types
## Required
- samples
    - 'samplse'参数至关重要，因为它包含节点将解码成图像的潜在表示。这是一个必需的输入，直接影响节点的输出，决定了生成图像的特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - 'vae'参数指定了节点将用于解码潜在表示的变分自编码器模型。这个参数是必要的，因为它决定了模型的架构和参数，进而影响解码图像的质量和风格。
    - Comfy dtype: VAE
    - Python dtype: AutoencoderKL
## Optional
- tile_size
    - 'tile_size'参数决定了图像在解码时将被划分为多大尺寸的平铺。它是一个可选输入，可以根据内存使用和处理时间进行调整，以便更灵活地处理不同尺寸的图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 'output'参数代表节点生成的解码图像。它是节点执行的主要结果，具有重要意义，因为它反映了解码过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEDecodeTiled:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'
    CATEGORY = '_for_testing'

    def decode(self, vae, samples, tile_size):
        return (vae.decode_tiled(samples['samples'], tile_x=tile_size // 8, tile_y=tile_size // 8),)
```