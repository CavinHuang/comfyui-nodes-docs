# Documentation
- Class name: VAEEncodeInpaintConditioning
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

使用变分自编码器（VAE）将输入图像编码为潜在表示，特别适用于修复任务。此节点在生成过程中扮演关键角色，通过在正负样本上进行条件化编码，使模型能够学习到数据的更精细表示。

# Input types
## Required
- positive
    - 正样本对于引导编码过程朝向期望结果至关重要。它们为模型提供了一个参考，说明了在修复任务的上下文中什么是“正”的或正确的状态。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- negative
    - 负样本与正样本形成对比，帮助模型区分正确与不正确的表示。这对于完善模型的理解并提高修复结果的质量至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - VAE模型是负责将输入图像编码到潜在空间的核心组件。它是一个关键的输入，因为它直接影响编码过程的质量和准确性。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- pixels
    - 像素数据构成了VAE模型的输入，对编码过程至关重要。正是通过这些像素，模型学习表示和重建视觉信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码参数用于标识图像中需要修复的区域。它是一个关键组件，在编码过程中引导模型专注于图像的特定区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- positive
    - 正输出代表正样本的条件潜在表示，用于进一步处理或作为修复任务的参考。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- negative
    - 负输出对应于负样本的条件潜在表示，与正输出形成对比，并有助于区分正确的表示。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- latent_inpaint
    - 潜在修复输出是一种特定类型的潜在表示，包括图像样本和噪声掩码，这对于修复过程至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- latent_samples
    - 潜在样本输出提供了一组来自潜在空间的随机样本，可以用来生成新实例或进一步分析模型的编码能力。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEEncodeInpaintConditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'vae': ('VAE',), 'pixels': ('IMAGE',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent_inpaint', 'latent_samples')
    FUNCTION = 'encode'
    CATEGORY = 'inpaint'

    def encode(self, positive, negative, vae, pixels, mask):
        (positive, negative, latent) = nodes.InpaintModelConditioning().encode(positive, negative, pixels, vae, mask)
        latent_inpaint = dict(samples=positive[0][1]['concat_latent_image'], noise_mask=latent['noise_mask'].round())
        return (positive, negative, latent_inpaint, latent)
```