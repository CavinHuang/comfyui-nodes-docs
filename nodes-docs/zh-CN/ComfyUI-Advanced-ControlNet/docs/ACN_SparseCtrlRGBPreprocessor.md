# Documentation
- Class name: RgbSparseCtrlPreprocessor
- Category: Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/preprocess
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

RgbSparseCtrlPreprocessor节点旨在为涉及稀疏控制机制的高级控制网络处理准备图像数据。它将输入图像放大以匹配潜在大小，将图像编码为潜在空间表示，并以特定于下游控制网络应用的预处理格式包装编码数据。

# Input types
## Required
- image
    - 图像参数对于预处理阶段至关重要，因为它代表了将被放大和编码的原始输入。它是影响节点输出和控制网络中后续处理的基本元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - vae参数指定了变分自编码器（VAE）模型，该模型将用于将图像编码为潜在表示。这个模型对于节点将输入图像转换为适合高级控制网络操作的格式至关重要。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE
- latent_size
    - latent_size参数定义了图像将被编码的潜在空间的维度。它是节点输出质量的关键决定因素，以及编码数据在控制网络框架内的后续适用性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- proc_IMAGE
    - proc_IMAGE输出是输入图像的预处理版本，编码为潜在空间表示。此输出专门设计为与高级控制网络节点兼容，不打算用于其他类型的图像输入。
    - Comfy dtype: IMAGE
    - Python dtype: PreprocSparseRGBWrapper

# Usage tips
- Infra type: GPU

# Source code
```
class RgbSparseCtrlPreprocessor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'vae': ('VAE',), 'latent_size': ('LATENT',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('proc_IMAGE',)
    FUNCTION = 'preprocess_images'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/preprocess'

    def preprocess_images(self, vae: VAE, image: Tensor, latent_size: Tensor):
        image = image.movedim(-1, 1)
        image = comfy.utils.common_upscale(image, latent_size['samples'].shape[3] * 8, latent_size['samples'].shape[2] * 8, 'nearest-exact', 'center')
        image = image.movedim(1, -1)
        try:
            image = vae.vae_encode_crop_pixels(image)
        except Exception:
            image = VAEEncode.vae_encode_crop_pixels(image)
        encoded = vae.encode(image[:, :, :, :3])
        return (PreprocSparseRGBWrapper(condhint=encoded),)
```