# Documentation
- Class name: IterativeImageUpscale
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

IterativeImageUpscale节点的'doit'方法旨在执行迭代图像放大。它接收一张图像，并通过一系列细化步骤逐步提高其分辨率。该节点利用潜在空间模型对图像进行编码和解码，应用放大因子并在指定的步骤数上迭代，以实现所需的细节水平。

# Input types
## Required
- pixels
    - 'pixels'参数表示需要放大的输入图像。这是一个关键元素，因为整个操作围绕通过迭代处理提高此图像的分辨率展开。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- upscale_factor
    - 'upscale_factor'参数定义了放大过程中的放大级别。它决定了输入图像在处理后将被放大多少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - 'steps'参数表示在放大过程中要执行的迭代步骤数。更多的步骤通常会导致更平滑、更详细的放大图像。
    - Comfy dtype: INT
    - Python dtype: int
- upscaler
    - 'upscaler'参数指的是将应用于增加图像分辨率的放大方法或模型。它是放大过程的重要组成部分。
    - Comfy dtype: UPSCALER
    - Python dtype: Any
- vae
    - 'vae'参数是变分自编码器（VAE）的一个实例，用于在放大过程中对图像数据进行编码和解码。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- temp_prefix
    - 'temp_prefix'参数用于指定在放大过程中存储中间结果的临时文件前缀。可以留空以使用默认行为。
    - Comfy dtype: STRING
    - Python dtype: str
- step_mode
    - 'step_mode'参数确定在每个步骤中用于缩放图像的方法。它可以是'simple'用于线性缩放，或者'geometric'用于指数缩放。
    - Comfy dtype: COMBO[simple, geometric]
    - Python dtype: str
- unique_id
    - 'unique_id'参数用于内部跟踪放大操作的进度和状态。它通常对用户隐藏，并自动分配。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- image
    - 'image'输出参数代表了通过迭代放大过程得到的放大图像。它是节点功能的最终产物。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class IterativeImageUpscale:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'upscale_factor': ('FLOAT', {'default': 1.5, 'min': 1, 'max': 10000, 'step': 0.1}), 'steps': ('INT', {'default': 3, 'min': 1, 'max': 10000, 'step': 1}), 'temp_prefix': ('STRING', {'default': ''}), 'upscaler': ('UPSCALER',), 'vae': ('VAE',), 'step_mode': (['simple', 'geometric'], {'default': 'simple'})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, pixels, upscale_factor, steps, temp_prefix, upscaler, vae, step_mode='simple', unique_id=None):
        if temp_prefix == '':
            temp_prefix = None
        core.update_node_status(unique_id, 'VAEEncode (first)', 0)
        if upscaler.is_tiled:
            latent = nodes.VAEEncodeTiled().encode(vae, pixels, upscaler.tile_size)[0]
        else:
            latent = nodes.VAEEncode().encode(vae, pixels)[0]
        refined_latent = IterativeLatentUpscale().doit(latent, upscale_factor, steps, temp_prefix, upscaler, step_mode, unique_id)
        core.update_node_status(unique_id, 'VAEDecode (final)', 1.0)
        if upscaler.is_tiled:
            pixels = nodes.VAEDecodeTiled().decode(vae, refined_latent[0], upscaler.tile_size)[0]
        else:
            pixels = nodes.VAEDecode().decode(vae, refined_latent[0])[0]
        core.update_node_status(unique_id, '', None)
        return (pixels,)
```