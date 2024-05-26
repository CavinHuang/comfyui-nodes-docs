# Documentation
- Class name: SUPIR_encode
- Category: SUPIR
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-SUPIR.git

SUPIR_encode节点旨在使用变分自编码器模型高效处理和编码图像到潜在空间。它通过根据输入图像大小和指定的瓦片大小调整模型的前向传递来优化编码过程，确保计算效率和内存保持在合理范围内。

# Input types
## Required
- SUPIR_VAE
    - SUPIR_VAE参数代表用于编码输入图像的变分自编码器模型。它对于节点的操作至关重要，因为它定义了在编码过程中将应用的架构和参数。
    - Comfy dtype: SUPIRVAE
    - Python dtype: torch.nn.Module
- image
    - image参数是SUPIR_encode节点的输入数据。它至关重要，因为它是编码过程的对象，图像的质量和尺寸直接影响最终的潜在表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- encoder_dtype
    - encoder_dtype参数指定了编码器内部计算使用的数据类型。它在平衡节点的性能和精度方面发挥重要作用，影响编码的速度和质量。
    - Comfy dtype: STR
    - Python dtype: str
- use_tiled_vae
    - use_tiled_vae参数决定节点是否应使用分块方法进行编码过程。这对于处理更大的图像很有帮助，通过将它们分解成更小、更易管理的部分，可能会提高内存使用和编码效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- encoder_tile_size
    - encoder_tile_size参数定义了启用分块编码方法时使用的瓦片大小。它对于优化编码过程很重要，特别是对于高分辨率图像，通过控制瓦片划分的粒度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - latent参数代表SUPIR_encode节点的输出，即输入图像的编码版本，形式为潜在向量。这种压缩表示对于管道内的进一步分析或生成任务至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SUPIR_encode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'SUPIR_VAE': ('SUPIRVAE',), 'image': ('IMAGE',), 'use_tiled_vae': ('BOOLEAN', {'default': True}), 'encoder_tile_size': ('INT', {'default': 512, 'min': 64, 'max': 8192, 'step': 64}), 'encoder_dtype': (['bf16', 'fp32', 'auto'], {'default': 'auto'})}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latent',)
    FUNCTION = 'encode'
    CATEGORY = 'SUPIR'

    def encode(self, SUPIR_VAE, image, encoder_dtype, use_tiled_vae, encoder_tile_size):
        device = mm.get_torch_device()
        mm.unload_all_models()
        if encoder_dtype == 'auto':
            try:
                if mm.should_use_bf16():
                    print('Encoder using bf16')
                    vae_dtype = 'bf16'
                else:
                    print('Encoder using using fp32')
                    vae_dtype = 'fp32'
            except:
                raise AttributeError("ComfyUI version too old, can't autodetect properly. Set your dtypes manually.")
        else:
            vae_dtype = encoder_dtype
            print(f'Encoder using using {vae_dtype}')
        dtype = convert_dtype(vae_dtype)
        image = image.permute(0, 3, 1, 2)
        (B, C, H, W) = image.shape
        downscale_ratio = 32
        (orig_H, orig_W) = (H, W)
        if W % downscale_ratio != 0:
            W = W - W % downscale_ratio
        if H % downscale_ratio != 0:
            H = H - H % downscale_ratio
        if orig_H % downscale_ratio != 0 or orig_W % downscale_ratio != 0:
            image = F.interpolate(image, size=(H, W), mode='bicubic')
        resized_image = image.to(device)
        if use_tiled_vae:
            from .SUPIR.utils.tilevae import VAEHook
            if not hasattr(SUPIR_VAE.encoder, 'original_forward'):
                SUPIR_VAE.encoder.original_forward = SUPIR_VAE.encoder.forward
            SUPIR_VAE.encoder.forward = VAEHook(SUPIR_VAE.encoder, encoder_tile_size, is_decoder=False, fast_decoder=False, fast_encoder=False, color_fix=False, to_gpu=True)
        elif hasattr(SUPIR_VAE.encoder, 'original_forward'):
            SUPIR_VAE.encoder.forward = SUPIR_VAE.encoder.original_forward
        pbar = comfy.utils.ProgressBar(B)
        out = []
        for img in resized_image:
            SUPIR_VAE.to(dtype).to(device)
            autocast_condition = dtype != torch.float32 and (not comfy.model_management.is_device_mps(device))
            with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():
                z = SUPIR_VAE.encode(img.unsqueeze(0))
                z = z * 0.13025
                out.append(z)
                pbar.update(1)
        if len(out[0].shape) == 4:
            samples_out_stacked = torch.cat(out, dim=0)
        else:
            samples_out_stacked = torch.stack(out, dim=0)
        return ({'samples': samples_out_stacked, 'original_size': [orig_H, orig_W]},)
```