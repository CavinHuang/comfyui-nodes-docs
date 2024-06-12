# Documentation
- Class name: VAEEncodeTiled_TiledDiffusion
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI-TiledDiffusion

该节点封装了以平铺方式编码和扩散数据的过程，优化了内存使用和处理效率。它旨在通过将输入分割成可管理的平铺块来处理大规模数据转换，从而促进高效的计算和资源分配。

# Input types
## Required
- pixels
    - 输入的图像数据对于编码和扩散过程至关重要，因为它提供了节点执行转换的原始材料。没有这个输入，节点无法生成潜在表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE模型是编码过程的核心，负责将输入数据转换到潜在空间，然后用于进一步的扩散。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- tile_size
    - 平铺大小参数决定了输入数据划分的粒度，直接影响编码和扩散过程的效率。必须谨慎选择，以平衡计算资源和内存使用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- fast
    - 当启用快速参数时，允许节点执行某些优化，从而加快编码和扩散过程，尽管可能会有质量上的权衡。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- color_fix
    - 当激活此参数时，对输入数据应用颜色校正步骤，确保潜在空间表示更加稳健，不易产生伪影。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent
    - 输出的潜在表示是输入数据的压缩版本，捕捉了低维空间中的基本特征和结构。它是后续扩散步骤的关键组成部分。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncodeTiled_TiledDiffusion(TiledVAE):

    @classmethod
    def INPUT_TYPES(s):
        fast = True
        tile_size = get_rcmd_enc_tsize()
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'tile_size': ('INT', {'default': tile_size, 'min': 256, 'max': 4096, 'step': 16}), 'fast': ('BOOLEAN', {'default': fast}), 'color_fix': ('BOOLEAN', {'default': fast})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'process'
    CATEGORY = '_for_testing'

    def __init__(self):
        self.is_decoder = False
        super().__init__()
```