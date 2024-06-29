# Documentation
- Class name: SUPIR_decode
- Category: SUPIR
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-SUPIR.git

SUPIR_decode节点旨在将潜在变量转换为视觉数据，在SUPIR系统的生成过程中扮演关键角色。它作为数据抽象表示与有形成果之间的接口，能够从编码信息中创建图像。该节点强调SUPIR框架中的重建方面，专注于生成视觉内容的保真度和质量。

# Input types
## Required
- SUPIR_VAE
    - SUPIR_VAE参数代表SUPIR框架中使用的变化自编码器模型。它对解码过程至关重要，因为它包含了将潜在代码转换为图像所需的信息和结构。此参数在确保生成的视觉数据的准确性和连贯性方面起着关键作用。
    - Comfy dtype: SUPIRVAE
    - Python dtype: torch.nn.Module
- latents
    - latents参数是一组编码变量，构成了图像生成过程的基础。它是关键的输入，因为它提供了SUPIR_decode节点将用来重建图像的基础结构和内容。latents的质量直接影响最终输出，使其成为生成过程中的重要组件。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- use_tiled_vae
    - use_tiled_vae参数是一个布尔标志，用于确定节点是否应采用分块方法进行解码。这种方法可以通过一次处理较小的部分来提高解码过程的效率和管理性，特别是对于较大的图像。这是优化SUPIR_decode节点性能的重要选项。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- decoder_tile_size
    - decoder_tile_size参数指定了激活分块解码方法时使用的瓦片的尺寸。它在平衡计算负载和内存使用方面起着至关重要的作用，确保解码过程针对可用的硬件资源进行了优化。适当的瓦片尺寸可以导致更高效和更快的图像重建。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 图像输出是解码过程的结果，SUPIR_decode节点已成功将潜在变量转换为视觉表示。这个输出是一个高分辨率的图像，反映了输入的latents，并体现了SUPIR系统的生成能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SUPIR_decode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'SUPIR_VAE': ('SUPIRVAE',), 'latents': ('LATENT',), 'use_tiled_vae': ('BOOLEAN', {'default': True}), 'decoder_tile_size': ('INT', {'default': 512, 'min': 64, 'max': 8192, 'step': 64})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'decode'
    CATEGORY = 'SUPIR'

    def decode(self, SUPIR_VAE, latents, use_tiled_vae, decoder_tile_size):
        device = mm.get_torch_device()
        mm.unload_all_models()
        samples = latents['samples']
        dtype = SUPIR_VAE.dtype
        (orig_H, orig_W) = latents['original_size']
        (B, H, W, C) = samples.shape
        pbar = comfy.utils.ProgressBar(B)
        SUPIR_VAE.to(device)
        if use_tiled_vae:
            from .SUPIR.utils.tilevae import VAEHook
            if not hasattr(SUPIR_VAE.decoder, 'original_forward'):
                SUPIR_VAE.decoder.original_forward = SUPIR_VAE.decoder.forward
            SUPIR_VAE.decoder.forward = VAEHook(SUPIR_VAE.decoder, decoder_tile_size // 8, is_decoder=True, fast_decoder=False, fast_encoder=False, color_fix=False, to_gpu=True)
        elif hasattr(SUPIR_VAE.decoder, 'original_forward'):
            SUPIR_VAE.decoder.forward = SUPIR_VAE.decoder.original_forward
        out = []
        for sample in samples:
            autocast_condition = dtype != torch.float32 and (not comfy.model_management.is_device_mps(device))
            with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():
                sample = 1.0 / 0.13025 * sample
                decoded_image = SUPIR_VAE.decode(sample.unsqueeze(0)).float()
                out.append(decoded_image)
                pbar.update(1)
        decoded_out = torch.cat(out, dim=0)
        if decoded_out.shape[2] != orig_H or decoded_out.shape[3] != orig_W:
            print('Restoring original dimensions: ', orig_W, 'x', orig_H)
            decoded_out = F.interpolate(decoded_out, size=(orig_H, orig_W), mode='bicubic')
        decoded_out = decoded_out.cpu().to(torch.float32).permute(0, 2, 3, 1)
        decoded_out = torch.clip(decoded_out, 0, 1)
        return (decoded_out,)
```