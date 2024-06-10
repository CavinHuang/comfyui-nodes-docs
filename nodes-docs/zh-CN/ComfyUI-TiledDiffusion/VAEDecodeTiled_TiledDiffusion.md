# Documentation
- Class name: VAEDecodeTiled_TiledDiffusion
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI-TiledDiffusion

该节点旨在使用变分自编码器（VAE）模型从潜在表示中解码和重建图像，强调通过平铺和扩散技术处理大图像。它旨在平衡计算效率和图像质量之间的权衡，为图像重建任务提供稳健的解决方案。

# Input types
## Required
- samples
    - 输入样本代表节点用于生成重建图像的潜在空间向量。这些至关重要，因为它们构成了图像重建过程的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - VAE参数指的是节点使用的预训练变分自编码器模型，用于执行解码过程。对于从潜在空间重建图像至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- tile_size
    - 平铺大小参数决定了用于处理图像的平铺的尺寸。它对于优化解码过程中的内存使用和计算效率很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fast
    - 当启用快速参数时，允许节点以牺牲潜在图像质量为代价进行更快的解码。它影响重建过程中速度和准确性之间的平衡。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 输出图像是节点解码过程的结果，代表从潜在空间中原始输入的重建版本。它是表示节点主要功能的关键输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEDecodeTiled_TiledDiffusion(TiledVAE):

    @classmethod
    def INPUT_TYPES(s):
        tile_size = get_rcmd_dec_tsize() * opt_f
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',), 'tile_size': ('INT', {'default': tile_size, 'min': 48 * opt_f, 'max': 4096, 'step': 16}), 'fast': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'process'
    CATEGORY = '_for_testing'

    def __init__(self):
        self.is_decoder = True
        super().__init__()
```