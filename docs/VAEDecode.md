# Documentation
- Class name: VAEDecode
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAEDecode节点旨在将潜在表示转换回原始数据空间。它利用变分自编码器（VAE）的解码能力，从其编码的潜在向量重构图像。这个过程对于生成在结构和内容上类似于原始数据集的新数据实例至关重要。

# Input types
## Required
- samples
    - ‘samples’参数是VAEDecode节点的关键输入，因为它提供了节点将解码成图像的潜在表示。它对重构过程至关重要，因为解码图像的质量在很大程度上取决于这些潜在向量的保真度。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数指定了节点将用于解码潜在样本的预训练变分自编码器模型。这是一个强制性的输入，因为节点依赖于模型的参数和学习到的分布来执行解码过程。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- IMAGE
    - VAEDecode节点的输出是重构图像，它是从解码的潜在表示生成的。这个输出很重要，因为它展示了节点生成连贯且反映输入潜在空间的图像的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class VAEDecode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'
    CATEGORY = 'latent'

    def decode(self, vae, samples):
        return (vae.decode(samples['samples']),)
```