# Documentation
- Class name: InpaintModelConditioning
- Category: conditioning/inpaint
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

InpaintModelConditioning节点的'encode'方法旨在通过将图像编码为潜在空间表示来处理图像。它通过应用掩码到像素并调整图像尺寸以确保与编码模型兼容，智能地处理图像条件。此方法对于修复任务至关重要，它使用合成内容填充图像中缺失或遮罩的区域。

# Input types
## Required
- positive
    - “positive”参数对于定义图像编码过程中的正向条件非常重要。它决定了在编码过程中，图像内容如何受到正向条件因素的影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - “negative”参数在图像编码过程中起着重要作用，它指定了在编码过程中应该排除或最小化的负向条件方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- pixels
    - “pixels”参数是必不可少的，因为它代表了节点将处理的输入图像数据。它是节点执行编码任务的核心元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - “vae”参数很重要，因为它指的是节点用来将图像编码为潜在表示的变分自编码器模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- mask
    - “mask”参数对于修复过程至关重要，因为它标识了需要填充或合成的图像区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- positive
    - “positive”输出很重要，因为它代表了从输入图像派生的编码正向条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]
- negative
    - “negative”输出表示模型应避免纳入图像的编码负向条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]
- latent
    - “latent”输出是一个关键组件，因为它包含了图像的潜在空间表示，这是编码过程的结果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Union[torch.Tensor, torch.Tensor]]

# Usage tips
- Infra type: GPU

# Source code
```
class InpaintModelConditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'vae': ('VAE',), 'pixels': ('IMAGE',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/inpaint'

    def encode(self, positive, negative, pixels, vae, mask):
        x = pixels.shape[1] // 8 * 8
        y = pixels.shape[2] // 8 * 8
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(pixels.shape[1], pixels.shape[2]), mode='bilinear')
        orig_pixels = pixels
        pixels = orig_pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = pixels.shape[1] % 8 // 2
            y_offset = pixels.shape[2] % 8 // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
            mask = mask[:, :, x_offset:x + x_offset, y_offset:y + y_offset]
        m = (1.0 - mask.round()).squeeze(1)
        for i in range(3):
            pixels[:, :, :, i] -= 0.5
            pixels[:, :, :, i] *= m
            pixels[:, :, :, i] += 0.5
        concat_latent = vae.encode(pixels)
        orig_latent = vae.encode(orig_pixels)
        out_latent = {}
        out_latent['samples'] = orig_latent
        out_latent['noise_mask'] = mask
        out = []
        for conditioning in [positive, negative]:
            c = node_helpers.conditioning_set_values(conditioning, {'concat_latent_image': concat_latent, 'concat_mask': mask})
            out.append(c)
        return (out[0], out[1], out_latent)
```