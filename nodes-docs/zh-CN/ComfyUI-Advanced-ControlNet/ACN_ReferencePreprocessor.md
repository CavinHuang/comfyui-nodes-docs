# Documentation
- Class name: ReferencePreprocessorNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/Reference/preprocess
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

ReferencePreprocessorNode 旨在使用变分自编码器（VAE）将输入图像转换为潜在空间表示。它在为高级控制网络操作准备图像方面发挥着关键作用，通过将视觉内容编码为可以由下游节点进一步处理的格式。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是需要被预处理的原始视觉输入。它是节点将转换为潜在表示的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE 参数指定了节点将用于将图像编码为潜在空间的变分自编码器模型。这个模型是节点功能的核心，因为它定义了图像如何被转换。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE
- latent_size
    - latent_size 参数定义了图像将被编码的潜在空间的维度。它是一个关键组件，因为它决定了编码表示的规模和结构。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]

# Output types
- proc_IMAGE
    - proc_IMAGE 输出是以潜在表示形式处理后的图像。它很重要，因为它作为控制网络中后续节点的输入，使得可以进行更高级的处理。
    - Comfy dtype: IMAGE
    - Python dtype: comfy.utils.ReferencePreprocWrapper

# Usage tips
- Infra type: GPU

# Source code
```
class ReferencePreprocessorNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'vae': ('VAE',), 'latent_size': ('LATENT',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('proc_IMAGE',)
    FUNCTION = 'preprocess_images'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/Reference/preprocess'

    def preprocess_images(self, vae: VAE, image: Tensor, latent_size: Tensor):
        image = image.movedim(-1, 1)
        image = comfy.utils.common_upscale(image, latent_size['samples'].shape[3] * 8, latent_size['samples'].shape[2] * 8, 'nearest-exact', 'center')
        image = image.movedim(1, -1)
        try:
            image = vae.vae_encode_crop_pixels(image)
        except Exception:
            image = VAEEncode.vae_encode_crop_pixels(image)
        encoded = vae.encode(image[:, :, :, :3])
        return (ReferencePreprocWrapper(condhint=encoded),)
```