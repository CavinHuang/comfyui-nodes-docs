# Documentation
- Class name: CR_VAEDecode
- Category: Comfyroll/Essential/Core
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_VAEDecode节点旨在使用预训练的变分自编码器（VAE）将潜在表示解码成图像。它是生成模型中的基本组件，能够从压缩的潜在向量重建图像。该节点特别适用于可视化潜在空间和生成新样本，这些样本可以用于进一步分析或创意应用。

# Input types
## Required
- samples
    - ‘samples’参数至关重要，因为它包含节点将解码成图像的潜在表示。它直接影响输出，决定了生成图像的多样性和质量。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - ‘vae’参数指定节点将用于解码潜在样本的预训练变分自编码器模型。VAE模型的选择对于节点的功能至关重要，因为它决定了解码过程的结构和能力。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- tiled
    - ‘tiled’参数是一个可选的布尔标志，当设置为True时，指示节点以平铺方式解码样本。这对于处理更大的图像或当需要特定解码模式时可能有益。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- circular
    - ‘circular’是另一个可选的布尔参数，启用时，它将循环填充模式应用于VAE模型中的卷积层。这对于保持图像特征在边界处的连续性可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - ‘IMAGE’输出包含从输入潜在样本生成的解码图像。它代表了解码过程的主要结果，对视觉分析和进一步的图像操作具有重要意义。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - ‘show_help’输出提供了一个URL链接到文档页面，以获得有关节点操作的进一步帮助和详细信息。这对于寻求额外指导或了解节点能力的用户非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_VAEDecode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'vae': ('VAE',), 'tiled': ('BOOLEAN', {'default': False}), 'circular': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'vae_decode'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def vae_decode(self, samples, vae, circular=False, tiled=False):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-vae-decode'
        if circular == True:
            for layer in [layer for layer in vae.first_stage_model.modules() if isinstance(layer, torch.nn.Conv2d)]:
                layer.padding_mode = 'circular'
        if tiled == True:
            c = vae.decode_tiled(samples['samples'], tile_x=512, tile_y=512)
        else:
            c = vae.decode(samples['samples'])
        return (c, show_help)
```