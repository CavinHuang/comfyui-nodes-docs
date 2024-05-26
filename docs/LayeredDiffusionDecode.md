# Documentation
- Class name: LayeredDiffusionDecode
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionDecode 类旨在执行像素值解码过程，以重建带有 alpha 通道的图像，有效地将透明度信息与 RGB 组件分离。它能够处理不同版本的扩散模型，并与系统集成，提供无缝的图像生成体验。

# Input types
## Required
- samples
    - “samples”参数对于提供解码过程所需的潜在表示至关重要。它作为图像重建的基础，确保输出与预期的生成模型一致。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- images
    - “images”参数至关重要，因为它提供了需要解码的原始像素数据。这些数据是提取 alpha 通道和图像重建的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- sd_version
    - “sd_version”参数指示用于解码过程的稳定扩散模型的版本。它很重要，因为它决定了将应用于解码的模型的特定特征和能力。
    - Comfy dtype: StableDiffusionVersion
    - Python dtype: Enum
- sub_batch_size
    - “sub_batch_size”参数定义了每次解码迭代中处理的图像数量，优化了计算效率和内存使用的权衡。它影响解码过程的吞吐量和资源分配。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - “image”输出代表重建的 RGB 图像数据，是解码过程的主要结果。它反映了应用的扩散模型的生成能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - “mask”输出提供 alpha 通道信息，这对于定义重建图像的透明度至关重要。它是进一步图像处理和操作的重要组件。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionDecode:
    """
    Decode alpha channel value from pixel value.
    [B, C=3, H, W] => [B, C=4, H, W]
    Outputs RGB image + Alpha mask.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'images': ('IMAGE',), 'sd_version': ([StableDiffusionVersion.SD1x.value, StableDiffusionVersion.SDXL.value], {'default': StableDiffusionVersion.SDXL.value}), 'sub_batch_size': ('INT', {'default': 16, 'min': 1, 'max': 4096, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'decode'
    CATEGORY = 'layer_diffuse'

    def __init__(self) -> None:
        self.vae_transparent_decoder = {}

    def decode(self, samples, images, sd_version: str, sub_batch_size: int):
        """
        sub_batch_size: How many images to decode in a single pass.
        See https://github.com/huchenlei/ComfyUI-layerdiffuse/pull/4 for more
        context.
        """
        sd_version = StableDiffusionVersion(sd_version)
        if sd_version == StableDiffusionVersion.SD1x:
            url = 'https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_vae_transparent_decoder.safetensors'
            file_name = 'layer_sd15_vae_transparent_decoder.safetensors'
        elif sd_version == StableDiffusionVersion.SDXL:
            url = 'https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/vae_transparent_decoder.safetensors'
            file_name = 'vae_transparent_decoder.safetensors'
        if not self.vae_transparent_decoder.get(sd_version):
            model_path = load_file_from_url(url=url, model_dir=layer_model_root, file_name=file_name)
            self.vae_transparent_decoder[sd_version] = TransparentVAEDecoder(load_torch_file(model_path), device=comfy.model_management.get_torch_device(), dtype=torch.float16 if comfy.model_management.should_use_fp16() else torch.float32)
        pixel = images.movedim(-1, 1)
        (B, C, H, W) = pixel.shape
        assert H % 64 == 0, f'Height({H}) is not multiple of 64.'
        assert W % 64 == 0, f'Height({W}) is not multiple of 64.'
        decoded = []
        for start_idx in range(0, samples['samples'].shape[0], sub_batch_size):
            decoded.append(self.vae_transparent_decoder[sd_version].decode_pixel(pixel[start_idx:start_idx + sub_batch_size], samples['samples'][start_idx:start_idx + sub_batch_size]))
        pixel_with_alpha = torch.cat(decoded, dim=0)
        pixel_with_alpha = pixel_with_alpha.movedim(1, -1)
        image = pixel_with_alpha[..., 1:]
        alpha = pixel_with_alpha[..., 0]
        return (image, alpha)
```