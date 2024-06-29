# Documentation
- Class name: VAEEncodeTiled
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAEEncodeTiled节点旨在使用变分自编码器（VAE）高效且可并行地将图像数据编码成潜在空间表示。它通过将大图像划分为较小的可独立处理的区域来操作，然后将这些区域重新组装。这种方法特别适用于处理高分辨率图像，因为这些图像作为整体处理时可能无法适应内存。该节点抽象了平铺和编码的复杂性，为用户提供了一个简化的接口，以便利用VAE进行编码任务。

# Input types
## Required
- pixels
    - ‘pixels’参数是节点处理的输入图像数据。它至关重要，因为它是编码过程的原始材料。节点期望这些数据以与用于编码的VAE模型兼容的格式提供，通常涉及图像像素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数代表变分自编码器模型，节点将使用该模型对图像数据进行编码。这个模型对节点的功能至关重要，因为它定义了编码过程的架构和参数。
    - Comfy dtype: VAE
    - Python dtype: AutoencoderKL
## Optional
- tile_size
    - ‘tile_size’参数决定了输入图像被划分为用于处理的平铺的大小。这是一个可选参数，允许用户控制平铺的粒度，这可能影响性能和内存使用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - ‘samples’输出包含输入图像在潜在空间中的编码表示。这是节点操作的主要结果，对于任何需要以压缩形式理解图像底层结构的后续任务都非常重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncodeTiled:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'
    CATEGORY = '_for_testing'

    def encode(self, vae, pixels, tile_size):
        t = vae.encode_tiled(pixels[:, :, :, :3], tile_x=tile_size, tile_y=tile_size)
        return ({'samples': t},)
```