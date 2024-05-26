# Documentation
- Class name: ReencodeLatent
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ReencodeLatent 是一个用于通过一对变分自编码器（VAE）重新编码潜在表示的节点。它首先使用输入VAE将输入样本解码成像素空间，然后使用输出VAE将它们重新编码回潜在空间。这个节点特别适用于需要在潜在和像素域中操纵和分析数据的任务。

# Input types
## Required
- samples
    - “samples”参数是ReencodeLatent节点的关键输入，因为它代表了将要重新编码的潜在表示。它对节点的执行至关重要，因为它决定了将经历解码和编码过程的数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- tile_mode
    - “tile_mode”参数决定像素数据的解码和编码如何处理。它可以设置为'None'、'Both'、'Decode(input) only'或'Encode(output) only'，这决定了节点是执行两个操作，还是选择性地执行解码或编码步骤。
    - Comfy dtype: COMBO[None, Both, Decode(input) only, Encode(output) only]
    - Python dtype: str
- input_vae
    - “input_vae”参数指定用于将潜在样本最初解码成像素空间的变分自编码器。它在节点的功能中起着重要作用，因为它决定了影响数据初始转换的模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- output_vae
    - “output_vae”参数定义了负责将像素数据重新编码成潜在表示的变分自编码器。这个参数至关重要，因为它决定了将形成节点最终输出的模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- tile_size
    - “tile_size”参数是一个可选输入，用于设置解码和编码过程中使用的瓦片大小。当tile_mode设置为'Both'或'Decode(input) only'时，它特别重要，影响像素数据处理的分辨率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - “latent”输出代表节点处理后重新编码的潜在表示。它很重要，因为它提供了可以用于进一步分析或作为后续节点输入的转换后数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ReencodeLatent:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'tile_mode': (['None', 'Both', 'Decode(input) only', 'Encode(output) only'],), 'input_vae': ('VAE',), 'output_vae': ('VAE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}}
    CATEGORY = 'ImpactPack/Util'
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'

    def doit(self, samples, tile_mode, input_vae, output_vae, tile_size=512):
        if tile_mode in ['Both', 'Decode(input) only']:
            pixels = nodes.VAEDecodeTiled().decode(input_vae, samples, tile_size)[0]
        else:
            pixels = nodes.VAEDecode().decode(input_vae, samples)[0]
        if tile_mode in ['Both', 'Encode(output) only']:
            return nodes.VAEEncodeTiled().encode(output_vae, pixels, tile_size)
        else:
            return nodes.VAEEncode().encode(output_vae, pixels)
```