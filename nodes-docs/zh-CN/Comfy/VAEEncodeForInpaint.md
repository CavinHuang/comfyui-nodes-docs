# Documentation
- Class name: VAEEncodeForInpaint
- Category: latent/inpaint
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAEEncodeForInpaint 节点的 `encode` 方法旨在将图像像素转换为适合修复任务的潜在空间表示。它利用变分自编码器（VAE）对图像的遮罩区域进行编码，允许随后生成或修改遮罩区域。该方法对于图像编辑和修复等应用至关重要，在这些应用中，保持遮罩区域外原始图像的完整性非常关键。

# Input types
## Required
- pixels
    - 参数 'pixels' 是节点处理的输入图像数据。它对编码过程至关重要，因为它是 VAE 将转换为潜在表示的原始材料。'pixels' 的质量和分辨率直接影响生成的潜在空间表示的准确性和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - 参数 'vae' 表示节点用于对图像数据进行编码的变分自编码器模型。它是节点的关键组成部分，因为它决定了图像被编码进的潜在空间的质量和特性。VAE 架构的选择可以显著影响节点的性能以及编码数据对修复任务的适用性。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- mask
    - 参数 'mask' 定义了图像中需要修复的区域。它是一个二进制张量，用于识别 'pixels' 中哪些部分应该在编码过程中被遮罩。'mask' 对于图像区域的选择性编码至关重要，并确保只有指定的区域被转换为潜在空间。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- grow_mask_by
    - 参数 'grow_mask_by' 允许通过指定的像素数扩展遮罩区域。这对于确保遮罩区域和未遮罩区域之间的过渡平滑且定义明确非常有用。该参数影响最终图像中修复区域的连通性和一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - 输出 'samples' 包含输入图像像素的潜在空间表示。这是节点的核心输出，用于进一步处理或生成修复后的图像。'samples' 的质量直接影响修复任务的最终结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_mask
    - 输出 'noise_mask' 是一个二进制张量，表示图像中已被遮罩并准备好进行修复的区域。它来源于输入 'mask'，对于引导修复过程至关重要，以确保只有预期的区域被修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncodeForInpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'mask': ('MASK',), 'grow_mask_by': ('INT', {'default': 6, 'min': 0, 'max': 64, 'step': 1})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'
    CATEGORY = 'latent/inpaint'

    def encode(self, vae, pixels, mask, grow_mask_by=6):
        x = pixels.shape[1] // vae.downscale_ratio * vae.downscale_ratio
        y = pixels.shape[2] // vae.downscale_ratio * vae.downscale_ratio
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(pixels.shape[1], pixels.shape[2]), mode='bilinear')
        pixels = pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = pixels.shape[1] % vae.downscale_ratio // 2
            y_offset = pixels.shape[2] % vae.downscale_ratio // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
            mask = mask[:, :, x_offset:x + x_offset, y_offset:y + y_offset]
        if grow_mask_by == 0:
            mask_erosion = mask
        else:
            kernel_tensor = torch.ones((1, 1, grow_mask_by, grow_mask_by))
            padding = math.ceil((grow_mask_by - 1) / 2)
            mask_erosion = torch.clamp(torch.nn.functional.conv2d(mask.round(), kernel_tensor, padding=padding), 0, 1)
        m = (1.0 - mask.round()).squeeze(1)
        for i in range(3):
            pixels[:, :, :, i] -= 0.5
            pixels[:, :, :, i] *= m
            pixels[:, :, :, i] += 0.5
        t = vae.encode(pixels)
        return ({'samples': t, 'noise_mask': mask_erosion[:, :, :x, :y].round()},)
```