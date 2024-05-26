# Documentation
- Class name: WLSH_VAE_Encode_For_Inpaint_Padding
- Category: WLSH Nodes/inpainting
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在使用变分自编码器（VAE）模型对图像数据进行编码，以便在考虑填充的情况下进行图像修复任务。它处理输入图像和掩码，以生成可用于进一步图像完成或生成的潜在表示。

# Input types
## Required
- pixels
    - 输入图像像素对于编码过程至关重要，因为它们提供了VAE生成潜在表示所需的原始数据。图像尺寸会根据模型的输入要求进行调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE模型是这个节点的核心组件，负责将输入图像编码到潜在空间中。其配置和权重直接影响编码的质量。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- mask
    - 掩码参数对于定义图像中需要修复的感兴趣区域至关重要。它与图像像素一起工作，引导VAE的编码过程。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mask_padding
    - 该参数定义了掩码周围用于侵蚀操作的填充大小，有助于细化编码过程中使用的噪声掩码。它间接影响潜在表示的质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - 输出样本代表输入图像的编码潜在表示，是这个节点的主要输出，可用于各种修复或生成任务。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_mask
    - 噪声掩码是一个辅助输出，提供有关图像中掩蔽区域的信息。它用于协助修复任务中的重建或生成过程。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_VAE_Encode_For_Inpaint_Padding:

    def __init__(self, device='cpu'):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'mask': ('MASK',), 'mask_padding': ('INT', {'default': 24, 'min': 6, 'max': 128, 'step': 2})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'
    CATEGORY = 'WLSH Nodes/inpainting'

    def encode(self, vae, pixels, mask, mask_padding=3):
        x = pixels.shape[1] // 64 * 64
        y = pixels.shape[2] // 64 * 64
        mask = torch.nn.functional.interpolate(mask[None, None], size=(pixels.shape[1], pixels.shape[2]), mode='bilinear')[0][0]
        pixels = pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            pixels = pixels[:, :x, :y, :]
            mask = mask[:x, :y]
        kernel_tensor = torch.ones((1, 1, mask_padding, mask_padding))
        mask_erosion = torch.clamp(torch.nn.functional.conv2d(mask.round()[None], kernel_tensor, padding=3), 0, 1)
        m = 1.0 - mask.round()
        for i in range(3):
            pixels[:, :, :, i] -= 0.5
            pixels[:, :, :, i] *= m
            pixels[:, :, :, i] += 0.5
        t = vae.encode(pixels)
        return ({'samples': t, 'noise_mask': mask_erosion[0][:x, :y].round()},)
```