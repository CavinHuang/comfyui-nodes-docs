# Documentation
- Class name: CircularVAEDecode
- Category: latent
- Output node: False
- Repo Ref: https://github.com/spinagon/ComfyUI-seamless-tiling

CircularVAEDecode节点旨在执行变分自编码器（VAE）的解码过程，并能够对卷积层应用循环填充，以增强生成图像的平铺特性。该节点旨在通过考虑输入数据的空间周期性来提高解码图像的连贯性和视觉质量。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它提供了节点用于重构图像的潜在表示。这是一个关键的输入，直接影响节点的输出，决定了生成图像的质量和特性。
    - Comfy dtype: LATENT
    - Python dtype: Tensor
- vae
    - “vae”参数代表预训练的VAE模型，节点使用它来执行解码过程。它是节点操作的基本组成部分，因为模型的架构和训练直接影响节点生成高质量图像的能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- tiling
    - “tiling”参数控制VAE模型中卷积层循环填充的应用，这可以显著影响生成图像的平铺特性。它允许根据输出图像的期望特性定制节点的行为。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- IMAGE
    - CircularVAEDecode节点的输出是通过解码提供的潜在表示生成的图像。这个图像是节点操作的直接结果，反映了VAE模型和所选平铺参数在重构图像方面的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CircularVAEDecode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',), 'tiling': (['enable', 'x_only', 'y_only', 'disable'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'
    CATEGORY = 'latent'

    def decode(self, samples, vae, tiling):
        vae_copy = copy.deepcopy(vae)
        if tiling == 'enable':
            make_circular_asymm(vae_copy.first_stage_model, True, True)
        elif tiling == 'x_only':
            make_circular_asymm(vae_copy.first_stage_model, True, False)
        elif tiling == 'y_only':
            make_circular_asymm(vae_copy.first_stage_model, False, True)
        else:
            make_circular_asymm(vae_copy.first_stage_model, False, False)
        result = (vae_copy.decode(samples['samples']),)
        return result
```