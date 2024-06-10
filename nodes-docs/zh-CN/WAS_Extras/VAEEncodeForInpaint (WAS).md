# Documentation
- Class name: WAS_VAEEncodeForInpaint
- Category: latent/inpaint
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

WAS_VAEEncodeForInpaint节点旨在将图像像素编码为适合图像修复任务的潜在空间表示。它利用预训练的VAE（变分自编码器）实现这种转换，同时还考虑了一个定义图像修复区域的掩码。该节点的功能集中在为VAE准备输入数据并生成可用于后续修复过程的潜在表示上。

# Input types
## Required
- pixels
    - ‘pixels’参数是节点处理的原始图像数据。它对编码过程至关重要，因为它是VAE的输入。图像数据的质量和分辨率直接影响生成的潜在表示，进而影响修复结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数代表节点使用的预训练变分自编码器模型，用于将图像数据编码到潜在空间。VAE模型的选择对编码过程和潜在表示的质量有显著影响。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- mask
    - ‘mask’参数是一个二进制掩码，用于标识图像中需要修复的区域。它对于指导编码过程专注于图像的相关部分至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mask_offset
    - ‘mask_offset’参数允许修改掩码的边界，这对于控制修复的范围很有用。正值扩展掩码，而负值收缩掩码。这个参数间接影响VAE在编码时考虑的区域。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - ‘samples’输出代表输入图像的编码潜在空间表示。它是编码过程的核心结果，并将作为后续修复任务的输入。这种潜在表示捕获了图像的本质特征，剔除了不必要的细节，并针对修复区域的重建进行了优化。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_mask
    - ‘noise_mask’输出是一个二进制掩码，指示了图像中针对修复的区域。它由原始掩码衍生而来，用于确保修复过程仅专注于指定区域。这个掩码对于指导生成修复内容至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_VAEEncodeForInpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pixels': ('IMAGE',), 'vae': ('VAE',), 'mask': ('MASK',), 'mask_offset': ('INT', {'default': 6, 'min': -128, 'max': 128, 'step': 1})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'encode'
    CATEGORY = 'latent/inpaint'

    def encode(self, vae, pixels, mask, mask_offset=6):
        x = pixels.shape[1] // 8 * 8
        y = pixels.shape[2] // 8 * 8
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(pixels.shape[1], pixels.shape[2]), mode='bilinear')
        pixels = pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = pixels.shape[1] % 8 // 2
            y_offset = pixels.shape[2] % 8 // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
            mask = mask[:, :, x_offset:x + x_offset, y_offset:y + y_offset]
        mask_erosion = self.modify_mask(mask, mask_offset)
        m = (1.0 - mask_erosion.round()).squeeze(1)
        for i in range(3):
            pixels[:, :, :, i] -= 0.5
            pixels[:, :, :, i] *= m
            pixels[:, :, :, i] += 0.5
        t = vae.encode(pixels)
        return ({'samples': t, 'noise_mask': mask_erosion[:, :, :x, :y].round()},)

    def modify_mask(self, mask, modify_by):
        if modify_by == 0:
            return mask
        if modify_by > 0:
            kernel_size = 2 * modify_by + 1
            kernel_tensor = torch.ones((1, 1, kernel_size, kernel_size))
            padding = modify_by
            modified_mask = torch.clamp(torch.nn.functional.conv2d(mask.round(), kernel_tensor, padding=padding), 0, 1)
        else:
            kernel_size = 2 * abs(modify_by) + 1
            kernel_tensor = torch.ones((1, 1, kernel_size, kernel_size))
            padding = abs(modify_by)
            eroded_mask = torch.nn.functional.conv2d(1 - mask.round(), kernel_tensor, padding=padding)
            modified_mask = torch.clamp(1 - eroded_mask, 0, 1)
        return modified_mask
```