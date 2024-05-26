# Documentation
- Class name: CircularVAEDecode
- Category: Jags_vector/latent
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点通过为变分自编码器（VAE）的解码过程准备模型的卷积层以处理循环填充，确保生成的图像在边界处保持一致性。

# Input types
## Required
- samples
    - 输入样本代表VAE编码器的潜在向量，这对于生成图像至关重要。它驱动整个解码过程，并直接影响输出图像的质量和特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - VAE参数指的是用于将潜在样本解码成图像的变分自编码器模型。它对于节点的功能至关重要，因为它封装了学习到的数据分布。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Output types
- image
    - 输出图像是使用VAE模型解码输入潜在样本的结果。它代表了编码数据的视觉表现，是节点操作的直接产物。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CircularVAEDecode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'decode'
    CATEGORY = 'Jags_vector/latent'

    def decode(self, vae, samples):
        for layer in [layer for layer in vae.first_stage_model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_mode = 'circular'
        return (vae.decode(samples['samples']),)
```